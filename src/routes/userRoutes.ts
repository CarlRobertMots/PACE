import { getUserInfoById, updateUserInfoById } from "../services/userService";

type UpdateUserPayload = Partial<{
  avatar_url: string;
  xp: number;
  total_steps: number;
  level: number;
}>;

export async function getUserInfo(userId: string) {
  if (!userId) throw new Error("User ID is required");

  return getUserInfoById(userId);
}

export async function updateUserInfo(userId: string, data: UpdateUserPayload) {
  if (!userId) throw new Error("User ID is required");

  // Optional: validate data types / business rules
  return updateUserInfoById(userId, data);
}