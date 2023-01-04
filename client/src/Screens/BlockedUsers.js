import React from "react";
import { View } from "react-native";
import { Text, Center, useTheme } from "native-base";

const BlockedUsersScreen = () => {
  const theme = useTheme();
  return (
    <View style={theme.settingsContainer}>
      <Center flex={1} px="3">
        <Text>Blocked Users</Text>
      </Center>
    </View>
  );
};

export default BlockedUsersScreen;
