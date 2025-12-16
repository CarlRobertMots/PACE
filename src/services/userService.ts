import { supabase } from "../lib/supabaseClient";

export async function getUserInfoById(userId: string) {
  const { data, error } = await supabase
    .from("users")
    .select("id, username, avatar_url, xp, total_steps, level")
    .eq("id", userId)
    .single();

  if (error) throw new Error(error.message);

  return data;
}

type UpdateUserPayload = Partial<{
  avatar_url: string;
  xp: number;
  total_steps: number;
  level: number;
}>;

export async function updateUserInfoById(userId: string, payload: UpdateUserPayload) {
  const { data, error } = await supabase
    .from("users")
    .update(payload)
    .eq("id", userId)
    .select()
    .single();

  if (error) throw new Error(error.message);

  return data;
}