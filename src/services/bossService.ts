import { supabase } from "../lib/supabaseClient";

export async function getAllBosses() {
  const { data, error } = await supabase
    .from("bosses")
    .select("id, name, required_steps, reward_xp, sprite_url, reward_skin_id");

  if (error) throw new Error(error.message);

  return data;
}

export async function getBossById(bossId: string) {
  const { data, error } = await supabase
    .from("bosses")
    .select("id, name, required_steps, reward_xp, sprite_url, reward_skin_id")
    .eq("id", bossId)
    .single();

  if (error) throw new Error(error.message);

  return data;
}