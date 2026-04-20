import { supabase } from "@/lib/supabase/browserClient";
import { getProfileOrThrow } from "@/lib/tenant/profile";

export async function listUsers(currentUser) {
  const profile = await getProfileOrThrow(currentUser.id);

  const { data, error } = await supabase
    .from("profiles")
    .select(`
      *,
      role_group:role_group_id (
        id,
        name
      )
    `)
    .eq("organization_id", profile.organization_id)
    .order("created_at", { ascending: false });

  if (error) throw error;
  return data || [];
}

export async function updateUserProfile(currentUser, userId, updates) {
  const actorProfile = await getProfileOrThrow(currentUser.id);

  const payload = {
    full_name: updates.full_name,
    role: updates.role,
    status: updates.status,
    title: updates.title || null,
    phone: updates.phone || null,
    role_group_id: updates.role_group_id || null,
  };

  const { data, error } = await supabase
    .from("profiles")
    .update(payload)
    .eq("id", userId)
    .eq("organization_id", actorProfile.organization_id)
    .select()
    .single();

  if (error) throw error;
  return data;
}