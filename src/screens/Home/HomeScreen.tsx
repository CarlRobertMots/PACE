import React, { useEffect, useState, useMemo } from "react";
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  Pressable,
  Platform,
} from "react-native";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "../../navigation/types";

// 1. Import Boss Service
import { fetchCurrentBoss, BossData } from "../../api/bosses/bossService";

// 2. Import Step Context & New Visual Component
import { useSteps } from "../../components/StepCounter/StepContext";
import StepCircle from "../../components/StepCounter/StepCircle";

export default function HomeScreen() {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const [loading, setLoading] = useState(true);
  const [boss, setBoss] = useState<BossData | null>(null);

  const { steps } = useSteps();

  // StepCircle ray data
  const mockDetailedHistory = useMemo(() => {
    return Array.from({ length: 144 }).map((_, i) => {
      let base = Math.random() * 50;
      if (i > 36 && i < 60) base += Math.random() * 800;
      if (i > 72 && i < 84) base += Math.random() * 400;
      if (i > 108 && i < 126) base += Math.random() * 1000;
      if (i < 30 || i > 138) base = Math.random() < 0.1 ? 50 : 0;
      return Math.floor(base);
    });
  }, []);

  useEffect(() => {
    loadCampData();
  }, []);

  const loadCampData = async () => {
    setLoading(true);
    try {
      const bossData = await fetchCurrentBoss();
      setBoss(bossData);
    } catch (error) {
      console.error("Error loading home data:", error);
      setBoss(null);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <View className="flex-1 bg-gray-900 items-center justify-center">
        <ActivityIndicator size="large" color="#fbbf24" />
      </View>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-gray-900">
      <ScrollView className="flex-1 p-4">
        {/* Header */}
        <View className="mb-6 mt-2">
          <Text className="text-white text-2xl font-bold">Base Camp</Text>
          <Text className="text-gray-400 text-sm">Prepare for battle</Text>
        </View>

        {/* BOSS SECTION */}
        <View className="bg-gray-800 rounded-xl p-4 mb-6 border border-gray-700 shadow-lg">
          <Text className="text-red-500 font-bold uppercase tracking-widest text-xs mb-2">
            Current Target
          </Text>
          <View className="items-center">
            {/* Boss Icon Placeholder */}
            <View className="h-24 w-24 bg-gray-700 rounded-full mb-3 items-center justify-center">
              <Text className="text-4xl">👹</Text>
            </View>
            <Text className="text-white text-xl font-bold mb-1">
              {boss?.name ?? "Unknown Beast"}
            </Text>
            {/* HP Bar */}
            <View className="w-full bg-gray-900 h-4 rounded-full mt-2 overflow-hidden border border-gray-600">
              <View
                className="h-full bg-red-600"
                style={{
                  width: boss
                    ? `${(boss.current_hp / boss.max_hp) * 100}%`
                    : "50%",
                }}
              />
            </View>
            <Text className="text-gray-400 text-xs mt-1">
              {boss ? `${boss.current_hp} / ${boss.max_hp} HP` : "Loading..."}
            </Text>
            <Pressable
              className="mt-6 bg-blue-600 px-6 py-2 rounded-full"
              onPress={() => navigation.navigate("DetailedView")}
            >
              <Text className="text-white font-bold">Detailed View</Text>
            </Pressable>
          </View>
        </View>

        {/* STEP CIRCLE (Standalone, No Container) */}
        <View className="items-center mb-6">
          <TouchableOpacity
            onPress={() => navigation.navigate("StepDetailScreen" as never)}
            className="items-center justify-center"
          >
            {Platform.OS !== "web" ? (
              <StepCircle
                steps={steps}
                radius={75}
                detailedData={mockDetailedHistory}
              />
            ) : (
              <View className="h-24 w-24 bg-gray-700 rounded-full items-center justify-center">
                <Text className="text-white">Web Not Supported</Text>
              </View>
            )}
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
