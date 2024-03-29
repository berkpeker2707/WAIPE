import { Stack, Text, useTheme } from "native-base";
import { ViewPropTypes } from "deprecated-react-native-prop-types";

import React, { useRef, useState, useEffect } from "react";

import LottieView from "lottie-react-native";
import { useSelector } from "react-redux";
import { selectToken } from "../Redux/Slices/authSlice";
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
    if (token && animationLoaded) {
      navigation.navigate("Feed");
    }
  }, [authLoaded, animationLoaded, navigation]);

  return (
    <Stack
      bg={theme.colors.sage[400]}
      style={{
        flex: 1,
        justifyContent: "center",
        flexDirection: "column",
      }}
    >
      <Text
        style={{
          lineHeight: 100,
          fontFamily: "OrientalCatsLight",
          fontSize: 48,
          textAlign: "center",
        }}
      >
        Welcome Back!
      </Text>

      <LottieView
        ref={(animation) => {
          ref.current = animation;
        }}
        style={{
          width: 400,
          height: 400,
        }}
        source={require("../../assets/animations/wiggly-carrot.json")}
        autoPlay
        loop={false}
        resizeMode="cover"
        onAnimationFinish={onAnimationFinish}
      />
    </Stack>
  );
};

export default Splash1;
