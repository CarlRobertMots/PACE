// Displays current/target numbers
// src/components/StepCounter/StepCountDisplay.tsx
import React from "react";
import { View, Text } from "react-native";

/**
 * MOCK FUNCTION: Returns a fake step count for testing UI.
 * Later, we will replace this with real Pedometer data.
 */
export const testSteps = async (): Promise<number> => {
  // Simulate a delay like a real database call
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(7245); // Fake steps for "Today"
    }, 500);
  });
};

/**
 * OPTIONAL: A reusable UI component for the circle if you want to use it elsewhere.
 */
export const StepCircle = ({ steps }: { steps: number }) => (
  <View className="h-40 w-40 rounded-full border-8 border-blue-500 items-center justify-center shadow-lg bg-gray-800">
    <Text className="text-white text-4xl font-extrabold">{steps}</Text>
    <Text className="text-gray-400 text-xs uppercase tracking-widest">
      Steps
    </Text>
  </View>
);
