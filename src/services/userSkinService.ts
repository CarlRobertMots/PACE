import { supabase } from "../lib/supabaseClient";

export async function getUserSkins(userId: string) {
  const { data, error } = await supabase
    .from("user_skins")
    .select("skin_id")
    .eq("user_id", userId);

  if (error) throw new Error(error.message);

  return data.map((entry: any) => entry.skin_id);
}

export async function addUserSkin(userId: string, skinId: string) {
  const { data, error } = await supabase
    .from("user_skins")
    .insert({ user_id: userId, skin_id: skinId })
    .select()
    .single();

  if (error) throw new Error(error.message);

  return data;
}