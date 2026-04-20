import { supabase } from "@/lib/supabase/browserClient";
import { getProfileOrThrow } from "@/lib/tenant/profile";
import { writeAuditLog } from "@/services/core/auditLogs";

export async function listSubmissions(currentUser) {
  const profile = await getProfileOrThrow(currentUser.id);

  const { data, error } = await supabase
    .from("submissions")
    .select(`
      *,
      job:job_id (
        id,
        title
      ),
      candidate:candidate_id (
        id,
        first_name,
        last_name
      )
    `)
    .eq("organization_id", profile.organization_id)
    .order("created_at", { ascending: false });

  if (error) throw error;
  return data || [];
}

export async function createSubmission(currentUser, payload) {
  const profile = await getProfileOrThrow(currentUser.id);

  const { data, error } = await supabase
    .from("submissions")
    .insert({
      organization_id: profile.organization_id,
      job_id: payload.job_id,
      candidate_id: payload.candidate_id,
      status: payload.status || "submitted",
      recruiter_id: currentUser.id,
      notes: payload.notes || null,
      created_by: currentUser.id,
      updated_by: currentUser.id,
    })
    .select()
    .single();

  if (error) throw error;

  await writeAuditLog(currentUser, {
    module: "submissions",
    action: "create",
    entityType: "submission",
    entityId: data.id,
    metadata: { job_id: data.job_id, candidate_id: data.candidate_id },
  });

  return data;
}

export async function updateSubmissionStatus(currentUser, submissionId, status) {
  const profile = await getProfileOrThrow(currentUser.id);

  const { data, error } = await supabase
    .from("submissions")
    .update({
      status,
      updated_by: currentUser.id,
    })
    .eq("id", submissionId)
    .eq("organization_id", profile.organization_id)
    .select()
    .single();

  if (error) throw error;

  await writeAuditLog(currentUser, {
    module: "submissions",
    action: "status_change",
    entityType: "submission",
    entityId: data.id,
    metadata: { status },
  });

  return data;
}