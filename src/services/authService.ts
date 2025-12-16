import { supabase } from "../lib/supabaseClient";

type SignUpParams = {
  email: string;
  username: string;
  password: string;
};

type SignInParams = {
  email: string;
  password: string;
};

export async function signUpUser({
  email,
  username,
  password,
}: SignUpParams) {
  // 1. Create auth user
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        display_name: username, // Auth metadata
      },
    },
  });

  if (error) {
    throw new Error(error.message);
  }

  const user = data.user;
  if (!user) {
    throw new Error("User creation failed");
  }

  // 2. Create profile row
  const { error: profileError } = await supabase
    .from("users")
    .insert({
      id: user.id,
      username,
    });

  if (profileError) {
    throw new Error("Username already taken");
  }

  return user;
}

export async function signInUser({ email, password }: SignInParams) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) throw new Error(error.message);

  if (!data.user) throw new Error("Signin failed");

  return data.user;
}

export async function logoutUser() {
  const { error } = await supabase.auth.signOut();
  if (error) throw new Error(error.message);
  return true;
}

/**
 * Delete current user
 * NOTE: requires Service Role key if you want to delete from auth.users
 * In frontend, we can just sign out + mark as deleted in users table
 */
export async function deleteUser() {
  const { data: { user }, error: getUserError } = await supabase.auth.getUser();
  if (getUserError || !user) throw new Error("No authenticated user");

  // Delete from public.users
  const { error: deleteProfileError } = await supabase
    .from("users")
    .delete()
    .eq("id", user.id);

  if (deleteProfileError) throw new Error(deleteProfileError.message);

  // Log out
  await logoutUser();

  return true;
}