import React, { useEffect, useRef } from "react";
import { Animated, Easing } from "react-native";
import Lottie from "lottie-react-native";

export default function LottieHeart() {
  const animationProgress = useRef(new Animated.Value(0));

  useEffect(() => {
    Animated.timing(animationProgress.current, {
      toValue: 1,
      duration: 5000,
      easing: Easing.linear,
      useNativeDriver: false,
    }).start();
  }, []);

  return (
    <Lottie
      source={require("../../../assets/animations/popping-heart.json")}
      progress={animationProgress.current}
    />
  );
}

// <LottieView
// ref={(animation) => {
//   ref.current = animation;
// }}
// style={{
//   width: 400,
//   height: 400,
// }}
// source={require("../../assets/animations/wiggly-carrot.json")}
// autoPlay
// loop={false}
// resizeMode="cover"
// onAnimationFinish={onAnimationFinish}
// />
