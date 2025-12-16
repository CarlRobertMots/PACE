// src/api/bosses/bossService.ts

import { supabase } from "../../lib/supabaseClient";

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

// Fetch current boss safely
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
      console.warn("Error fetching current boss:", error.message);
      return null;
    }

    if (!data) {
      console.warn("No boss found");
      return null;
    }

    const rawData = data as any;

    // Handle array expansions safely
    const theme = Array.isArray(rawData.theme) ? rawData.theme[0] : rawData.theme;
    const guild = Array.isArray(rawData.guild) ? rawData.guild[0] : rawData.guild;

    if (!theme || !guild) {
      console.warn("Theme or guild missing in boss data");
      return null;
    }

    const formattedData: BossData = {
      id: rawData.id,
      name: rawData.name,
      max_hp: rawData.max_hp,
      current_hp: rawData.current_hp,
      image_url: rawData.image_url,
      theme,
      guild,
    };

    return formattedData;
  } catch (err) {
    console.error("Unexpected error during boss fetch:", err);
    return null;
  }
};