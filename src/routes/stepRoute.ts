import { getSteps, addSteps, updateSteps } from "../services/stepService";

type StepPayload = {
  user_id: string;
  date: string;
  steps: number;
};

export async function fetchSteps(userId: string, startDate?: string, endDate?: string) {
  if (!userId) throw new Error("User ID is required");
  return getSteps(userId, startDate, endDate);
}

export async function createSteps(payload: StepPayload) {
  if (!payload.user_id || !payload.date || payload.steps == null)
    throw new Error("Missing step data");

  return addSteps(payload);
}

export async function modifySteps(userId: string, date: string, steps: number) {
  if (!userId || !date || steps == null)
    throw new Error("Missing step update data");

  return updateSteps(userId, date, steps);
}