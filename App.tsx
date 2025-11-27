import { StyleSheet, Text, View } from "react-native";
import "./global.css";
import { NavigationContainer } from "@react-navigation/native";
import Home from "./app/home";

export default function App() {
    return (
        <NavigationContainer>
            <Home />
        </NavigationContainer>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
