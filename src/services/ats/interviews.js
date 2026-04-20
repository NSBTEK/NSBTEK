import { supabase } from "@/lib/supabase/browserClient";
import { getProfileOrThrow } from "@/lib/tenant/profile";
import { writeAuditLog } from "@/services/core/auditLogs";

export async function listInterviews(currentUser) {
  const profile = await getProfileOrThrow(currentUser.id);

  const { data, error } = await supabase
    .from("interviews")
    .select(`
      *,
      submission:submission_id (
        id,
        status,
        job:job_id (
          id,
          title
        ),
        candidate:candidate_id (
          id,
          first_name,
          last_name
        )
      )
    `)
    .eq("organization_id", profile.organization_id)
    .order("scheduled_at", { ascending: false });

  if (error) throw error;
  return data || [];
}

export async function createInterview(currentUser, payload) {
  const profile = await getProfileOrThrow(currentUser.id);

  const { data, error } = await supabase
    .from("interviews")
    .insert({
      organization_id: profile.organization_id,
      submission_id: payload.submission_id,
      interview_type: payload.interview_type || "screening",
      scheduled_at: payload.scheduled_at,
      duration_minutes: Number(payload.duration_minutes || 30),
      interviewer_name: payload.interviewer_name || null,
      location: payload.location || null,
      meeting_link: payload.meeting_link || null,
      status: payload.status || "scheduled",
      feedback: payload.feedback || null,
      created_by: currentUser.id,
      updated_by: currentUser.id,
    })
    .select()
    .single();

  if (error) throw error;

  await writeAuditLog(currentUser, {
    module: "interviews",
    action: "create",
    entityType: "interview",
    entityId: data.id,
    metadata: { interview_type: data.interview_type },
  });

  return data;
}