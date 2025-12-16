import { supabase } from "../lib/supabaseClient";

type StepRecord = {
  user_id: string;
  date: string; // ISO string yyyy-mm-dd
  steps: number;
  synced_at?: string;
};

export async function getSteps(userId: string, startDate?: string, endDate?: string) {
  let query = supabase
    .from("steps")
    .select("user_id, date, steps, synced_at")
    .eq("user_id", userId);

  if (startDate) query = query.gte("date", startDate);
  if (endDate) query = query.lte("date", endDate);

  const { data, error } = await query.order("date", { ascending: true });

  if (error) throw new Error(error.message);
  return data;
}

export async function addSteps({ user_id, date, steps, synced_at }: StepRecord) {
  const { data, error } = await supabase
    .from("steps")
    .insert({ user_id, date, steps, synced_at })
    .select()
    .single();

  if (error) throw new Error(error.message);
  return data;
}

export async function updateSteps(userId: string, date: string, steps: number) {
  const { data, error } = await supabase
    .from("steps")
    .update({ steps, synced_at: new Date().toISOString() })
    .eq("user_id", userId)
    .eq("date", date)
    .select()
    .single();

  if (error) throw new Error(error.message);
  return data;
}