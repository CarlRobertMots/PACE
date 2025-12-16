import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useRef,
} from "react";
import { AppState, Platform } from "react-native";
import { Accelerometer } from "expo-sensors";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { supabase } from "../../lib/supabaseClient";
import { modifySteps, fetchSteps } from "../../routes/stepRoute";

interface StepContextType {
  steps: number;
  resetSteps: () => void;
  simulateStep: () => void;
}

const StepContext = createContext<StepContextType | undefined>(undefined);

export const StepProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [steps, setSteps] = useState(0);
  const [userId, setUserId] = useState<string | null>(null);
  const lastSavedSteps = useRef(0); // To prevent spamming the database

  // 1. Get current User ID
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) setUserId(session.user.id);
    });
  }, []);

  // 2. Load Initial Steps (Local + Cloud Merge)
  useEffect(() => {
    const loadSteps = async () => {
      // A. Load Local
      const localStr = await AsyncStorage.getItem("dailySteps");
      const localSteps = localStr ? parseInt(localStr, 10) : 0;
      let finalSteps = localSteps;

      // B. Load Cloud (If logged in)
      if (userId) {
        try {
          // Get today's date string (YYYY-MM-DD)
          const today = new Date().toISOString().split("T")[0];
          const cloudData = await fetchSteps(userId, today, today);

          // If cloud has more steps (e.g. from another device), use that
          if (
            cloudData &&
            cloudData.length > 0 &&
            cloudData[0].steps > localSteps
          ) {
            finalSteps = cloudData[0].steps;
          }
        } catch (e) {
          console.log("Sync error:", e);
        }
      }

      setSteps(finalSteps);
    };

    loadSteps();
  }, [userId]);

  // 3. Save Logic (Throttled Sync)
  useEffect(() => {
    const saveSteps = async () => {
      // Save Locally
      await AsyncStorage.setItem("dailySteps", steps.toString());

      // Save to Cloud (Only if logged in and steps changed significantly)
      // We check if steps > lastSaved + 10 to avoid sending request on EVERY step
      if (userId && steps > lastSavedSteps.current + 10) {
        try {
          const today = new Date().toISOString().split("T")[0];

          // Use your route function!
          await modifySteps(userId, today, steps);

          lastSavedSteps.current = steps;
          console.log(`☁️ Synced ${steps} steps to cloud.`);
        } catch (err) {
          console.log("Cloud save failed:", err);
        }
      }
    };

    saveSteps();
  }, [steps, userId]);

  // 4. Sensor Logic (Existing)
  useEffect(() => {
    if (Platform.OS === "web") return;

    let lastStepTime = 0;
    Accelerometer.setUpdateInterval(100);

    const subscription = Accelerometer.addListener(({ x, y, z }) => {
      const magnitude = Math.sqrt(x * x + y * y + z * z);
      if (magnitude >= 1.2 && Date.now() - lastStepTime > 350) {
        setSteps((prev) => prev + 1);
        lastStepTime = Date.now();
      }
    });

    return () => subscription && subscription.remove();
  }, []);

  const resetSteps = () => setSteps(0);
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
