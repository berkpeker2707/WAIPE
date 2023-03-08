import React from "react";
import { SimpleLineIcons } from "@expo/vector-icons";
import { Box, Icon, IconButton } from "native-base";

const SettingsButton = (props) => {
  const { onPress } = props;

  return (
    <Box>
      <IconButton
        onPress={onPress}
        borderRadius="25"
        alignSelf="flex-end"
        variant="ghost"
        colorScheme="warning"
        w={10}
        h={10}
        icon={
          <Icon
            as={SimpleLineIcons}
            name="settings"
            size="xl"
            color="coolGray.500"
          />
        }
      />
    </Box>
  );
};

export default SettingsButton;
