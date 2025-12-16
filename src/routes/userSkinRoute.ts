import { getUserSkins, addUserSkin } from "../services/userSkinService";

export async function fetchUserSkins(userId: string) {
  if (!userId) throw new Error("User ID is required");
  return getUserSkins(userId);
}

export async function giveUserSkin(userId: string, skinId: string) {
  if (!userId || !skinId) throw new Error("User ID and Skin ID are required");
  return addUserSkin(userId, skinId);
}