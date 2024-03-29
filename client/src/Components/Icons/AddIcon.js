import { View } from "native-base";
import React from "react";
import Svg, { G, Path } from "react-native-svg";

const AddIcon = (color) => {
  return (
    <View
      style={{
        backgroundColor: "#CBD18F",
      }}
    >
      <Svg width={20} height={20} viewBox="0 0 512 512">
        <G>
          <Path
            d="M490.667,234.667H277.333V21.333C277.333,9.551,267.782,0,256,0c-11.782,0-21.333,9.551-21.333,21.333v213.333H21.333   C9.551,234.667,0,244.218,0,256c0,11.782,9.551,21.333,21.333,21.333h213.333v213.333c0,11.782,9.551,21.333,21.333,21.333   c11.782,0,21.333-9.551,21.333-21.333V277.333h213.333c11.782,0,21.333-9.551,21.333-21.333   C512,244.218,502.449,234.667,490.667,234.667z"
            fill={color.color}
          />
        </G>
      </Svg>
    </View>
  );
};

export default AddIcon;
