import { View } from "native-base";
import React from "react";
import Svg, { Path, Circle, G } from "react-native-svg";

const ProfileIcon = (color) => {
  return (
    <View>
      <Svg width={20} height={20} viewBox="0 0 512 512">
        <G>
          <Circle cx={256} cy={128} r={128} fill={color.color} />
          <Path
            d="M256,298.667c-105.99,0.118-191.882,86.01-192,192C64,502.449,73.551,512,85.333,512h341.333   c11.782,0,21.333-9.551,21.333-21.333C447.882,384.677,361.99,298.784,256,298.667z"
            fill={color.color}
          />
        </G>
      </Svg>
    </View>
  );
};

export default ProfileIcon;
