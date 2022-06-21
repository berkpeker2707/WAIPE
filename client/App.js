import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import Register from "./src/Screens/Register";

export default function App() {
  return (
    <View style={styles.container}>
      <Register />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#cbd18f",
    alignItems: "center",
    justifyContent: "center",
  },
});
