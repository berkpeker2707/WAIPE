import { StatusBar } from "expo-status-bar";
import { StyleSheet } from "react-native";
import Login from "./src/Screens/Login";
import Register from "./src/Screens/Register";
import Discover from "./src/Screens/Discover";
import MainProfile from "./src/Screens/MainProfile";
import Settings from "./src/Screens/Settings";
import EditMainProfile from "./src/Screens/EditMainProfile";
import { Provider } from "react-redux";
import { store } from "./src/Redux/store";
import { persistStore } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";
import { NavigationContainer } from "@react-navigation/native";
import { NativeBaseProvider } from "native-base";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useSelector } from "react-redux";
import { selectToken } from "./src/Redux/Slices/authSlice";

const Stack = createNativeStackNavigator();

export default function App() {
  let persistor = persistStore(store);

  const Navigator = () => {
    const token = useSelector(selectToken);

    if (token) {
      return (
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
          }}
        >
          <Stack.Screen name="Discover" component={Discover} />
          <Stack.Screen name="MainProfile">
            {(props) => <MainProfile {...props} token={token} />}
          </Stack.Screen>
          <Stack.Screen name="Settings" component={Settings} />
          <Stack.Screen name="EditMainProfile" component={EditMainProfile} />
        </Stack.Navigator>
      );
    } else {
      return (
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
          }}
        >
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Register" component={Register} />
        </Stack.Navigator>
      );
    }
  };

  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <NavigationContainer>
          <NativeBaseProvider>
            <Navigator />
          </NativeBaseProvider>
        </NavigationContainer>
        <StatusBar style="auto" />
      </PersistGate>
    </Provider>
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
