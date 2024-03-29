import { View } from "native-base";
import React from "react";
import Svg, { G, Path } from "react-native-svg";

const SearchBarIcon = (color) => {
  return (
    <View>
      <Svg width={20} height={20} viewBox="0 0 24 24">
        <Path
          d="M23.707,22.293l-5.969-5.969a10.016,10.016,0,1,0-1.414,1.414l5.969,5.969a1,1,0,0,0,1.414-1.414ZM10,18a8,8,0,1,1,8-8A8.009,8.009,0,0,1,10,18Z"
          fill={color.color}
        />
      </Svg>
    </View>
  );
};

export default SearchBarIcon;
