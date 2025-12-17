import React from "react";
import { View, Text, Image, ScrollView, StyleSheet } from "react-native";

export default function Profile() {
  return (
    <View style={styles.container}>

      <ScrollView contentContainerStyle={styles.scroll}>
        {/* HEADER */}
        <View style={styles.header}>
          {/* Decorative diamonds */}
          <View style={styles.decorLeft}>
            {[1, 2, 3].map((_, i) => (
              <View key={i} style={styles.diamond} />
            ))}
          </View>

          <View style={styles.decorRight}>
            {[1, 2].map((_, i) => (
              <View key={i} style={styles.diamond} />
            ))}
          </View>

          {/* Character */}
          <View style={styles.characterWrap}>
            <View style={styles.platform} />
            <Image
              source={{
                uri: "https://api.builder.io/api/v1/image/assets/TEMP/393d0730b43fb8814c82b11cf99abbdf551e2e9b?width=230",
              }}
              style={styles.character}
              resizeMode="contain"
            />
          </View>
        </View>

        {/* CONTENT */}
        <View style={styles.content}>
          {/* PROFILE CARD */}
          <View style={styles.card}>
            <View style={styles.row}>
              <View style={{ flex: 1 }}>
                <Text style={styles.name}>Anon</Text>
                <Text style={styles.level}>Lvl: 2</Text>
              </View>

              <View style={{ flex: 1 }}>
                {statBar("Health", "red", "60%")}
                {statBar("Mana", "blue", "11%")}
                {statBar("Experience", "#22d3ee", "93%")}
              </View>
            </View>
          </View>

          {/* STATS */}
          <View style={styles.card}>
            <Text style={styles.sectionTitle}>Stats</Text>
            <View style={styles.grid}>
              {["ATK", "STR", "DEX", "SEN"].map((s) => (
                <Text key={s} style={styles.statText}>
                  {s} Boost 1.3x
                </Text>
              ))}
            </View>
          </View>

          {/* SKINS */}
          <View style={styles.card}>
            <Text style={styles.sectionTitle}>Skins</Text>
            {[1, 2].map((i) => (
              <View key={i} style={styles.skinRow}>
                <Text style={styles.statText}>Lorem Ipsum</Text>
                <View style={styles.diamond} />
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

function statBar(label: string, color: string, width: string) {
  return (
    <View style={{ marginBottom: 10 }}>
      <Text style={styles.barLabel}>{label}</Text>
      <View style={styles.barOuter}>
        <View style={[styles.barInner]} />
      </View>
    </View>
  );
}


const PURPLE = "rgba(168,85,247,0.75)";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
  },
  scroll: {
    paddingBottom: 80,
  },

  header: {
    height: 288,
    backgroundColor: "#000",
    justifyContent: "center",
    alignItems: "center",
  },

  decorLeft: {
    position: "absolute",
    top: 48,
    left: 30,
    gap: 60,
  },
  decorRight: {
    position: "absolute",
    top: 72,
    right: 20,
    gap: 96,
  },

  diamond: {
    width: 44,
    height: 44,
    borderWidth: 3,
    borderColor: PURPLE,
    transform: [{ rotate: "45deg" }],
    borderRadius: 6,
  },

  characterWrap: {
    alignItems: "center",
    marginBottom: -32,
  },
  platform: {
    width: 128,
    height: 12,
    backgroundColor: "rgba(168,85,247,0.35)",
    borderRadius: 999,
    marginBottom: 8,
  },
  character: {
    width: 112,
    height: 140,
  },

  content: {
    paddingHorizontal: 28,
    paddingTop: 32,
    gap: 24,
  },

  card: {
    borderWidth: 2,
    borderColor: "rgba(168,85,247,0.5)",
    borderRadius: 10,
    padding: 16,
    backgroundColor: "rgba(0,0,0,0.6)",
  },

  row: {
    flexDirection: "row",
    gap: 12,
  },

  name: {
    color: "white",
    fontSize: 24,
  },
  level: {
    color: "rgba(255,255,255,0.9)",
    fontSize: 18,
  },

  barLabel: {
    fontSize: 10,
    color: "rgba(255,255,255,0.9)",
    marginBottom: 2,
  },
  barOuter: {
    height: 16,
    borderWidth: 1,
    borderColor: "rgba(168,85,247,0.5)",
    borderRadius: 8,
    overflow: "hidden",
  },
  barInner: {
    height: "100%",
  },

  sectionTitle: {
    color: "white",
    fontSize: 24,
    marginBottom: 16,
  },

  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
  },

  statText: {
    color: "white",
    fontSize: 16,
    width: "48%",
  },

  skinRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
});
