import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { useSteps } from "./StepContext";
import StepCircle from "./StepCircle";

export default function StepCountDisplay() {
  const { steps, resetSteps } = useSteps();

  return (
    <View className="items-center justify-center p-4">
      <StepCircle steps={steps} />

      <Text className="text-gray-400 text-xs mt-4">
        Steps are now tracked globally!
      </Text>

      {/* Optional Reset Button */}
      <TouchableOpacity onPress={resetSteps} className="mt-2">
        <Text className="text-red-500 text-xs">Reset Counter</Text>
      </TouchableOpacity>
    </View>
  );
}
