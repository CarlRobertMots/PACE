import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Accelerometer } from "expo-sensors";

export const StepCircle = () => {
  const [steps, setSteps] = useState(0);
  const [monitoring, setMonitoring] = useState(false);

  //  TUNING SETTINGS

  const THRESHOLD = 1.4;

  // How fast can you walk?
  // 350ms means max ~3 steps per second. Prevents "double counting" one shake.
  const STEP_DELAY_MS = 350;

  useEffect(() => {
    startTracking();
    return () => stopTracking();
  }, []);

  let lastStepTime = 0;

  const startTracking = () => {
    setMonitoring(true);
    // Update every 100ms (10 times a second)
    Accelerometer.setUpdateInterval(100);

    Accelerometer.addListener((data) => {
      const { x, y, z } = data;

      // Math: Total G-Force
      const totalForce = Math.sqrt(x * x + y * y + z * z);

      // Only count if force is significant AND enough time passed
      if (totalForce > THRESHOLD) {
        const now = Date.now();
        if (now - lastStepTime > STEP_DELAY_MS) {
          lastStepTime = now;
          setSteps((current) => current + 1);
        }
      }
    });
  };

  const stopTracking = () => {
    setMonitoring(false);
    Accelerometer.removeAllListeners();
  };

  return (
    <View className="items-center">
      <View className="h-40 w-40 rounded-full border-8 border-green-500 items-center justify-center bg-gray-800 mb-4 shadow-lg">
        <Text className="text-white text-4xl font-extrabold">{steps}</Text>
        <Text className="text-gray-400 text-xs uppercase tracking-widest">
          {monitoring ? "Active" : "Paused"}
        </Text>
      </View>

      <TouchableOpacity
        onPress={() => setSteps(0)}
        className="bg-gray-700 px-6 py-2 rounded-full"
      >
        <Text className="text-white font-bold">Reset</Text>
      </TouchableOpacity>
    </View>
  );
};
