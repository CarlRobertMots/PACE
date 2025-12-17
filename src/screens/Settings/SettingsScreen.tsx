import React from "react";
import { ScrollView, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import ThemeSelectorCard from "../../components/Settings/ThemeSelectorCard";
import LogoutCard from "../../components/Settings/LogoutCard";
import { useTheme } from "../../context/ThemeContext";

export default function SettingsScreen() {
  const { theme, currentScheme } = useTheme();

  const getBackgroundColor = () => {
    if (theme === "light") return "#fff";
    if (theme === "dark") return "#000";
    return currentScheme === "dark" ? "#000" : "#fff";
  };

  return (
    <SafeAreaView
      style={[styles.root, { backgroundColor: getBackgroundColor() }]}
    >
      <ScrollView contentContainerStyle={styles.content}>
        <ThemeSelectorCard />
        <LogoutCard />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  content: {
    padding: 16,
    paddingBottom: 120,
  },
});
