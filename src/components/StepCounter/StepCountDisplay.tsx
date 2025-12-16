import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Accelerometer } from "expo-sensors";
import StepCircle from "./StepCircle";

export default function StepCountDisplay() {
  const [steps, setSteps] = useState(0);
  const [isPedometerActive, setIsPedometerActive] = useState("starting");

  // Debug values to see if sensor is even working
  const [debugData, setDebugData] = useState({ x: 0, y: 0, z: 0 });

  useEffect(() => {
    let lastMagnitude = 0;
    let lastStepTime = 0;
    let subscription: any = null;

    const subscribe = async () => {
      // 1. Set Update Interval (Fast enough to catch a step)
      // 100ms = 10 updates per second
      Accelerometer.setUpdateInterval(100);

      setIsPedometerActive("active");

      subscription = Accelerometer.addListener((data) => {
        setDebugData(data); // Update debug view

        const { x, y, z } = data;

        // 2. Calculate the total G-Force (Magnitude)
        // Normal standing still = 1.0 (Earth's gravity)
        const magnitude = Math.sqrt(x * x + y * y + z * z);

        // 3. Detect a "Peak" (The step impact)
        // Threshold: 1.2 means 20% more force than gravity (a standard step jolt)
        const threshold = 1.2;
        const now = Date.now();

        // 4. Count step if:
        // - Force is strong enough
        // - AND it's been at least 350ms since the last step (Humanly impossible to walk faster)
        if (magnitude >= threshold && now - lastStepTime > 350) {
          setSteps((prev) => prev + 1);
          lastStepTime = now;
        }

        lastMagnitude = magnitude;
      });
    };

    subscribe();

    return () => {
      if (subscription) subscription.remove();
    };
  }, []);

  return (
    <View className="items-center justify-center p-4">
      {/* Visual Component */}
      <StepCircle steps={steps} />

      {/* Debug Controls */}
      <View className="mt-8 bg-gray-900 p-4 rounded-xl w-full max-w-xs">
        <Text className="text-white font-bold mb-2">Debug Dashboard</Text>

        <Text className="text-gray-400 text-xs">
          Status: <Text className="text-green-400">{isPedometerActive}</Text>
        </Text>

        <Text className="text-gray-400 text-xs mt-1">
          Raw Force: {debugData.x.toFixed(2)} | {debugData.y.toFixed(2)} |{" "}
          {debugData.z.toFixed(2)}
        </Text>

        <TouchableOpacity
          onPress={() => setSteps(0)}
          className="bg-red-500 mt-4 p-2 rounded items-center"
        >
          <Text className="text-white font-bold text-xs">RESET COUNT</Text>
        </TouchableOpacity>
      </View>

      <Text className="text-center text-gray-500 text-xs mt-4 px-8">
        Shake your phone up and down to test!
      </Text>
    </View>
  );
}
