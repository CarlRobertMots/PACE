import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  Pressable,
} from "react-native";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "../../navigation/types";

// 1. Import Boss Service
import { fetchCurrentBoss, BossData } from "../../api/bosses/bossService";

// 2. Import Step Logic
// Make sure this path points to where you actually saved the new StepCircle code!
import { StepCircle } from "../../components/StepCounter/StepCountDisplay";

export default function HomeScreen() {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const [loading, setLoading] = useState(true);
  const [boss, setBoss] = useState<BossData | null>(null);

  useEffect(() => {
    loadCampData();
  }, []);

  const loadCampData = async () => {
    setLoading(true);

    try {
      // A. Fetch Boss
      const bossData = await fetchCurrentBoss();
      setBoss(bossData);
    } catch (error) {
      console.error("Error loading home data:", error);
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

        {/*  BOSS SECTION  */}
        <View className="bg-gray-800 rounded-xl p-4 mb-6 border border-gray-700 shadow-lg">
          <Text className="text-red-500 font-bold uppercase tracking-widest text-xs mb-2">
            Current Target
          </Text>
          <View className="items-center">
            {/* Boss Icon */}
            <View className="h-24 w-24 bg-gray-700 rounded-full mb-3 items-center justify-center">
              <Text className="text-4xl">👹</Text>
            </View>

            <Text className="text-white text-xl font-bold mb-1">
              {boss ? boss.name : "Unknown Beast"}
            </Text>

            {/* HP Bar */}
            <View className="w-full bg-gray-900 h-4 rounded-full mt-2 overflow-hidden border border-gray-600">
              <View
                className="h-full bg-red-600"
                style={{
                  width: boss
                    ? `${(boss.current_hp / boss.max_hp) * 100}%`
                    : "0%",
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

        {/* STEP SECTION  */}
        <View className="bg-gray-800 rounded-xl p-6 border border-gray-700 items-center mb-6">
          <Text className="text-gray-400 text-sm mb-4 uppercase tracking-wider">
            Today's Progress
          </Text>

          <TouchableOpacity
            onPress={() => navigation.navigate("StepDetailScreen" as never)}
          >
            <StepCircle />
          </TouchableOpacity>

          <TouchableOpacity className="mt-6 bg-blue-600 px-6 py-2 rounded-full">
            <Text className="text-white font-bold">Sync Data</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
