import { supabase } from "@/lib/supabase/browserClient";
import { getProfileOrThrow } from "@/lib/tenant/profile";
import { writeAuditLog } from "@/services/core/auditLogs";

export async function listCandidates(currentUser) {
  const profile = await getProfileOrThrow(currentUser.id);

  const { data, error } = await supabase
    .from("candidates")
    .select("*")
    .eq("organization_id", profile.organization_id)
    .order("created_at", { ascending: false });

  if (error) throw error;
  return data || [];
}

export async function createCandidate(currentUser, payload) {
  const profile = await getProfileOrThrow(currentUser.id);

  const { data, error } = await supabase
    .from("candidates")
    .insert({
      organization_id: profile.organization_id,
      first_name: payload.first_name,
      last_name: payload.last_name || null,
      email: payload.email || null,
      phone: payload.phone || null,
      current_location: payload.current_location || null,
      current_company: payload.current_company || null,
      current_title: payload.current_title || null,
      source: payload.source || null,
      status: payload.status || "active",
      resume_url: payload.resume_url || null,
      notes: payload.notes || null,
      created_by: currentUser.id,
      updated_by: currentUser.id,
    })
    .select()
    .single();

  if (error) throw error;

  await writeAuditLog(currentUser, {
    module: "candidates",
    action: "create",
    entityType: "candidate",
    entityId: data.id,
    metadata: { first_name: data.first_name, last_name: data.last_name },
  });

  return data;
}