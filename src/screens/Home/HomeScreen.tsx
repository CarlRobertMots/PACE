import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  ScrollView,
  SafeAreaView,
  ActivityIndicator,
  Pressable,
  Platform,
  StyleSheet,
} from "react-native";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "../../navigation/types";

// Boss API
import { fetchCurrentBoss, BossData } from "../../api/bosses/bossService";

// Step tracker (UNCHANGED)
import { StepCircle } from "../../components/StepCounter/StepCountDisplay";

import BossHealthBar from "../../components/Boss/BossHealthBar";

export default function IndexScreen() {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const [loading, setLoading] = useState(true);
  const [boss, setBoss] = useState<BossData | null>(null);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const bossData = await fetchCurrentBoss();
      setBoss(bossData);
    } catch (e) {
      console.error(e);
      setBoss(null);
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
    <SafeAreaView style={styles.root}>

      <ScrollView contentContainerStyle={{ paddingBottom: 120 }}>
        {/* BACKGROUND */}
        <View style={styles.hero}>
          <Image
            source={{
              uri: "https://api.builder.io/api/v1/image/assets/TEMP/c10362e8e734be7ef54fc13260826af602f02a67?width=1375",
            }}
            style={styles.heroImg}
            resizeMode="cover"
          />
        </View>

        <View style={styles.content}>
          {/* BOSS */}

        <Pressable
          onPress={() => navigation.navigate("DetailedView")}
        >
          <BossHealthBar
            name={boss?.name ?? "Master Beater"}
            currentHp={boss?.current_hp ?? 650}
            maxHp={boss?.max_hp ?? 1000}
          />
        </Pressable>

          {/* STEP TRACKER — SAME LOGIC */}
          <View style={styles.stepSection}>
            {Platform.OS !== "web" ? (
              <Pressable
                onPress={() =>
                  navigation.navigate("StepDetailScreen" as never)
                }
              >
                <StepCircle />
              </Pressable>
            ) : (
              <View style={styles.stepFallback}>
                <Text style={{ color: "white" }}>0%</Text>
              </View>
            )}
          </View>

          {/* LEADERBOARD */}
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Leaderboard</Text>

            {[
              { user: "User 1", level: "Lvl 1: Crook", score: "7000" },
              { user: "User 2", level: "Lvl 1: Crook", score: "6000" },
              { user: "User 3", level: "Lvl 1: Crook", score: "1000" },
            ].map((e, i) => (
              <View key={i} style={styles.lbRow}>
                <View style={styles.avatar} />
                <View style={{ flex: 1 }}>
                  <Text style={styles.lbText}>{e.user}</Text>
                  <Text style={styles.lbText}>{e.level}</Text>
                </View>
                <Text style={styles.lbScore}>{e.score}</Text>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>

    </SafeAreaView>
  );
}


const PURPLE = "rgba(168,85,247,0.5)";

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: "black",
  },

  loader: {
    flex: 1,
    backgroundColor: "#000",
    alignItems: "center",
    justifyContent: "center",
  },

  hero: {
    height: 398,
    overflow: "hidden",
  },
  heroImg: {
    width: "100%",
    height: "100%",
  },

  content: {
    paddingHorizontal: 16,
    marginTop: -48,
  },

  bossTitle: {
    color: "white",
    fontFamily: "Pixel",
    fontSize: 16,
    textShadowColor: "#000",
    textShadowOffset: { width: 1, height: 1 },
  },

  hpRow: {
    flexDirection: "row",
    gap: 8,
    marginTop: 6,
  },
  hpFill: {
    height: 24,
    backgroundColor: "#dc2626",
    borderWidth: 1,
    borderColor: "black",
    flex: 1,
  },
  hpBox: {
    width: 80,
    height: 24,
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "black",
  },

  hpText: {
    color: "white",
    fontFamily: "Pixel",
    fontSize: 12,
    marginTop: 4,
  },

  stepSection: {
    alignItems: "center",
    marginVertical: 48,
  },

  stepFallback: {
    width: 96,
    height: 96,
    borderRadius: 48,
    backgroundColor: "#444",
    alignItems: "center",
    justifyContent: "center",
  },

  card: {
    backgroundColor: "rgba(0,0,0,0.6)",
    borderWidth: 2,
    borderColor: PURPLE,
    borderRadius: 10,
    padding: 16,
    marginBottom: 80,
  },

  cardTitle: {
    color: "white",
    fontFamily: "Sans",
    fontSize: 28,
    textAlign: "center",
    marginBottom: 24,
  },

  lbRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    marginBottom: 20,
  },

  avatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "black",
  },

  lbText: {
    color: "white",
    fontFamily: "Pixel",
    fontSize: 16,
  },

  lbScore: {
    color: "white",
    fontFamily: "Pixel",
    fontSize: 24,
  },
});
