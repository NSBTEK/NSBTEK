import { supabase } from "@/lib/supabase/browserClient";
import { getProfileOrThrow } from "@/lib/tenant/profile";

export async function getOrganizationSettings(currentUser) {
  const profile = await getProfileOrThrow(currentUser.id);

  const { data, error } = await supabase
    .from("organization_settings")
    .select("*")
    .eq("organization_id", profile.organization_id)
    .single();

  if (error) throw error;
  return data;
}

export async function updateOrganizationSettings(currentUser, updates) {
  const profile = await getProfileOrThrow(currentUser.id);

  const { data, error } = await supabase
    .from("organization_settings")
    .update({
      app_name: updates.app_name,
      primary_color: updates.primary_color,
      timezone: updates.timezone,
      currency_code: updates.currency_code,
      date_format: updates.date_format,
    })
    .eq("organization_id", profile.organization_id)
    .select()
    .single();

  if (error) throw error;
  return data;
}