import React, { createContext, useContext, useState, useEffect } from "react";
import { Accelerometer } from "expo-sensors";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Define the shape of our global data
interface StepContextType {
  steps: number;
  resetSteps: () => void;
}

const StepContext = createContext<StepContextType | undefined>(undefined);

export const StepProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [steps, setSteps] = useState(0);

  // 1. Load saved steps on startup
  useEffect(() => {
    const loadSteps = async () => {
      const savedSteps = await AsyncStorage.getItem("dailySteps");
      if (savedSteps) {
        setSteps(parseInt(savedSteps, 10));
      }
    };
    loadSteps();
  }, []);

  // 2. Save steps whenever they change
  useEffect(() => {
    AsyncStorage.setItem("dailySteps", steps.toString());
  }, [steps]);

  // 3. The Accelerometer Logic (Moved here!)
  useEffect(() => {
    let lastStepTime = 0;

    // Update every 100ms
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

    return () => subscription.remove();
  }, []);

  const resetSteps = () => setSteps(0);

  return (
    <StepContext.Provider value={{ steps, resetSteps }}>
      {children}
    </StepContext.Provider>
  );
};

// Custom Hook to use steps easily
export const useSteps = () => {
  const context = useContext(StepContext);
  if (!context) throw new Error("useSteps must be used within a StepProvider");
  return context;
};
