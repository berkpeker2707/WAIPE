import React, { useEffect, useRef, useState } from "react";
import { ViewPropTypes } from "deprecated-react-native-prop-types";
import LottieView from "lottie-react-native";
import { Animated, Easing } from "react-native";

export default function LottieHeart(props) {
  const { isLikeUpdated } = props;

  const [animationLoaded, setAnimationLoaded] = useState(() => isLikeUpdated);

  useEffect(() => {
    setAnimationLoaded(() => true);
  }, [animationLoaded]);

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

  console.log("animationLoaded");
  console.log(animationLoaded);
  console.log("animationLoaded");
  console.log("#################################################");
  console.log("#################################################");
  console.log("#################################################");
  console.log("isLikeUpdated");
  console.log(isLikeUpdated);
  console.log("isLikeUpdated");

  return !isLikeUpdated ? (
    <LottieView
      ref={(animation) => {
        ref.current = animation;
      }}
      source={require("../../../assets/animations/popping-heart.json")}
      autoPlay
      loop={false}
      resizeMode="cover"
      onAnimationFinish={onAnimationFinish}
    />
  ) : (
    <></>
  );
}
