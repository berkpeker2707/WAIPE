import React from "react";
import { Pressable, Box } from "native-base";

const PressableButton = (props) => {
  const { onPress, children } = props;

  return (
    <Pressable variant="ghost" onPress={onPress}>
      {({ isPressed }) => {
        return (
          <Box
            style={{
              opacity: isPressed ? 0.7 : 1,
            }}
          >
            {children}
          </Box>
        );
      }}
    </Pressable>
  );
};

export default PressableButton;
