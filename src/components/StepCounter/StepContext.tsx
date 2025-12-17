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
import { getUserInfo, updateUserInfo } from "../../routes/userRoute";

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

  const lastSavedSteps = useRef(0); // For daily sync throttling
  const lastTotalSyncedSteps = useRef(0); // For total steps calculation
  const stepsRef = useRef(0); // Keeps track of steps state inside the interval

  // Keep ref in sync with state for the interval to read
  useEffect(() => {
    stepsRef.current = steps;
  }, [steps]);

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
          const today = new Date().toISOString().split("T")[0];
          const cloudData = await fetchSteps(userId, today, today);

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
      lastTotalSyncedSteps.current = finalSteps;
    };

    loadSteps();
  }, [userId]);

  // 3. Save Logic (Throttled Sync for Daily Steps)
  useEffect(() => {
    const saveSteps = async () => {
      await AsyncStorage.setItem("dailySteps", steps.toString());

      if (userId && steps > lastSavedSteps.current + 10) {
        try {
          const today = new Date().toISOString().split("T")[0];
          await modifySteps(userId, today, steps);
          lastSavedSteps.current = steps;
          console.log(`☁️ Synced ${steps} steps to daily log.`);
        } catch (err) {
          console.log("Cloud save failed:", err);
        }
      }
    };

    saveSteps();
  }, [steps, userId]);

  // 4. Sync Total Steps (Every 1 Minute)
  useEffect(() => {
    if (!userId) return;

    const intervalId = setInterval(async () => {
      const currentSteps = stepsRef.current;
      const baseline = lastTotalSyncedSteps.current;

      // If steps were reset (current < baseline), reset baseline and exit
      if (currentSteps < baseline) {
        lastTotalSyncedSteps.current = currentSteps;
        return;
      }

      // Calculate how many NEW steps we walked since last sync
      const delta = currentSteps - baseline;

      // Only sync if we have new steps
      if (delta > 0) {
        try {
          console.log(`Checking Total Steps Sync... Delta: ${delta}`);

          // A. Fetch current Total from DB to be safe
          const userInfo = await getUserInfo(userId);
          const currentDbTotal = userInfo.total_steps || 0;

          // B. Add the Delta
          const newTotal = currentDbTotal + delta;

          // C. Update DB
          await updateUserInfo(userId, { total_steps: newTotal });

          // D. Update baseline so we don't count these steps again
          lastTotalSyncedSteps.current = currentSteps;

          console.log(
            ` Updated Lifetime Total: ${currentDbTotal} -> ${newTotal}`
          );
        } catch (err) {
          console.error("Failed to sync total steps:", err);
        }
      }
    }, 60000);

    return () => clearInterval(intervalId);
  }, [userId]);

  // 5. Sensor Logic
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

  const resetSteps = () => {
    setSteps(0);
  };

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
