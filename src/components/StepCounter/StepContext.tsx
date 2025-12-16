import React, { createContext, useContext, useState, useEffect } from "react";
import { Platform } from "react-native"; // <--- 1. Import Platform
import { Accelerometer } from "expo-sensors";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface StepContextType {
  steps: number;
  resetSteps: () => void;
  simulateStep: () => void; // <--- 2. Added for Web Testing
}

const StepContext = createContext<StepContextType | undefined>(undefined);

export const StepProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [steps, setSteps] = useState(0);

  // Load saved steps
  useEffect(() => {
    const loadSteps = async () => {
      try {
        const savedSteps = await AsyncStorage.getItem("dailySteps");
        if (savedSteps) {
          setSteps(parseInt(savedSteps, 10));
        }
      } catch (e) {
        console.log("Storage error:", e);
      }
    };
    loadSteps();
  }, []);

  // Save steps
  useEffect(() => {
    // Only save if steps > 0 to avoid overwriting with 0 on glitches
    if (steps > 0) {
      AsyncStorage.setItem("dailySteps", steps.toString()).catch((err) =>
        console.log(err)
      );
    }
  }, [steps]);

  // The Sensor Logic (Web Safe)
  useEffect(() => {
    // 🛑 STOP if on Web (Prevents the crash)
    if (Platform.OS === "web") {
      return;
    }

    // 🛑 STOP if on Simulator (Optional, prevents warnings)
    if (!Accelerometer.isAvailableAsync()) {
      return;
    }

    let lastStepTime = 0;
    Accelerometer.setUpdateInterval(100);

    const subscription = Accelerometer.addListener(({ x, y, z }) => {
      const magnitude = Math.sqrt(x * x + y * y + z * z);
      const threshold = 1.2;
      const now = Date.now();

      if (magnitude >= threshold && now - lastStepTime > 350) {
        setSteps((prev) => prev + 1);
        lastStepTime = now;
      }
    });

    return () => subscription && subscription.remove();
  }, []);

  const resetSteps = () => setSteps(0);

  // 3. Helper to test steps on Web without sensors
  const simulateStep = () => setSteps((prev) => prev + 1);

  return (
    <StepContext.Provider value={{ steps, resetSteps, simulateStep }}>
      {children}
    </StepContext.Provider>
  );
};

export const useSteps = () => {
  const context = useContext(StepContext);
  if (!context) throw new Error("useSteps must be used within a StepProvider");
  return context;
};
