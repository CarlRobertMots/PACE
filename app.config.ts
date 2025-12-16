import "dotenv/config";

export default {
  expo: {
    name: "Pace",
    slug: "pace",
    extra: {
      supabaseUrl: process.env.SUPABASE_URL,
      supabaseAnonKey: process.env.SUPABASE_ANON_KEY,
    },
  },
};