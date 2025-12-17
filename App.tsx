import React, { useState, useEffect } from "react";
import { StyleSheet, ActivityIndicator, View } from "react-native";
import "./global.css";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import * as Linking from "expo-linking";

import MainTabs from "./src/screens/MainTabs";
import Signin from "./src/screens/Auth/Signin";
import Signup from "./src/screens/Auth/Signup";

import DetailedView from "./src/screens/Home/DetailedView";
import StepDetailScreen from "./src/screens/Steps/StepDetailScreen";

import { RootStackParamList } from "./src/navigation/types";

import { ThemeProvider } from "./src/context/ThemeContext";

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  const [session, setSession] = useState<any>(null);

  return (
    <ThemeProvider>
    <NavigationContainer fallback={<ActivityIndicator size="large" />}>
      <Stack.Navigator
        screenOptions={{ headerShown: false }}
        initialRouteName="Signin"
      >
        <Stack.Screen name="Signin" component={Signin} />
        <Stack.Screen name="Signup" component={Signup} />

        {/* Põhivaated (Home, Shop, Profile) */}
        <Stack.Screen name="Home" component={MainTabs} />

        {/* --- Uued Ekraanid --- */}

        {/* Tiimikaaslase lisatud vaade */}
        <Stack.Screen name="DetailedView" component={DetailedView} />

        {/* Sinu lisatud vaade (et Step Circle klikkimine töötaks) */}
        <Stack.Screen name="StepDetailScreen" component={StepDetailScreen} />
      </Stack.Navigator>
    </NavigationContainer>
    </ThemeProvider>
  );
}
