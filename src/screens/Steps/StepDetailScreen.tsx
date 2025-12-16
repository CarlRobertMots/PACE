import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { useSteps } from "../../components/StepCounter/StepContext"; // <--- Import the hook

export default function StepDetailScreen() {
  const { steps } = useSteps();

  return (
    <View className="flex-1 bg-black items-center justify-center">
      <Text className="text-white text-2xl font-bold mb-4">
        Activity Details
      </Text>

      {/* You can re-use the StepCircle or make a new graph */}
      <View className="bg-gray-900 p-6 rounded-2xl w-4/5 items-center">
        <Text className="text-gray-400 text-sm uppercase">
          Total Steps Today
        </Text>
        <Text className="text-white text-5xl font-black my-2">{steps}</Text>
        <Text className="text-green-500 text-sm">Goal: 10,000</Text>
      </View>
    </View>
  );
}
