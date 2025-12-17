import React from "react";
import { View, Text, StyleSheet } from "react-native";

type BossHealthBarProps = {
  name: string;
  currentHp: number;
  maxHp: number;
};

export default function BossHealthBar({
  name,
  currentHp,
  maxHp,
}: BossHealthBarProps) {
  const hpPercent =
    maxHp > 0 ? Math.max(0, Math.min(1, currentHp / maxHp)) : 0;

  return (
    <View>
      {/* TITLE */}
      <Text style={styles.bossTitle}>{name} — Boss</Text>

      {/* HP BAR */}
      <View style={styles.hpRow}>
        <View
          style={[
            styles.hpFill,
            {
              width: `${hpPercent * 100}%`,
            },
          ]}
        />
        <View style={styles.hpBox} />
      </View>

      {/* HP TEXT */}
      <Text style={styles.hpText}>
        {currentHp} / {maxHp} HP
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
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
    flexShrink: 1,
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
});
