import { StatusBar } from "expo-status-bar";
import { StyleSheet } from "react-native";
import Login from "./src/Screens/Login";
import Register from "./src/Screens/Register";
import Discover from "./src/Screens/Discover";
import Post from "./src/Screens/Post";
import MainProfile from "./src/Screens/MainProfile";
import { Provider, useDispatch } from "react-redux";
import Settings from "./src/Screens/Settings";
import { store } from "./src/Redux/store";
import { persistStore } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";
import { NavigationContainer } from "@react-navigation/native";
import { NativeBaseProvider } from "native-base";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useSelector } from "react-redux";
import { selectToken } from "./src/Redux/Slices/authSlice";
import { NativeBaseProvider, extendTheme } from "native-base";
import { useEffect } from "react";
import { getAllPosts, getPost } from "./src/Redux/Slices/postSlice";

const Stack = createNativeStackNavigator();

export default function App() {
  let persistor = persistStore(store);

  const Navigator = () => {
    const dispatch = useDispatch();

    var testID = "62c5253aba3f45ae697a82bc";

    const token = useSelector(selectToken);
    const allPost = useSelector((state) => state.post.allPost);
    const post = useSelector((state) => state.post.post);

    useEffect(() => {
      dispatch(getAllPosts());
    }, [dispatch]);

    useEffect(() => {
      dispatch(getPost(testID));
    }, [dispatch]);

    if (token) {
      return (
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
          }}
        >
          <Stack.Screen name="Post" component={Post} initialParams={{ post }} />
          <Stack.Screen
            name="Discover"
            component={Discover}
            initialParams={{ allPost }}
          />
          <Stack.Screen name="MainProfile">
            {(props) => <MainProfile {...props} token={token} />}
          </Stack.Screen>
          <Stack.Screen name="Settings" component={Settings} />
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
