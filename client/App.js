import { StatusBar } from "expo-status-bar";
import { StyleSheet } from "react-native";
import Login from "./src/Screens/Login";
import Register from "./src/Screens/Register";
import Discover from "./src/Screens/Discover";
import Post from "./src/Screens/Post";
import MainProfile from "./src/Screens/MainProfile";
import { Provider, useDispatch } from "react-redux";
import Search from "./src/Screens/Search";
import Settings from "./src/Screens/Settings";
import { store } from "./src/Redux/store";
import { persistStore } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";
import { NavigationContainer } from "@react-navigation/native";
import { useSelector } from "react-redux";
import { selectToken } from "./src/Redux/Slices/authSlice";
import { NativeBaseProvider, extendTheme } from "native-base";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

import { useEffect } from "react";
import {
  getAllPosts,
  getPost,
  selectAllPost,
  selectPost,
} from "./src/Redux/Slices/postSlice";
import HomeIcon from "./src/Components/Icons/HomeIcon";
import SearchIcon from "./src/Components/Icons/SearchIcon";
import AddIcon from "./src/Components/Icons/AddIcon";
import ProfileIcon from "./src/Components/Icons/ProfileIcon";

const Tab = createMaterialBottomTabNavigator();

export default function App() {
  let persistor = persistStore(store);

  const Navigator = () => {
    const dispatch = useDispatch();

    var testID = "62c5253aba3f45ae697a82bc";

    const token = useSelector(selectToken);
    // const allPost = useSelector(selectAllPost);
    // const post = useSelector(selectPost);

    // useEffect(() => {
    //   dispatch(getAllPosts());
    // }, [dispatch]);

    // useEffect(() => {
    //   dispatch(getPost(testID));
    // }, [dispatch]);

    return (
      <>
        {token ? (
          <Tab.Navigator
            initialRouteName="Home"
            activeColor="#fff"
            barStyle={{ backgroundColor: "#3a6b35" }}
            backBehavior="history"
            screenOptions={{
              headerStyle: {
                backgroundColor: "#DBECF4",
                shadowColor: "#DBECF4",
              },
              tabBarShowIcon: true,
              tabBarStyle: {
                backgroundColor: "#3a6b35",
              },
              tabActiveIcon: { fontWeight: "bold" },
              tabBarActiveTintColor: "#fff",
              tabBarInactiveTintColor: "#fff9",
            }}
          >
            <Tab.Screen
              options={{
                tabBarLabel: "Home",
                tabBarIcon: ({ color }) => (
                  <HomeIcon name="home" color={"red"} size={26} />
                ),
              }}
              name="Discover"
              component={Discover}
            />

            <Tab.Screen
              options={{
                tabBarLabel: "Search",
                tabBarIcon: ({ color }) => (
                  <SearchIcon name="search" color={color} size={26} />
                ),
              }}
              name="Search"
              component={Search}
            />
            <Tab.Screen
              options={{
                tabBarLabel: "Add",
                tabBarIcon: ({ color }) => (
                  <AddIcon name="add" color={color} size={26} />
                ),
              }}
              name="Settings"
              component={Settings}
            />
            <Tab.Screen
              options={{
                tabBarLabel: "Profile",
                tabBarIcon: ({ color }) => (
                  <ProfileIcon name="Profile" color={color} size={26} />
                ),
              }}
              name="MainProfile"
              component={MainProfile}
            />
            {/* screens that are not displayed in tab starts */}
            <Tab.Screen
              options={{
                tabBarButton: () => null,
                tabBarIcon: ({ focused, color, size }) => (
                  <Post size={0}></Post>
                ),
              }}
              name="Post"
              component={Post}
            />
            {/* screens that are not displayed in tab ends */}
          </Tab.Navigator>
        ) : (
          <Tab.Navigator>
            <Tab.Screen
              activeColor="#fff"
              inactiveColor="#3a6b35"
              barStyle={{ backgroundColor: "#3a6b35" }}
              options={{
                tabBarLabel: "Home",
                // tabBarIcon: ({ color }) => (
                //   <HomeIcon name="home" color={color} size={26} />
                // ),
              }}
              name="Login"
              component={Login}
            />
            <Tab.Screen
              activeColor="#fff"
              inactiveColor="#3a6b35"
              barStyle={{ backgroundColor: "#3a6b35" }}
              options={{
                tabBarLabel: "Home",
                // tabBarIcon: ({ color }) => (
                //   <HomeIcon name="home" color={color} size={26} />
                // ),
              }}
              name="Register"
              component={Register}
            />
          </Tab.Navigator>
        )}
      </>
    );
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
