import { getAllBosses, getBossById } from "../services/bossService";

export async function fetchAllBosses() {
  return getAllBosses();
}

export async function fetchBoss(bossId: string) {
  if (!bossId) throw new Error("Boss ID is required");
  return getBossById(bossId);
}