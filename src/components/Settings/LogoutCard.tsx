import React from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";
import { useNavigation, CommonActions } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../navigation/types";

export default function LogoutCard() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const handleLogout = () => {
    // Reset navigation stack to Signin screen
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{ name: "Signin" }],
      })
    );
  };

  return (
    <View style={styles.card}>
      <Text style={styles.cardTitle}>Account</Text>
      <Pressable style={styles.button} onPress={handleLogout}>
        <Text style={styles.buttonText}>Logout</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "rgba(0,0,0,0.6)",
    borderWidth: 2,
    borderColor: "rgba(168,85,247,0.5)",
    borderRadius: 10,
    padding: 16,
    marginVertical: 20,
  },
  cardTitle: {
    color: "white",
    fontFamily: "Pixel",
    fontSize: 24,
    marginBottom: 12,
  },
  button: {
    backgroundColor: "rgba(168,85,247,0.75)",
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontFamily: "Pixel",
    fontSize: 16,
  },
});
