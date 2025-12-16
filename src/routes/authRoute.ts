import { signUpUser } from "../services/authService";
import { signInUser } from "../services/authService";
import { logoutUser, deleteUser } from "../services/authService";

type SignupPayload = {
  email: string;
  username: string;
  password: string;
};

type SigninPayload = {
  email: string;
  password: string;
};

export async function signup({
  email,
  username,
  password,
}: SignupPayload) {
  if (!email || !username || !password) {
    throw new Error("All fields are required");
  }

  if (password.length < 6) {
    throw new Error("Password must be at least 6 characters");
  }

  return signUpUser({
    email,
    username,
    password,
  });
}

export async function signin({ email, password }: SigninPayload) {
  if (!email || !password) {
    throw new Error("Email and password are required");
  }

  return signInUser({ email, password });
}

export async function logout() {
  return logoutUser();
}

export async function deleteAccount() {
  return deleteUser();
}