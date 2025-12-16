// src/screens/Auth/Signin/Signin.tsx
import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Pressable,
  KeyboardAvoidingView,
  Platform,
  ImageBackground,
  StyleSheet,
} from "react-native";
import { BlurView } from "expo-blur";
import { useNavigation, NavigationProp } from "@react-navigation/native";
import { RootStackParamList } from "../../navigation/types";
import { signin } from "../../routes/authRoute";

type Props = {
  onSubmit?: (email: string, password: string) => Promise<void> | void;
};

// Static user for testing
const STATIC_USER = { email: "test@test.com", password: "testpass" };

export default function Signin({ onSubmit }: Props) {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  function validate() {
    if (!email) return "Email is required";
    const emailRe = /\S+@\S+\.\S+/;
    if (!emailRe.test(email)) return "Enter a valid email";
    if (!password) return "Password is required";
    return null;
  }

  async function handlePress() {
  const validationError = validate();
  if (validationError) {
    setError(validationError);
    return;
  }

  setError(null);
  setLoading(true);

  try {
    await signin({ email, password });

    // Redirect to main app
    navigation.reset({
      index: 0,
      routes: [{ name: "Home" }],
    });
  } catch (e) {
    setError((e as Error).message || "Login failed");
  } finally {
    setLoading(false);
  }
}


  return (
    <ImageBackground
      source={require("../../../assets/wallpaper.png")}
      style={styles.wallpaper}
      resizeMode="cover"
    >
      <KeyboardAvoidingView
        behavior={Platform.select({ ios: "padding", android: undefined })}
        style={styles.container}
      >
        <View style={styles.container}>
          <BlurView intensity={8} style={styles.blurContainer}>
            <Text style={styles.title}>Welcome back</Text>
            <Text style={styles.subtitle}>Enter your credentials to login</Text>
          </BlurView>

          {error ? (
            <Text style={{ color: "red", marginBottom: 10 }}>{error}</Text>
          ) : null}

          <Text style={styles.label}>Email</Text>
          <TextInput
            style={styles.input}
            placeholder="Email"
            placeholderTextColor="#FFFFFF"
            autoCapitalize="none"
            keyboardType="email-address"
            value={email}
            onChangeText={setEmail}
            editable={!loading}
          />

          <Text style={styles.label}>Password</Text>
          <TextInput
            style={styles.input}
            placeholder="Password"
            placeholderTextColor="#FFFFFF"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
            editable={!loading}
          />

          <Text style={styles.forgotText}>Forgot password?</Text>

          <Pressable
            style={({ pressed }) => [
              styles.button,
              loading && styles.buttonDisabled,
              pressed && !loading ? { opacity: 0.85 } : null,
            ]}
            onPress={handlePress}
            disabled={loading}
            accessibilityRole="button"
            accessibilityLabel="Sign in"
          >
            <Text style={styles.buttonText}>
              {loading ? "Signing in..." : "Sign In"}
            </Text>
          </Pressable>

          <Text style={styles.footerText}>
            Don't have an account?{" "}
            <Text
              style={styles.footerLink}
              onPress={() => navigation.navigate("Signup")}
              accessibilityRole="link"
              accessibilityLabel="Go to Sign Up"
            >
              Sign Up
            </Text>
          </Text>
        </View>
      </KeyboardAvoidingView>
    </ImageBackground>
  );
}

// Styles combined in the same file
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
  },
  wallpaper: {
    flex: 1,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    color: "#fff",
    fontSize: 34,
    fontWeight: "400",
    textAlign: "center",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  subtitle: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "400",
    textAlign: "center",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  input: {
    backgroundColor: "rgba(255,255,255,0.2)",
    borderColor: "rgba(255,255,255,0.6)",
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 8,
    marginBottom: 16,
    borderWidth: 1,
    width: "90%",
  },
  label: {
    width: "90%",
    alignSelf: "center",
    textAlign: "left",
    color: "#fff",
    fontSize: 14,
    marginBottom: 8,
  },
  button: {
    width: "90%",
    alignSelf: "center",
    backgroundColor: "rgba(255,255,255,0.2)",
    borderColor: "rgba(255,255,255,0.6)",
    borderWidth: 1,
    paddingVertical: 12,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOpacity: 0.12,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
  },
  buttonDisabled: { opacity: 0.6 },
  buttonText: { color: "white", textAlign: "center", fontSize: 16, fontWeight: "400" },
  forgotText: { textAlign: "right", width: "90%", color: "white", marginVertical: 15 },
  footerText: { color: "white", marginTop: 8, textAlign: "center", textShadowOffset: { width: 0, height: 0 }, textShadowColor: "#000", textShadowRadius: 2, fontSize: 14, marginVertical: 15 },
  footerLink: { textDecorationLine: "underline", fontWeight: "600", color: "#fff" },
  blurContainer: {
    paddingVertical: 20,
    paddingHorizontal: 25,
    width: "90%",
    margin: 16,
    textAlign: "center",
    justifyContent: "center",
    overflow: "hidden",
    borderRadius: 20,
    borderColor: "white",
    borderWidth: 0.5,
  },
});