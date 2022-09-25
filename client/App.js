import { StatusBar } from "expo-status-bar";
import { StyleSheet } from "react-native";
import Login from "./src/Screens/Login";
import Register from "./src/Screens/Register";
import Discover from "./src/Screens/Discover";
import MainProfile from "./src/Screens/MainProfile";
import { Provider } from "react-redux";
import { store } from "./src/Redux/store";
import { persistStore } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useSelector } from "react-redux";
import { selectToken } from "./src/Redux/Slices/authSlice";
import { NativeBaseProvider, extendTheme } from "native-base";

const Stack = createNativeStackNavigator();

export default function App() {
  let persistor = persistStore(store);

  const Navigator = () => {
    const token = useSelector(selectToken);

    const allPost = useSelector((state) => state.post.allPost);

    if (token) {
      return (
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
          }}
        >
          <Stack.Screen
            name="Discover"
            component={Discover}
            initialParams={{ allPost }}
          />
          <Stack.Screen name="MainProfile">
            {(props) => <MainProfile {...props} token={token} />}
          </Stack.Screen>
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
          <NativeBaseProvider theme={theme}>
            <Navigator />
          </NativeBaseProvider>
        </NavigationContainer>
        <StatusBar style="auto" />
      </PersistGate>
    </Provider>
  );
}

const theme = extendTheme({
  colors: {
    mustard: {
      400: "#e3b448",
    },
    extraOrage: {
      400: "#E38E48",
    },
    sage: {
      300: "#F8FFE3",
      400: "#cbd18f",
    },
    forestGreen: {
      400: "#3a6b35",
    },
    google: {
      400: "#de5246",
    },
  },
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#cbd18f",
    alignItems: "center",
    justifyContent: "center",
  },
});
