// src/api/bosses/bossService.ts

import { supabase } from "../supabase/supabaseClient";

export interface BossData {
  id: string;
  name: string;
  max_hp: number;
  current_hp: number;
  image_url: string;
  theme: {
    theme_primary_color: string;
    theme_secondary_color: string;
  };
  guild: {
    name: string;
  };
}

export const fetchCurrentBoss = async (): Promise<BossData | null> => {
  try {
    const { data, error } = await supabase
      .from("bosses")
      .select(
        `
        id,
        name,
        max_hp,
        current_hp,
        image_url,
        theme:theme_id ( theme_primary_color, theme_secondary_color ),
        guild:guild_id ( name )
      `
      )
      .eq("id", 1)
      .single();

    if (error) {
      console.error("Error fetching current boss:", error.message);
      return null;
    }

    // 🔴 PROBLEM: TypeScript thinks data.theme is an Array.
    // 🟢 FIX: We treat 'data' as 'any' temporarily, then manually clean it up.

    const rawData = data as any;

    const formattedData: BossData = {
      id: rawData.id,
      name: rawData.name,
      max_hp: rawData.max_hp,
      current_hp: rawData.current_hp,
      image_url: rawData.image_url,

      // Check if it's an array. If so, grab the first item. If not, use it as is.
      theme: Array.isArray(rawData.theme) ? rawData.theme[0] : rawData.theme,
      guild: Array.isArray(rawData.guild) ? rawData.guild[0] : rawData.guild,
    };

    return formattedData;
  } catch (err) {
    console.error("Unexpected error during boss fetch:", err);
    return null;
  }
};
