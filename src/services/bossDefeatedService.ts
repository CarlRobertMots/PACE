import { supabase } from "../lib/supabaseClient";

export async function getDefeatedBosses(userId: string) {
  const { data, error } = await supabase
    .from("bosses_defeated")
    .select("boss_id, defeated_at")
    .eq("user_id", userId)
    .order("defeated_at", { ascending: true });

  if (error) throw new Error(error.message);
  return data;
}

export async function addDefeatedBoss(userId: string, bossId: string) {
  const { data, error } = await supabase
    .from("bosses_defeated")
    .insert({
      user_id: userId,
      boss_id: bossId,
      defeated_at: new Date().toISOString(),
    })
    .select()
    .maybeSingle();

  if (error) throw new Error(error.message);
  return data;
}