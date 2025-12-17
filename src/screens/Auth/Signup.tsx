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
import { useNavigation, NavigationProp } from "@react-navigation/native";
import { BlurView } from "expo-blur";
import { RootStackParamList } from "../../navigation/types";
import { signup } from "../../routes/authRoute";

type Props = {
  onSubmit?: (
    email: string,
    username: string,
    password: string
  ) => Promise<void> | void;
};

export default function Signup({ onSubmit }: Props) {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handlePress() {
    setError(null);
    setLoading(true);

    try {
      await signup({
        email,
        username,
        password,
      });

      // Optional: navigate immediately
      // Or let your auth listener redirect automatically
      navigation.reset({
        index: 0,
        routes: [{ name: "Home" }],
      });
    } catch (e) {
      setError((e as Error).message || "Signup failed");
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
            <Text style={styles.title}>Register an account</Text>
          </BlurView>

          {error && <Text style={styles.error}>{error}</Text>}

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
            placeholderTextColor="#fff"
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
              pressed && !loading && { opacity: 0.85 },
            ]}
            onPress={handlePress}
            disabled={loading}
          >
            <Text style={styles.buttonText}>
              {loading ? "Registering..." : "Register Account"}
            </Text>
          </Pressable>

          <Text style={styles.footerText}>
            Already have an account?{" "}
            <Text
              style={styles.footerLink}
              onPress={() => navigation.navigate("Signin")}
            >
              Sign in
            </Text>
          </Text>
        </View>
      </KeyboardAvoidingView>
    </ImageBackground>
  );
}

/* =========================
   Styles (local to screen)
   ========================= */

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
  },

  wallpaper: {
    ...StyleSheet.absoluteFillObject,
    flex: 1,
    alignItems: "center",
  },

  title: {
    color: "#fff",
    fontSize: 34,
    fontFamily: "Minecraft",
    fontWeight: "400",
    textAlign: "center",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },

  blurContainer: {
    padding: 25,
    margin: 16,
    borderRadius: 20,
    borderColor: "white",
    borderWidth: 0.5,
    overflow: "hidden",
  },

  label: {
    width: "90%",
    color: "white",
    fontSize: 14,
    marginBottom: 8,
    fontFamily: "Minecraft",
  },

  input: {
    width: "90%",
    backgroundColor: "rgba(255,255,255,0.2)",
    borderColor: "rgba(255,255,255,0.6)",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 6,
    marginBottom: 16,
    color: "white",
  },

  button: {
    width: "90%",
    backgroundColor: "rgba(255,255,255,0.2)",
    borderColor: "rgba(255,255,255,0.6)",
    borderWidth: 1,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
  },

  buttonDisabled: {
    opacity: 0.6,
  },

  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "400",
  },

  footerText: {
    color: "white",
    marginTop: 8,
    textAlign: "center",
    fontSize: 14,
  },

  footerLink: {
    textDecorationLine: "underline",
    fontWeight: "600",
    color: "#fff",
  },

  error: {
    color: "red",
    marginBottom: 10,
  },
});