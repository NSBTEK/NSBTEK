import { supabase } from "@/lib/supabase/browserClient";
import { getProfileOrThrow } from "@/lib/tenant/profile";

export async function listRoleGroups(currentUser) {
  const profile = await getProfileOrThrow(currentUser.id);

  const { data, error } = await supabase
    .from("role_groups")
    .select(`
      *,
      role_group_modules (
        id,
        module_key,
        can_view,
        can_create,
        can_edit,
        can_delete
      )
    `)
    .eq("organization_id", profile.organization_id)
    .order("name", { ascending: true });

  if (error) throw error;
  return data || [];
}

export async function createRoleGroup(currentUser, payload) {
  const profile = await getProfileOrThrow(currentUser.id);

  const { data, error } = await supabase
    .from("role_groups")
    .insert({
      organization_id: profile.organization_id,
      name: payload.name,
      description: payload.description || null,
      is_system: false,
    })
    .select()
    .single();

  if (error) throw error;
  return data;
}