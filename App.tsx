import React, { useState, useEffect } from "react";
import { ActivityIndicator, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import * as Font from "expo-font";

import { StepProvider } from "./src/components/StepCounter/StepContext";
import MainTabs from "./src/screens/MainTabs";
import Signin from "./src/screens/Auth/Signin";
import Signup from "./src/screens/Auth/Signup";
import DetailedView from "./src/screens/Home/DetailedView";
import StepDetailScreen from "./src/screens/Steps/StepDetailScreen";
import { RootStackParamList } from "./src/navigation/types";
import { Fonts } from "./src/constants/fonts";

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  const [fontsLoaded, setFontsLoaded] = useState(false);

  // Load fonts on app start
  useEffect(() => {
    Font.loadAsync({
      [Fonts.MAC]: require("./assets/fonts/macMinecraft.ttf"),
    })
      .then(() => setFontsLoaded(true))
      .catch((err) => console.warn("Font loading error:", err));
  }, []);

  if (!fontsLoaded) {
    // Show a loading indicator while font is loading
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <StepProvider>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName="Signin">
          <Stack.Screen name="Signin" component={Signin} />
          <Stack.Screen name="Signup" component={Signup} />
          <Stack.Screen name="Home" component={MainTabs} />
          <Stack.Screen name="DetailedView" component={DetailedView} />
          <Stack.Screen name="StepDetailScreen" component={StepDetailScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </StepProvider>
  );
}