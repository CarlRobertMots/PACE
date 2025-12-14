// const { createClient } = require("@supabase/supabase-js");

require("dotenv").config();

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY;

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function main() {
  try {
    // User credentials if you wan't to test connection -> if you wan't new user, let gbrds know, or something
    const email = "test@test.com";
    const password = "testpass";

    // 3️⃣ Login the user (creates a session)
    const { data: loginData, error: loginError } =
      await supabase.auth.signInWithPassword({
        email,
        password,
      });

    if (loginError) {
      console.error("Login error:", loginError.message);
      return;
    }

    console.log("Login success! Session active.");

    // 5️⃣ Fetch steps for this logged-in user
    const { data: stepsData, error: stepsError } = await supabase
      .from("steps")
      .select("*");

    if (stepsError) console.error("Fetch steps error:", stepsError);
    else console.log("Fetched steps for current user:", stepsData);

    // 6️⃣ Optional: Sign out to test RLS block
    await supabase.auth.signOut();
    console.log("Signed out. Trying fetch again...");

    const { data: stepsData2 } = await supabase.from("steps").select("*");
    console.log("Fetched after sign out (should be empty):", stepsData2);
  } catch (err) {
    console.error("Unexpected error:", err);
  }
}

main();
