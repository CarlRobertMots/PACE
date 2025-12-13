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
import { RootStackParamList } from "./src/navigation/types";

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  // ... (keep your session state logic here) ...
  const [session, setSession] = useState<any>(null);
  // ...

  // 1. COMMENT THIS OUT FOR NOW
  /* const linking = {
    prefixes: [Linking.createURL("/")],
    config: {
      screens: {
        Signin: "", 
        Signup: "signup",
        Home: {
          path: "home",
          screens: {
            Camp: "camp",
            Shop: "shop",
            Profile: "profile",
          },
        },
      },
    },
  };
  */

  return (
    // 2. REMOVE "linking={linking}" FROM HERE
    <NavigationContainer fallback={<ActivityIndicator size="large" />}>
      <Stack.Navigator
        screenOptions={{ headerShown: false }}
        initialRouteName="Signin"
      >
        <Stack.Screen name="Signin" component={Signin} />
        <Stack.Screen name="Signup" component={Signup} />
        <Stack.Screen name="Home" component={MainTabs} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
