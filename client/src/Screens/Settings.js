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
  Icon,
  useTheme,
} from "native-base";
import { useDispatch } from "react-redux";

import { revertAll } from "../Redux/Slices/authSlice";

const SettingsLine = (props) => {
  const theme = useTheme();

  const { leftIcon, text, rightElement } = props;

  return (
    <HStack alignItems="center" justifyContent="space-between">
      <HStack alignItems="center" space={2}>
        <Icon
          as={SimpleLineIcons}
          name={leftIcon}
          size="xl"
          color={theme.colors.coolGray[900].toString()}
        />
        <Text fontSize="xl">{text}</Text>
      </HStack>
      {rightElement}
    </HStack>
  );
};

const SettingsScreen = ({ navigation }) => {
  const dispatch = useDispatch();

  const theme = useTheme();

  return (
    <View style={theme.settingsContainer}>
      <Heading mt={50} mb={30} size="xl">
        Settings
      </Heading>
      <VStack w={"80%"} space={4}>
        <SettingsLine
          leftIcon="shuffle"
          text="Hand option"
          rightElement={
            <Switch
              size="sm"
              onTrackColor={theme.colors.forestGreen[400].toString()}
            />
          }
        />
        <Divider bg={theme.colors.extraOrage[400].toString()} thickness="2" />
        <SettingsLine
          leftIcon="lock"
          text="Private account"
          rightElement={
            <Switch
              size="sm"
              onTrackColor={theme.colors.forestGreen[400].toString()}
            />
          }
        />
        <Divider bg={theme.colors.extraOrage[400].toString()} thickness="2" />
        <PressableButton onPress={() => navigation.navigate("BlockedUsers")}>
          <SettingsLine
            leftIcon="ban"
            text="See blocked users"
            rightElement={<Icon as={<SimpleLineIcons />} />}
          />
        </PressableButton>
        <Divider bg={theme.colors.extraOrage[400].toString()} thickness="2" />
        <PressableButton
          onPress={() => {
            dispatch(revertAll());
          }}
        >
          <SettingsLine leftIcon="close" text="Logout" />
        </PressableButton>
      </VStack>
    </View>
  );
};

export default SettingsScreen;
