import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

//  COMMENTED OUT: We are disconnecting the backend for now
// import { fetchCurrentBoss, BossData } from "../../api/bosses/bossService";

import { StepCircle } from "../../components/StepCounter/StepCountDisplay";

export default function HomeScreen() {
  const [loading, setLoading] = useState(false); // Set to false immediately
  const navigation = useNavigation();

  // 🤖 DUMMY DATA: Hardcoded boss so the screen looks nice
  const boss = {
    name: "Training Dummy",
    current_hp: 50,
    max_hp: 100,
  };

  /* 🔴 COMMENTED OUT: No fetching data
  const [boss, setBoss] = useState<BossData | null>(null);

  useEffect(() => {
    loadBossData();
  }, []);

  const loadBossData = async () => {
    setLoading(true);
    const bossData = await fetchCurrentBoss();
    setBoss(bossData);
    setLoading(false);
  };
  */

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
          <Text className="text-gray-400 text-sm">Step Tracking Test Mode</Text>
        </View>

        {/* --- BOSS SECTION (Mock Data) --- */}
        <View className="bg-gray-800 rounded-xl p-4 mb-6 border border-gray-700 shadow-lg">
          <Text className="text-gray-500 font-bold uppercase tracking-widest text-xs mb-2">
            Target (Offline)
          </Text>
          <View className="items-center">
            <View className="h-24 w-24 bg-gray-700 rounded-full mb-3 items-center justify-center">
              <Text className="text-4xl">🤖</Text>
            </View>

            <Text className="text-white text-xl font-bold mb-1">
              {boss.name}
            </Text>

            <View className="w-full bg-gray-900 h-4 rounded-full mt-2 overflow-hidden border border-gray-600">
              <View className="h-full bg-blue-600" style={{ width: "50%" }} />
            </View>
            <Text className="text-gray-400 text-xs mt-1">
              {boss.current_hp} / {boss.max_hp} HP
            </Text>
          </View>
        </View>

        {/* --- STEP SECTION (The Real Test) --- */}
        <View className="bg-gray-800 rounded-xl p-6 border border-gray-700 items-center mb-6">
          <Text className="text-gray-400 text-sm mb-4 uppercase tracking-wider">
            Live Step Counter
          </Text>

          {/* This is the only thing we are testing right now */}
          <TouchableOpacity
            onPress={() => navigation.navigate("StepDetailScreen" as never)}
          >
            <StepCircle />
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
