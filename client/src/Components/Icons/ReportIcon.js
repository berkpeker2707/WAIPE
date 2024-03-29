<i class="fi fi-br-paper-plane"></i>;

import { View } from "native-base";
import React from "react";
import Svg, { Path } from "react-native-svg";

const ReportIcon = (color) => {
  return (
    <View>
      <Svg width={15} height={15} viewBox="0 0 24 24">
        <Path
          d="M20.484,20a1,1,0,0,1-.77-1.637,10.052,10.052,0,0,0,0-12.726,1,1,0,0,1,1.543-1.274,12.068,12.068,0,0,1,0,15.274A1,1,0,0,1,20.484,20ZM4.151,19.771a1,1,0,0,0,.135-1.408,10.052,10.052,0,0,1,0-12.726A1,1,0,0,0,2.744,4.363a12.065,12.065,0,0,0,0,15.274,1,1,0,0,0,1.407.134ZM20,12a8.009,8.009,0,0,1-8,8C1.412,19.624,1.415,4.374,12,4A8.009,8.009,0,0,1,20,12Zm-7,4a1,1,0,0,0-2,0A1,1,0,0,0,13,16Zm0-8a1,1,0,0,0-2,0v4a1,1,0,0,0,2,0Z"
          fill={color.color}
        />
      </Svg>
    </View>
  );
};

export default ReportIcon;
