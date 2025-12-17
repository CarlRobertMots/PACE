import React, { useState } from "react";
import { ActivityIndicator } from "react-native";
import "./global.css";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { StepProvider } from "./src/components/StepCounter/StepContext"; // 1. Import Step Provider

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
    <StepProvider>
      <NavigationContainer fallback={<ActivityIndicator size="large" />}>
        <Stack.Navigator
          screenOptions={{ headerShown: false }}
          initialRouteName="Signin"
        >
          <Stack.Screen name="Signin" component={Signin} />
          <Stack.Screen name="Signup" component={Signup} />

          {/* Main App (Tabs) */}
          <Stack.Screen name="Home" component={MainTabs} />

          {/* Other Screens */}
          <Stack.Screen name="DetailedView" component={DetailedView} />
          <Stack.Screen name="StepDetailScreen" component={StepDetailScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </StepProvider>
  );
}
