// App.tsx
import React, { useState, useEffect } from "react";
import { StyleSheet, ActivityIndicator, View } from "react-native";
import "./global.css";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import * as Linking from "expo-linking";

import MainTabs from "./src/screens/MainTabs";
import Signin from "./src/screens/Auth/Signin/Signin";
import Signup from "./src/screens/Auth/Signup/Signup";
// 1. IMPORT THE NEW SCREEN
import StepDetailScreen from "./src/components/StepCounter/StepDetailScreen";

import { RootStackParamList } from "./src/navigation/types";

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  const [session, setSession] = useState<any>(null);

  // ... (Linking code commented out as per your snippet) ...

  return (
    <NavigationContainer fallback={<ActivityIndicator size="large" />}>
      <Stack.Navigator
        screenOptions={{ headerShown: false }}
        initialRouteName="Signin"
      >
        <Stack.Screen name="Signin" component={Signin} />
        <Stack.Screen name="Signup" component={Signup} />

        {/* The Tabs (Home, Shop, Profile) */}
        <Stack.Screen name="Home" component={MainTabs} />

        {/* 2. REGISTER THE DETAIL SCREEN HERE */}
        <Stack.Screen
          name="StepDetailScreen"
          component={StepDetailScreen}
          options={{ animation: "slide_from_right" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
