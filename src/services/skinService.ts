import { supabase } from "../lib/supabaseClient";

export async function getAllSkins() {
  const { data, error } = await supabase
    .from("skins")
    .select("id, name, description, rarity, type, sprite_url");

  if (error) throw new Error(error.message);

  return data;
}

export async function getSkinById(skinId: string) {
  const { data, error } = await supabase
    .from("skins")
    .select("id, name, description, rarity, type, sprite_url")
    .eq("id", skinId)
    .single();

  if (error) throw new Error(error.message);

  return data;
}