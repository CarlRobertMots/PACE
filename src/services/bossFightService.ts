// FILE: src/services/bossFightService.ts
import { getUserInfo } from "../routes/userRoute";
import { fetchBoss } from "../routes/bossRoute";
import { recordDefeatedBoss } from "../routes/bossDefeatedRoute";

export type BossFightResult = {
  progress: number;

  user: {
    atk: number;
    def: number;
  };

  boss: {
    atk: number;
    def: number;
  };

  damage: {
    userToBoss: number;
    bossToUser: number;
  };

  bossRemainingHpPercent: number;
  userWon: boolean;
  bossDefeatedRecorded: boolean;
};

export async function simulateBossFight(
  userId: string,
  bossId: string
): Promise<BossFightResult> {
  // 1️⃣ Fetch user
  const user = await getUserInfo(userId);
  if (!user) throw new Error("User not found");

  // 2️⃣ Fetch boss (static for MVP)
  const boss = await fetchBoss(bossId);
  if (!boss) throw new Error("Boss not found");

  // 3️⃣ Progress (0 → 1 scale)
  const rawProgress = user.total_steps / boss.required_steps;
  const progress = Math.min(rawProgress, 1);

  // 4️⃣ Stat baselines (tweakable)
  const USER_BASE = { atk: 100, def: 50 };
  const USER_MAX = { atk: 200, def: 100 };

  const BOSS_BASE = { atk: 200, def: 300 };
  const BOSS_MIN = { atk: 100, def: 150 };

  // 5️⃣ Scale stats
  const userAtk = USER_BASE.atk + (USER_MAX.atk - USER_BASE.atk) * progress;
  const userDef = USER_BASE.def + (USER_MAX.def - USER_BASE.def) * progress;

  const bossAtk = BOSS_BASE.atk - (BOSS_BASE.atk - BOSS_MIN.atk) * progress;
  const bossDef = BOSS_BASE.def - (BOSS_BASE.def - BOSS_MIN.def) * progress;

  // 6️⃣ Damage calculation
  const userToBoss = Math.max(userAtk - bossDef, 0);
  const bossToUser = Math.max(bossAtk - userDef, 0);

  // 7️⃣ Visual HP (boss survives until progress = 1)
  const bossRemainingHpPercent =
    progress >= 1 ? 0 : Math.max(100 - progress * 100 - 20, 5);

  // 8️⃣ Win logic
  const userWon = progress >= 1 && userToBoss >= bossToUser;

  // 9️⃣ Record defeat
  let bossDefeatedRecorded = false;
  if (userWon) {
    await recordDefeatedBoss(userId, bossId);
    bossDefeatedRecorded = true;
  }

  return {
    progress,
    user: { atk: Math.round(userAtk), def: Math.round(userDef) },
    boss: { atk: Math.round(bossAtk), def: Math.round(bossDef) },
    damage: { userToBoss: Math.round(userToBoss), bossToUser: Math.round(bossToUser) },
    bossRemainingHpPercent: Math.round(bossRemainingHpPercent),
    userWon,
    bossDefeatedRecorded,
  };
}