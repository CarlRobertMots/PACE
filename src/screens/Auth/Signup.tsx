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
  ScrollView,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { useNavigation, NavigationProp } from "@react-navigation/native";
import { BlurView } from "expo-blur";
import { RootStackParamList } from "../../navigation/types";
import { signup } from "../../routes/authRoute";
import { Fonts } from "../../constants/fonts"; // <-- Import your font constant

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
      await signup({ email, username, password });
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
      <View style={styles.overlay} />

      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <KeyboardAvoidingView
          behavior={Platform.select({ ios: "padding", android: "height" })}
          style={{ flex: 1, width: "100%" }}
        >
          <ScrollView
            contentContainerStyle={styles.scrollContent}
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}
          >
            <BlurView intensity={20} style={styles.blurContainer}>
              <Text style={styles.title}>Register an account</Text>
            </BlurView>

            {error && <Text style={styles.error}>{error}</Text>}

            <Text style={styles.label}>Email</Text>
            <TextInput
              style={styles.input}
              placeholder="you@example.com"
              placeholderTextColor="#FFFFFF"
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
              placeholderTextColor="#FFFFFF"
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
  },
  title: {
    color: "#fff",
    fontSize: 30, // same as SignIn
    fontWeight: "400", // same as SignIn
    fontFamily: Fonts.MAC,
    textAlign: "center",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  blurContainer: {
    paddingVertical: 20,
    paddingHorizontal: 25,
    gap: 5,
    width: "90%",
    margin: 16,
    borderRadius: 20,
    borderColor: "white",
    borderWidth: 0.5,
    overflow: "hidden",
  },
  label: {
    width: "90%",
    color: "#fff",
    fontSize: 14, // same as SignIn
    fontWeight: "400", // same as SignIn
    fontFamily: Fonts.MAC,
    marginBottom: 8,
    textShadowColor: "rgba(0, 0, 0, 0.75)",
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  input: {
    width: "90%",
    backgroundColor: "rgba(255,255,255,0.2)",
    borderColor: "rgba(255,255,255,0.6)",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 12,
    marginBottom: 16,
    color: "white",
    fontFamily: Fonts.MAC,
    fontSize: 12, // same as SignIn
    fontWeight: "400", // same as SignIn
  },
  button: {
    width: "90%",
    backgroundColor: "rgba(255,255,255,0.2)",
    borderColor: "rgba(255,255,255,0.6)",
    borderWidth: 1,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 10,
  },
  buttonDisabled: {
    opacity: 0.6,
  },
  buttonText: {
    color: "white",
    fontSize: 16, // same as SignIn
    fontWeight: "400", // same as SignIn
    fontFamily: Fonts.MAC,
    textAlign: "center",
  },
  footerText: {
    fontFamily: Fonts.MAC,
    color: "#fff",
    marginTop: 20,
    textAlign: "center",
    fontSize: 14, // same as SignIn
    fontWeight: "400", // same as SignIn
  },
  footerLink: {
    textDecorationLine: "underline",
    fontWeight: "600",
    color: "#fff",
    fontFamily: Fonts.MAC,
  },
  error: {
    color: "#ff4444",
    marginBottom: 10,
    fontWeight: "600", // same as SignIn
    fontFamily: Fonts.MAC,
    fontSize: 10, // same as SignIn
  },
});
