import { supabase } from "@/lib/supabase/browserClient";
import { getProfileOrThrow } from "@/lib/tenant/profile";
import { writeAuditLog } from "@/services/core/auditLogs";

export async function listPlacements(currentUser) {
  const profile = await getProfileOrThrow(currentUser.id);

  const { data, error } = await supabase
    .from("placements")
    .select(`
      *,
      submission:submission_id (
        id,
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
    .order("created_at", { ascending: false });

  if (error) throw error;
  return data || [];
}

export async function createPlacement(currentUser, payload) {
  const profile = await getProfileOrThrow(currentUser.id);

  const { data, error } = await supabase
    .from("placements")
    .insert({
      organization_id: profile.organization_id,
      submission_id: payload.submission_id,
      start_date: payload.start_date,
      end_date: payload.end_date || null,
      placement_type: payload.placement_type || "contract",
      bill_rate: payload.bill_rate ? Number(payload.bill_rate) : null,
      pay_rate: payload.pay_rate ? Number(payload.pay_rate) : null,
      status: payload.status || "active",
      notes: payload.notes || null,
      created_by: currentUser.id,
      updated_by: currentUser.id,
    })
    .select()
    .single();

  if (error) throw error;

  await writeAuditLog(currentUser, {
    module: "placements",
    action: "create",
    entityType: "placement",
    entityId: data.id,
    metadata: { submission_id: data.submission_id },
  });

  return data;
}