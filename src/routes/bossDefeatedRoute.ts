import { getDefeatedBosses, addDefeatedBoss } from "../services/bossDefeatedService";

export async function fetchDefeatedBosses(userId: string) {
  if (!userId) throw new Error("User ID is required");
  return getDefeatedBosses(userId);
}

export async function recordDefeatedBoss(userId: string, bossId: string) {
  if (!userId || !bossId) throw new Error("User ID and Boss ID are required");
  return addDefeatedBoss(userId, bossId);
}