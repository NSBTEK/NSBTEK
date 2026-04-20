import { supabase } from "@/lib/supabase/browserClient";
import { getProfileOrThrow } from "@/lib/tenant/profile";
import { writeAuditLog } from "@/services/core/auditLogs";

export async function listContracts(currentUser) {
  const profile = await getProfileOrThrow(currentUser.id);

  const { data, error } = await supabase
    .from("contracts")
    .select(`
      *,
      placement:placement_id (
        id,
        start_date,
        placement_type,
        submission:submission_id (
          id,
          job:job_id (id, title),
          candidate:candidate_id (id, first_name, last_name)
        )
      )
    `)
    .eq("organization_id", profile.organization_id)
    .order("created_at", { ascending: false });

  if (error) throw error;
  return data || [];
}

export async function createContract(currentUser, payload) {
  const profile = await getProfileOrThrow(currentUser.id);

  const { data, error } = await supabase
    .from("contracts")
    .insert({
      organization_id: profile.organization_id,
      placement_id: payload.placement_id,
      contract_number: payload.contract_number || null,
      start_date: payload.start_date,
      end_date: payload.end_date || null,
      status: payload.status || "draft",
      signed_at: payload.signed_at || null,
      document_url: payload.document_url || null,
      notes: payload.notes || null,
      created_by: currentUser.id,
      updated_by: currentUser.id,
    })
    .select()
    .single();

  if (error) throw error;

  await writeAuditLog(currentUser, {
    module: "contracts",
    action: "create",
    entityType: "contract",
    entityId: data.id,
    metadata: { placement_id: data.placement_id },
  });

  return data;
}