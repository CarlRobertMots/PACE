// FILE: src/api/supabase/supabaseClient.ts

import "react-native-url-polyfill/auto";
import AsyncStorage from "@react-native-async-storage/async-storage";
// import { createClient } from "@supabase/supabase-js";

// 1. placeholder so we don't crash on 'undefined'
const supabaseUrl = process.env.SUPABASE_URL || "https://placeholder.co";
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY || "placeholder";

// 2. Export a FAKE supabase object.
// This tricks bossService.ts into thinking Supabase is ready.
export const supabase = {
  from: (table: string) => ({
    select: () => ({
      eq: () => ({
        single: async () => ({ data: null, error: null }), // Returns empty data
        order: async () => ({ data: [], error: null }),
      }),
      order: async () => ({ data: [], error: null }),
    }),
  }),
  auth: {
    getSession: async () => ({ data: { session: null }, error: null }),
    onAuthStateChange: () => ({
      data: { subscription: { unsubscribe: () => {} } },
    }),
  },
} as any;