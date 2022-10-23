import React from "react";
import { View } from "react-native";
import PressableButton from "../Components/PressableButton";
import { SimpleLineIcons } from "@expo/vector-icons";
import {
  Heading,
  HStack,
  VStack,
  Switch,
  Text,
  Divider,
  extendTheme,
  NativeBaseProvider,
  Pressable,
  Icon,
  Box,
} from "native-base";

const SettingsLine = (props) => {
  const { leftIcon, text, rightElement } = props;

  return (
    <HStack alignItems="center" justifyContent="space-between">
      <HStack alignItems="center" space={2}>
        <Icon as={SimpleLineIcons} name={leftIcon} size="xl" color="black" />
        <Text fontSize="xl">{text}</Text>
      </HStack>
      {rightElement}
    </HStack>
  );
};

const SettingsScreen = () => {
  return (
    <NativeBaseProvider theme={theme}>
      <View style={style.container}>
        <Heading mt={50} mb={30} size="xl">
          Settings
        </Heading>
        <VStack w={"80%"} space={4}>
          <SettingsLine
            leftIcon="shuffle"
            text="Hand option"
            rightElement={<Switch size="sm" onTrackColor="forestGreen.400" />}
          />
          <Divider bg="extraOrage.400" thickness="2" />
          <SettingsLine
            leftIcon="lock"
            text="Private account"
            rightElement={<Switch size="sm" onTrackColor="forestGreen.400" />}
          />
          <Divider bg="extraOrage.400" thickness="2" />
          <PressableButton onPress={() => console.log("I'm Pressed")}>
            <SettingsLine
              leftIcon="ban"
              text="See blocked users"
              rightElement={
                <Icon
                  as={SimpleLineIcons}
                  name="arrow-right"
                  size="md"
                  mr={3}
                  color="coolGray.500"
                />
              }
            />
          </PressableButton>
        </VStack>
      </View>
    </NativeBaseProvider>
  );
};

const theme = extendTheme({
  colors: {
    mustard: {
      400: "#e3b448",
    },
    extraOrage: {
      400: "#E38E48",
    },
    sage: {
      300: "#F8FFE3",
      400: "#cbd18f",
    },
    forestGreen: {
      400: "#3a6b35",
    },
    google: {
      400: "#de5246",
    },
  },
});

const style = {
  container: {
    flex: 1,
    backgroundColor: "#cbd18f",
    alignItems: "center",
  },
};

export default SettingsScreen;
