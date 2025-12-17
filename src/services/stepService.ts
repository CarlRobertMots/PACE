import { supabase } from "../lib/supabaseClient";

type StepRecord = {
  user_id: string;
  date: string; // ISO string yyyy-mm-dd
  steps: number;
  synced_at?: string;
};

// Fetch Steps
export async function getSteps(
  userId: string,
  startDate?: string,
  endDate?: string
) {
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

//  Smart Update (The "High Score" Logic)
export async function updateSteps(userId: string, date: string, steps: number) {
  //  Check what is currently in the DB
  const { data: current, error: fetchError } = await supabase
    .from("steps")
    .select("steps")
    .eq("user_id", userId)
    .eq("date", date)
    .maybeSingle();

  if (fetchError) throw new Error(fetchError.message);

  //  SAFETY CHECK: Only overwrite if new steps > old steps
  // If we already have more steps in the cloud, ignore this update.
  if (current && steps <= current.steps) {
    console.log(`☁️ Cloud has ${current.steps}, ignoring local ${steps}.`);
    return current;
  }

  //  Upsert (Save the new High Score)
  const { data, error } = await supabase
    .from("steps")
    .upsert(
      {
        user_id: userId,
        date: date,
        steps: steps,
        synced_at: new Date().toISOString(),
      },
      { onConflict: "user_id, date" }
    )
    .select()
    .single();

  if (error) throw new Error(error.message);
  return data;
}

//  Wrapper (Keeps other files happy)
export async function addSteps(record: StepRecord) {
  return updateSteps(record.user_id, record.date, record.steps);
}
