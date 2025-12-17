// src/screens/Auth/Signin/Signin.tsx
import React, { useState } from "react";
import {
  Keyboard,
  TouchableWithoutFeedback,
  View,
  Text,
  TextInput,
  Pressable,
  KeyboardAvoidingView,
  Platform,
  ImageBackground,
  StyleSheet,
  ScrollView, // Added ScrollView
} from "react-native";
import { BlurView } from "expo-blur";
import { useNavigation, NavigationProp } from "@react-navigation/native";
import { RootStackParamList } from "../../navigation/types";
import { signin } from "../../routes/authRoute";

type Props = {
  onSubmit?: (email: string, password: string) => Promise<void> | void;
};

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
      {/* 1. Dark Overlay for better text visibility */}
      <View style={styles.overlay} />

      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <KeyboardAvoidingView
          behavior={Platform.select({ ios: "padding", android: "height" })}
          style={{ flex: 1, width: "100%" }}
        >
          {/* 2. Wrap content in ScrollView */}
          <ScrollView
            contentContainerStyle={styles.scrollContent}
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}
          >
            {/* Header Blur Container */}
            <BlurView intensity={20} style={styles.blurContainer}>
              <Text style={styles.title}>Welcome back</Text>
              <Text style={styles.subtitle}>
                Enter your credentials to login
              </Text>
            </BlurView>

            {error ? <Text style={styles.errorText}>{error}</Text> : null}

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

            <View style={styles.buttonOuterLayout}>
              <BlurView intensity={20} style={styles.buttonBlurFill}>
                <Pressable
                  style={({ pressed }) => [
                    styles.buttonPressableArea,
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
              </BlurView>
            </View>

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
          </ScrollView>
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  wallpaper: {
    flex: 1,
    width: "100%",
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0, 0, 0, 0.3)",
  },
  scrollContent: {
    flexGrow: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 40,
    width: "100%",
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
    paddingVertical: 12,
    borderRadius: 8,
    marginBottom: 16,
    borderWidth: 1,
    width: "90%",
    color: "white",
  },
  label: {
    width: "90%",
    alignSelf: "center",
    textAlign: "left",
    color: "#fff",
    fontSize: 14,
    marginBottom: 8,
    textShadowColor: "rgba(0, 0, 0, 0.75)",
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  errorText: {
    color: "#ff4444",
    marginBottom: 10,
    fontWeight: "600",
  },
  buttonOuterLayout: {
    width: "90%",
    height: 50,
    borderRadius: 8,
    overflow: "hidden",
    marginTop: 10,
    alignSelf: "center",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.6)",
  },
  buttonBlurFill: {
    flex: 1,
    width: "100%",
    backgroundColor: "rgba(255,255,255,0.2)",
    justifyContent: "center",
  },
  buttonPressableArea: {
    flex: 1,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },

  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "400",
    textAlign: "center",
  },
  forgotText: {
    textAlign: "right",
    width: "90%",
    color: "white",
    marginVertical: 15,
  },
  footerText: {
    color: "white",
    marginTop: 20,
    textAlign: "center",
    fontSize: 14,
  },
  footerLink: {
    textDecorationLine: "underline",
    fontWeight: "600",
    color: "#fff",
  },
  blurContainer: {
    paddingVertical: 20,
    paddingHorizontal: 25,
    width: "90%",
    margin: 16,
    borderRadius: 20,
    borderColor: "white",
    borderWidth: 0.5,
    overflow: "hidden",
  },
});
