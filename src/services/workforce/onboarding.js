import { supabase } from "@/lib/supabase/browserClient";
import { getProfileOrThrow } from "@/lib/tenant/profile";
import { writeAuditLog } from "@/services/core/auditLogs";

export async function listOnboardingItems(currentUser) {
  const profile = await getProfileOrThrow(currentUser.id);

  const { data, error } = await supabase
    .from("onboarding_items")
    .select(`
      *,
      placement:placement_id (
        id,
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

export async function createOnboardingItem(currentUser, payload) {
  const profile = await getProfileOrThrow(currentUser.id);

  const { data, error } = await supabase
    .from("onboarding_items")
    .insert({
      organization_id: profile.organization_id,
      placement_id: payload.placement_id,
      item_type: payload.item_type,
      title: payload.title,
      description: payload.description || null,
      due_date: payload.due_date || null,
      status: payload.status || "pending",
      assigned_to: payload.assigned_to || null,
      created_by: currentUser.id,
      updated_by: currentUser.id,
    })
    .select()
    .single();

  if (error) throw error;

  await writeAuditLog(currentUser, {
    module: "onboarding",
    action: "create",
    entityType: "onboarding_item",
    entityId: data.id,
    metadata: { title: data.title },
  });

  return data;
}

export async function completeOnboardingItem(currentUser, itemId) {
  const profile = await getProfileOrThrow(currentUser.id);

  const { data, error } = await supabase
    .from("onboarding_items")
    .update({
      status: "completed",
      completed_at: new Date().toISOString(),
      updated_by: currentUser.id,
    })
    .eq("id", itemId)
    .eq("organization_id", profile.organization_id)
    .select()
    .single();

  if (error) throw error;

  return data;
}