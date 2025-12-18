// src/screens/Home/BossDetailScreen.tsx
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  ScrollView,
  Pressable,
  ActivityIndicator,
  StyleSheet,
} from "react-native";
import { getAllBosses } from "../../services/bossService";
import { supabase } from "../../lib/supabaseClient";
import { simulateBossFight, BossFightResult } from "../../services/bossFightService";
import { getUserInfoById } from "../../services/userService";

import { useNavigation, NavigationProp } from "@react-navigation/native";
import { RootStackParamList } from "../../navigation/types";

type Boss = {
  id: string;
  name: string;
  required_steps: number;
  reward_xp: number;
  sprite_url: string;
};

export default function BossDetailScreen() {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const [loading, setLoading] = useState(true);
  const [boss, setBoss] = useState<Boss | null>(null);
  const [fightResult, setFightResult] = useState<BossFightResult | null>(null);

  useEffect(() => {
    loadBossAndFight();
  }, []);

  const loadBossAndFight = async () => {
    try {
      const bosses = await getAllBosses();
      if (!bosses || bosses.length === 0) throw new Error("No bosses found");
      const selectedBoss = bosses[0];
      setBoss(selectedBoss);

      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("No logged-in user");

      const result = await simulateBossFight(user.id, selectedBoss.id);
      setFightResult(result);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color="#a855f7" />
      </View>
    );
  }

  return (
    <ScrollView style={styles.root} contentContainerStyle={{ paddingBottom: 120 }}>
      {/* --- BACK BUTTON --- */}
      <Pressable
        onPress={() => navigation.navigate("Home" as never)}
        style={{
          padding: 12,
          backgroundColor: "#a855f7",
          borderRadius: 8,
          alignSelf: "flex-start",
          margin: 16,
          zIndex: 10,
        }}
      >
        <Text style={{ color: "white", fontFamily: "Pixel", fontSize: 16 }}>
          Back to Main
        </Text>
      </Pressable>

      {/* --- HERO/BOSS IMAGE --- */}
      <View style={styles.hero}>
        <Image
          source={{ uri: "https://api.builder.io/api/v1/image/assets/TEMP/f16ee76082947569e5e4b34ec31145e6549504f9?width=1375" }}
          style={styles.heroImg}
          resizeMode="cover"
        />
        <Image
        source={require("../../../assets/IMP.png")}
        style={styles.bossSprite}
        resizeMode="contain"
        />
      </View>

      <View style={styles.content}>
        <Text style={styles.bossName}>{boss?.name} — Boss</Text>

        <View style={styles.hpRow}>
          <View style={[styles.hpFill, { width: `${fightResult?.bossRemainingHpPercent ?? 50}%` }]} />
          <View style={styles.hpBox} />
        </View>
        <Text style={styles.hpText}>
          {fightResult ? `${fightResult.bossRemainingHpPercent}% HP` : "Loading..."}
        </Text>

        <View style={styles.logsCard}>
          <Text style={styles.cardTitle}>Combat Logs</Text>
          <Text style={styles.logText}>
            User dealt {fightResult?.damage.userToBoss} DMG
          </Text>
          <Text style={styles.logText}>
            Boss dealt {fightResult?.damage.bossToUser} DMG
          </Text>
          <Text style={styles.logText}>
            User {fightResult?.userWon ? "won" : "lost"} the fight
          </Text>
        </View>
      </View>
    </ScrollView>
  );
}


const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: "black" },
  loader: { flex: 1, justifyContent: "center", alignItems: "center" },
  hero: { height: 398, overflow: "hidden", position: "relative" },
  heroImg: { width: "100%", height: "100%", position: "absolute" },
  bossSprite: { width: 400, height: 400, position: "absolute", top: -40, left: "26%", marginLeft: -100 },
  content: { paddingHorizontal: 16, marginTop: -48 },
  bossName: { color: "white", fontFamily: "Pixel", fontSize: 16, textShadowColor: "#000", textShadowOffset: { width: 1, height: 1 }, marginBottom: 8 },
  hpRow: { flexDirection: "row", gap: 8, marginBottom: 4 },
  hpFill: { height: 24, backgroundColor: "#dc2626", borderWidth: 1, borderColor: "black", flex: 1 },
  hpBox: { width: 80, height: 24, backgroundColor: "white", borderWidth: 1, borderColor: "black" },
  hpText: { color: "white", fontFamily: "Pixel", fontSize: 12, marginBottom: 16 },
  logsCard: { borderWidth: 2, borderColor: "rgba(168,85,247,0.5)", borderRadius: 10, padding: 16, backgroundColor: "rgba(0,0,0,0.6)" },
  cardTitle: { color: "white", fontSize: 20, marginBottom: 8, textAlign: "center", fontFamily: "Pixel" },
  logText: { color: "white", fontFamily: "Pixel", fontSize: 14, marginBottom: 4 },
});
