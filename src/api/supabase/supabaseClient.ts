// src/api/supabase/supabaseClient.ts

import { AppState } from "react-native";
import "react-native-url-polyfill/auto";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createClient } from "@supabase/supabase-js";

// ------------------------------------------------------------------
// 🔑 PASTE YOUR KEYS HERE FROM db_test_gbrds.js
// ------------------------------------------------------------------
const SUPABASE_URL = "https://YOUR_PROJECT_ID.supabase.co";
const SUPABASE_ANON_KEY = "YOUR_LONG_ANON_KEY_STRING";

// Create the Supabase client with mobile-specific settings
export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
  auth: {
    storage: AsyncStorage, // Stores the login session on the phone
    autoRefreshToken: true, // Keeps user logged in
    persistSession: true, // Remembers user after closing app
    detectSessionInUrl: false, // Disable OAuth URL checks (not needed for simple login)
  },
});

// Helper: Refresh the session when the app comes back to the foreground
AppState.addEventListener("change", (state) => {
  if (state === "active") {
    supabase.auth.startAutoRefresh();
  } else {
    supabase.auth.stopAutoRefresh();
  }
});
