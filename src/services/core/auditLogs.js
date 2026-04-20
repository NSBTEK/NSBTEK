import { supabase } from "@/lib/supabase/browserClient";
import { getProfileOrThrow } from "@/lib/tenant/profile";

export async function listAuditLogs(currentUser) {
  const profile = await getProfileOrThrow(currentUser.id);

  const { data, error } = await supabase
    .from("audit_logs")
    .select("*")
    .eq("organization_id", profile.organization_id)
    .order("created_at", { ascending: false })
    .limit(100);

  if (error) throw error;
  return data || [];
}

export async function writeAuditLog(currentUser, payload) {
  const profile = await getProfileOrThrow(currentUser.id);

  const { error } = await supabase.rpc("write_audit_log", {
    p_organization_id: profile.organization_id,
    p_actor_user_id: currentUser.id,
    p_module: payload.module,
    p_action: payload.action,
    p_entity_type: payload.entityType,
    p_entity_id: payload.entityId || null,
    p_metadata: payload.metadata || {},
  });

  if (error) throw error;
}