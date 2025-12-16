import { getAllSkins, getSkinById } from "../services/skinService";

export async function fetchAllSkins() {
  return getAllSkins();
}

export async function fetchSkin(skinId: string) {
  if (!skinId) throw new Error("Skin ID is required");
  return getSkinById(skinId);
}