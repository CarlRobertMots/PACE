// src/navigation/types.ts

import { NavigatorScreenParams } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

// 1. The Tabs (Inside the "Home" container)
export type TabStackParamList = {
  Camp: undefined; // The Boss/Steps screen
  Shop: undefined;
  Profile: undefined;
};

// 2. The Root Stack (Matches your App.tsx structure)
export type RootStackParamList = {
  Signin: undefined; // Login Screen
  Signup: undefined; // Register Screen
  Home: NavigatorScreenParams<TabStackParamList>; // The Tab Navigator Container
};

// 3. Helper Types
export type AuthNavigationProp = NativeStackNavigationProp<RootStackParamList>;
