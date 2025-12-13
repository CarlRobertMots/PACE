// src/screens/Auth/Signup/Signup.tsx

import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Pressable,
  KeyboardAvoidingView,
  Platform,
  ImageBackground,
} from "react-native";
import { styles } from "./styles";
// 1. Import NavigationProp to define the type of navigation
import { useNavigation, NavigationProp } from "@react-navigation/native";
import { BlurView } from "expo-blur";
// 2. Import the AuthStackParamList from your central types file
import { RootStackParamList } from "../../../navigation/types";

type Props = {
  onSubmit?: (
    email: string,
    username: string,
    password: string
  ) => Promise<void> | void;
};

export default function Signup({ onSubmit }: Props) {
  // 3. Apply the type to the useNavigation hook
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handlePress() {
    setError(null);
    setLoading(true);
    try {
      if (onSubmit) await Promise.resolve(onSubmit(email, username, password));
    } catch (e) {
      setError((e as Error).message || "Signup failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <ImageBackground
      source={require("../../../../assets/wallpaper.png")}
      style={styles.wallpaper}
      resizeMode="cover"
    >
      <KeyboardAvoidingView
        behavior={Platform.select({ ios: "padding", android: undefined })}
        style={styles.container}
      >
        <View style={styles.container}>
          <BlurView intensity={8} style={styles.blurContainer}>
            <Text style={styles.title}>Register an account</Text>
          </BlurView>

          {error ? (
            <Text style={{ color: "red", marginBottom: 10 }}>{error}</Text>
          ) : null}

          <Text style={styles.label}>Email</Text>
          <TextInput
            style={styles.input}
            placeholder="you@example.com"
            placeholderTextColor="#fff"
            autoCapitalize="none"
            keyboardType="email-address"
            value={email}
            onChangeText={setEmail}
            editable={!loading}
          />

          <Text style={styles.label}>Username</Text>
          <TextInput
            style={styles.input}
            placeholder="Username"
            placeholderTextColor="#FFFFFF"
            autoCapitalize="none"
            value={username}
            onChangeText={setUsername}
            editable={!loading}
          />

          <Text style={styles.label}>Password</Text>
          <TextInput
            style={styles.input}
            placeholder="••••••••"
            placeholderTextColor="#fff"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
            editable={!loading}
          />

          <Pressable
            style={({ pressed }) => [
              styles.button,
              loading && styles.buttonDisabled,
              pressed && !loading ? { opacity: 0.85 } : null,
            ]}
            onPress={handlePress}
            disabled={loading}
            accessibilityRole="button"
            accessibilityLabel="Register Account"
          >
            <Text style={styles.buttonText}>
              {loading ? "Registering..." : "Register Account"}
            </Text>
          </Pressable>

          <Text style={styles.footerText}>
            Already have an account?{" "}
            <Text
              style={styles.footerLink}
              // This navigation call will now work correctly
              onPress={() => navigation.navigate("Signin")}
              accessibilityRole="link"
              accessibilityLabel="Go to Sign in"
            >
              Sign in
            </Text>
          </Text>
        </View>
      </KeyboardAvoidingView>
    </ImageBackground>
  );
}
