import React, { useEffect, useRef, useState } from "react";
import { ViewPropTypes } from "deprecated-react-native-prop-types";
import LottieView from "lottie-react-native";
import { Animated, Easing } from "react-native";

export default function LottieRain(props) {
  const { isLike3UpdatedBool } = props;

  const [animationLoaded, setAnimationLoaded] = useState(
    () => isLike3UpdatedBool
  );

  useEffect(() => {
    setAnimationLoaded(() => true);
  }, [!isLike3UpdatedBool]);

  const ref = useRef(null);

  const onAnimationFinish = () => {
    setAnimationLoaded(() => false);
  };

  // const animationProgress = useRef(new Animated.Value(0));

  // useEffect(() => {
  //   Animated.timing(animationProgress.current, {
  //     toValue: 1,
  //     duration: 5000,
  //     easing: Easing.linear,
  //     useNativeDriver: false,
  //   }).start();
  // }, []);

  return animationLoaded ? (
    <LottieView
      ref={(animation) => {
        ref.current = animation;
      }}
      source={require("../../../assets/animations/sparkling-rain.json")}
      autoPlay
      loop={false}
      resizeMode="cover"
      onAnimationFinish={onAnimationFinish}
    />
  ) : (
    <></>
  );
}
