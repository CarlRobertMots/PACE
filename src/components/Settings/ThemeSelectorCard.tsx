import React from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";
import { useTheme } from "../../context/ThemeContext";

type ThemeOption = "light" | "dark" | "system";

export default function ThemeSelectorCard() {
  const { theme, setTheme, currentScheme } = useTheme();

  const getCircleColor = (option: ThemeOption) => {
    if (option === "light") return "#eee";
    if (option === "dark") return "#222";
    if (option === "system") return currentScheme === "dark" ? "#222" : "#eee";
  };

  return (
    <View style={styles.card}>
      <Text style={styles.cardTitle}>Theme</Text>
      <View style={styles.row}>
        {(["light", "system", "dark"] as ThemeOption[]).map((option) => (
          <Pressable
            key={option}
            onPress={() => setTheme(option)}
            style={[
              styles.circle,
              { backgroundColor: getCircleColor(option) },
              theme === option ? styles.selectedCircle : {},
            ]}
          />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "rgba(0,0,0,0.6)",
    borderWidth: 2,
    borderColor: "rgba(168,85,247,0.5)",
    borderRadius: 10,
    padding: 16,
    marginVertical: 20,
  },
  cardTitle: {
    color: "white",
    fontFamily: "Pixel",
    fontSize: 24,
    marginBottom: 12,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  circle: {
    width: 50,
    height: 50,
    borderRadius: 25,
    borderWidth: 2,
    borderColor: "rgba(168,85,247,0.5)",
  },
  selectedCircle: {
    borderColor: "#a855f7",
    borderWidth: 3,
  },
});
