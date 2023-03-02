import {
  Box,
  Center,
  ScrollView,
  Stack,
  Text,
  useSafeArea,
  useTheme,
  View,
} from "native-base";
import React, { useRef, useState, useEffect } from "react";

import LottieView from "lottie-react-native";
import { useSelector } from "react-redux";
import { selectToken } from "../Redux/Slices/authSlice";
import { store } from "../Redux/store";
const Splash1 = ({ navigation }) => {
  const theme = useTheme();

  const token = useSelector(selectToken);

  const [authLoaded, setAuthLoaded] = useState(() => true);
  const [animationLoaded, setAnimationLoaded] = useState(false);

  const ref = useRef(null);

  const onAnimationFinish = () => {
    setAnimationLoaded(true);
  };

  useEffect(() => {
    if (!token && animationLoaded) {
      navigation.navigate("Login");
    }
  }, [authLoaded, animationLoaded, navigation]);

  const safeAreaProps = useSafeArea({
    safeArea: true,
  });

  //   const routes = navigation.getState()?.routes;
  //   const prevRoute = routes[routes.length - 2]; // -2 because -1 is the current route

  //   console.log("prevRoute.name");
  //   console.log(prevRoute.name);
  //   console.log("prevRoute.name");
  //   console.log("##############");
  //   if (prevRoute.name === "Settings") {
  //     // navigation.navigate("<Some Routing Key>", params);
  //     console.log("YOU ARE LEAVING");
  //   } else {
  //     console.log("YOU ARE BACK");
  //   }

  //   console.log("matest");
  //   console.log(
  //     navigation?.getState()?.history[navigation?.getState()?.history?.length - 2]
  //   );
  //   console.log("matest");

  return (
    <Stack
      {...safeAreaProps}
      bg={theme.colors.sage[400]}
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <LottieView
        ref={(animation) => {
          ref.current = animation;
        }}
        style={{
          width: 400,
          height: 400,
        }}
        source={require("../../assets/wiggly-carrot.json")}
        autoPlay
        loop={false}
        resizeMode="cover"
        onAnimationFinish={onAnimationFinish}
      />
    </Stack>
  );
};

export default Splash1;
