import { StatusBar } from "expo-status-bar";
import { Provider } from "react-redux";
import { store } from "./src/Redux/store";
import { persistStore } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";
import { NavigationContainer } from "@react-navigation/native";
import { useSelector } from "react-redux";
import { selectToken } from "./src/Redux/Slices/authSlice";
import { NativeBaseProvider, extendTheme } from "native-base";
import { useFonts } from "expo-font";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeIcon from "./src/Components/Icons/HomeIcon";
import SearchIcon from "./src/Components/Icons/SearchIcon";
import AddIcon from "./src/Components/Icons/AddIcon";
import ProfileIcon from "./src/Components/Icons/ProfileIcon";
import Login from "./src/Screens/Login";
import Register from "./src/Screens/Register";
import Discover from "./src/Screens/Discover";
import Post from "./src/Screens/Post";
import NewPost from "./src/Screens/NewPost";
import MainProfile from "./src/Screens/MainProfile";
import MyFeed from "./src/Screens/MyFeed";
import Settings from "./src/Screens/Settings";
import EditMainProfile from "./src/Screens/EditMainProfile";
import PetProfile from "./src/Screens/PetProfile";
import BlockedUsersScreen from "./src/Screens/BlockedUsers";
import EditPetProfile from "./src/Screens/EditPetProfile";
import UserProfileScreen from "./src/Screens/UserProfile";
import Bookmarks from "./src/Screens/Bookmarks";
import Splash1 from "./src/Screens/Splash1";
import Splash2 from "./src/Screens/Splash2";

import { ViewPropTypes } from "deprecated-react-native-prop-types";

const Tab = createBottomTabNavigator();

export default function App() {
  let persistor = persistStore(store);

  const [loaded] = useFonts({
    OrientalCatsLight: require("./assets/fonts/OrientalCatsLight-2OzB8.otf"),
  });

  if (!loaded) {
    return null;
  }

  const Navigator = () => {
    const token = useSelector(selectToken);

    return (
      <Tab.Navigator
        activeColor="#E38E48"
        barStyle={{ backgroundColor: theme.colors.forestGreen[400] }}
        backBehavior="history"
        screenOptions={{
          headerShown: false,
          tabBarStyle: {
            backgroundColor: "#CBD18F",
          },
          tabActiveIcon: { fontWeight: "bold" },
          tabBarActiveTintColor: "#E38E48",
          tabBarInactiveTintColor: "#F8FFE3",
        }}
      >
        {token ? (
          <>
            <Tab.Screen
              options={{
                header: () => null,
                headerShown: false,
                tabBarButton: () => null,
                tabBarIcon: ({ color }) => <></>,
                tabBarStyle: { display: "none" },
                tabBarLabelStyle: {
                  fontWeight: "bold",
                },
                headerStyle: {
                  backgroundColor: "#CBD18F",
                },
                headerTintColor: "#CBD18F",
                headerTitleStyle: {
                  fontWeight: "bold",
                },
              }}
              name="Splash1"
              component={Splash1}
            />
            <Tab.Screen
              options={{
                tabBarLabel: "Feed",
                tabBarIcon: ({ color }) => (
                  <HomeIcon name="myfeed" color={color} size={26} />
                ),
                tabBarLabelStyle: {
                  fontWeight: "bold",
                },
                headerStyle: {
                  backgroundColor: "#CBD18F",
                },
                headerTintColor: "#CBD18F",
                headerTitleStyle: {
                  fontWeight: "bold",
                },
              }}
              name="Feed"
              component={MyFeed}
            />
            <Tab.Screen
              options={{
                tabBarLabel: "Discover",
                tabBarIcon: ({ color }) => (
                  <SearchIcon name="discover" color={color} size={26} />
                ),
                tabBarLabelStyle: {
                  fontWeight: "bold",
                },
                headerStyle: {
                  backgroundColor: "#CBD18F",
                },
                headerTintColor: "#CBD18F",
                headerTitleStyle: {
                  fontWeight: "bold",
                },
              }}
              name="Discover"
              component={Discover}
            />
            <Tab.Screen
              options={{
                tabBarLabel: "Add",
                tabBarIcon: ({ color }) => (
                  <AddIcon name="add" color={color} size={26} />
                ),
                tabBarLabelStyle: {
                  fontWeight: "bold",
                },
                headerStyle: {
                  backgroundColor: "#CBD18F",
                },
                headerTintColor: "#CBD18F",
                headerTitleStyle: {
                  fontWeight: "bold",
                },
              }}
              name="NewPost"
              component={NewPost}
            />
            <Tab.Screen
              options={{
                tabBarLabel: "Profile",
                tabBarIcon: ({ color }) => (
                  <ProfileIcon name="Profile" color={color} size={26} />
                ),
                tabBarLabelStyle: {
                  fontWeight: "bold",
                },
                headerStyle: {
                  backgroundColor: "#CBD18F",
                },
                headerTintColor: "#CBD18F",
                headerTitleStyle: {
                  fontWeight: "bold",
                },
              }}
              name="MainProfile"
              component={MainProfile}
            />
            <Tab.Screen
              options={{
                headerShown: false,
                tabBarButton: () => null,
                tabBarIcon: ({ color }) => <></>,
                tabBarLabelStyle: {
                  fontWeight: "bold",
                },
                headerStyle: {
                  backgroundColor: "#CBD18F",
                },
                headerTintColor: "#CBD18F",
                headerTitleStyle: {
                  fontWeight: "bold",
                },
              }}
              name="EditMainProfile"
              component={EditMainProfile}
            />
            {/* screens that are not displayed in tab starts */}
            <Tab.Screen
              options={{
                headerShown: false,
                tabBarButton: () => null,
                tabBarIcon: ({ color }) => <></>,
                tabBarLabelStyle: {
                  fontWeight: "bold",
                },
                headerStyle: {
                  backgroundColor: "#CBD18F",
                },
                headerTintColor: "#CBD18F",
                headerTitleStyle: {
                  fontWeight: "bold",
                },
              }}
              name="Post"
              component={Post}
            />
            <Tab.Screen
              options={{
                headerShown: false,
                tabBarButton: () => null,
                tabBarIcon: ({ color }) => <></>,
                tabBarLabelStyle: {
                  fontWeight: "bold",
                },
                headerStyle: {
                  backgroundColor: "#CBD18F",
                },
                headerTintColor: "#CBD18F",
                headerTitleStyle: {
                  fontWeight: "bold",
                },
              }}
              name="PetProfile"
              component={PetProfile}
            />
            <Tab.Screen
              options={{
                headerShown: false,
                tabBarButton: () => null,
                tabBarIcon: ({ color }) => <></>,
                tabBarLabelStyle: {
                  fontWeight: "bold",
                },
                headerStyle: {
                  backgroundColor: "#CBD18F",
                },
                headerTintColor: "#CBD18F",
                headerTitleStyle: {
                  fontWeight: "bold",
                },
              }}
              name="BlockedUsers"
              component={BlockedUsersScreen}
            />
            <Tab.Screen
              options={{
                headerShown: false,
                tabBarButton: () => null,
                tabBarIcon: ({ color }) => <></>,
                tabBarLabelStyle: {
                  fontWeight: "bold",
                },
                headerStyle: {
                  backgroundColor: "#CBD18F",
                },
                headerTintColor: "#CBD18F",
                headerTitleStyle: {
                  fontWeight: "bold",
                },
              }}
              name="Settings"
              component={Settings}
            />
            <Tab.Screen
              options={{
                headerShown: false,
                tabBarButton: () => null,
                tabBarIcon: ({ color }) => <></>,
                tabBarLabelStyle: {
                  fontWeight: "bold",
                },
                headerStyle: {
                  backgroundColor: "#CBD18F",
                },
                headerTintColor: "#CBD18F",
                headerTitleStyle: {
                  fontWeight: "bold",
                },
              }}
              name="EditPetProfile"
              component={EditPetProfile}
            />
            <Tab.Screen
              options={{
                headerShown: false,
                tabBarButton: () => null,
                tabBarIcon: ({ color }) => <></>,
                tabBarLabelStyle: {
                  fontWeight: "bold",
                },
                headerStyle: {
                  backgroundColor: "#CBD18F",
                },
                headerTintColor: "#CBD18F",
                headerTitleStyle: {
                  fontWeight: "bold",
                },
              }}
              name="UserProfileScreen"
              component={UserProfileScreen}
            />
            <Tab.Screen
              options={{
                headerShown: false,
                tabBarButton: () => null,
                tabBarIcon: ({ color }) => <></>,
                tabBarLabelStyle: {
                  fontWeight: "bold",
                },
                headerStyle: {
                  backgroundColor: "#CBD18F",
                },
                headerTintColor: "#CBD18F",
                headerTitleStyle: {
                  fontWeight: "bold",
                },
              }}
              name="Bookmarks"
              component={Bookmarks}
            />
            {/* screens that are not displayed in tab ends */}
          </>
        ) : (
          <>
            <Tab.Screen
              options={{
                header: () => null,
                headerShown: false,
                tabBarButton: () => null,
                tabBarIcon: ({ color }) => <></>,
                tabBarStyle: { display: "none" },
                tabBarLabelStyle: {
                  fontWeight: "bold",
                },
                headerStyle: {
                  backgroundColor: "#CBD18F",
                },
                headerTintColor: "#CBD18F",
                headerTitleStyle: {
                  fontWeight: "bold",
                },
              }}
              name="Splash2"
              component={Splash2}
            />
            <Tab.Screen
              options={{
                headerShown: false,
                tabBarButton: () => null,
                tabBarIcon: ({ color }) => <></>,
                tabBarStyle: { display: "none" },
                tabBarLabelStyle: {
                  fontWeight: "bold",
                },
                headerStyle: {
                  backgroundColor: "#CBD18F",
                },
                headerTintColor: "#CBD18F",
                headerTitleStyle: {
                  fontWeight: "bold",
                },
              }}
              name="Login"
              component={Login}
            />
            <Tab.Screen
              options={{
                headerShown: false,
                tabBarButton: () => null,
                tabBarIcon: ({ color }) => <></>,
                tabBarStyle: { display: "none" },
                tabBarLabelStyle: {
                  fontWeight: "bold",
                },
                headerStyle: {
                  backgroundColor: "#CBD18F",
                },
                headerTintColor: "#CBD18F",
                headerTitleStyle: {
                  fontWeight: "bold",
                },
              }}
              name="Register"
              component={Register}
            />
          </>
        )}
      </Tab.Navigator>
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
      400: "#E3B448",
    },
    extraOrage: {
      400: "#E38E48",
    },
    sage: {
      300: "#F8FFE3",
      400: "#CBD18F",
    },
    forestGreen: {
      400: "#3A6B35",
    },
    google: {
      400: "#DE5246",
    },
    singletons: {
      white: "#FFFFFF",
      black: "#000000",
    },
    muted: {
      600: "#525252",
    },
    coolGray: {
      500: "#6B7280",
      900: "#111827",
    },
    trueGray: {
      50: "#FAFAFA",
    },
  },
  container: {
    flex: 1,
    backgroundColor: "#CBD18F",
    alignItems: "center",
    justifyContent: "center",
  },
  settingsContainer: {
    flex: 1,
    backgroundColor: "#CBD18F",
    alignItems: "center",
  },
  input: {
    bg: "white",
    borderColor: "forestGreen.400",
  },
  checkbox: {
    borderColor: "forestGreen.400",
    bg: "forestGreen.400",
  },
  commentOpenStyle: {
    display: "flex",
    flex: 1,
    width: "100%",
  },
  commentClosedStyle: {
    display: "none",
  },
  postShadow: {
    shadowColor: "#171717",
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
});
