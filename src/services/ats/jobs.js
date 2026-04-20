import { supabase } from "@/lib/supabase/browserClient";
import { getProfileOrThrow } from "@/lib/tenant/profile";
import { writeAuditLog } from "@/services/core/auditLogs";

export async function listJobs(currentUser) {
  const profile = await getProfileOrThrow(currentUser.id);

  const { data, error } = await supabase
    .from("jobs")
    .select(`
      *,
      client:client_id (
        id,
        name
      )
    `)
    .eq("organization_id", profile.organization_id)
    .order("created_at", { ascending: false });

  if (error) throw error;
  return data || [];
}

export async function createJob(currentUser, payload) {
  const profile = await getProfileOrThrow(currentUser.id);

  const { data, error } = await supabase
    .from("jobs")
    .insert({
      organization_id: profile.organization_id,
      client_id: payload.client_id || null,
      title: payload.title,
      department: payload.department || null,
      location: payload.location || null,
      employment_type: payload.employment_type || "full_time",
      status: payload.status || "open",
      openings: Number(payload.openings || 1),
      description: payload.description || null,
      rate_min: payload.rate_min ? Number(payload.rate_min) : null,
      rate_max: payload.rate_max ? Number(payload.rate_max) : null,
      created_by: currentUser.id,
      updated_by: currentUser.id,
    })
    .select()
    .single();

  if (error) throw error;

  await writeAuditLog(currentUser, {
    module: "jobs",
    action: "create",
    entityType: "job",
    entityId: data.id,
    metadata: { title: data.title },
  });

  return data;
}