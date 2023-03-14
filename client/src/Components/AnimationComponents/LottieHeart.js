import React, { useEffect, useRef, useState } from "react";
import { ViewPropTypes } from "deprecated-react-native-prop-types";
import LottieView from "lottie-react-native";
import { Animated, Easing } from "react-native";

export default function LottieHeart(props) {
  const { isLike1UpdatedBool } = props;

  const [animationLoaded, setAnimationLoaded] = useState(
    () => isLike1UpdatedBool
  );

  useEffect(() => {
    setAnimationLoaded(() => true);
  }, [!isLike1UpdatedBool]);

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
