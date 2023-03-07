import React, { useEffect } from "react";
import { View } from "react-native";
import { Feather } from "@expo/vector-icons";
import {
  Text,
  HStack,
  Avatar,
  Spinner,
  useTheme,
  ScrollView,
  Heading,
  VStack,
  IconButton,
  Icon,
} from "native-base";
import {
  blockUserAction,
  getCurrentUserAction,
  selectCurrentUser,
  selectUserLoading,
  selectUserUpdated,
} from "../Redux/Slices/userSlice";
import { useDispatch, useSelector } from "react-redux";

const BlockedUsersScreen = () => {
  const theme = useTheme();
  const dispatch = useDispatch();

  const currentUser = useSelector(selectCurrentUser);
  const userLoading = useSelector(selectUserLoading);
  const isUpdate = useSelector(selectUserUpdated);
  const blockedUsers = currentUser?.blockedUsers;

  // console.log("blockedUsers");
  // console.log(blockedUsers);
  // console.log(isUpdate);
  // console.log("blockedUsers");

  useEffect(() => {
    dispatch(getCurrentUserAction());
  }, [isUpdate]);

  return (
    <View style={theme.settingsContainer}>
      {userLoading ? (
        <Spinner color={"mustard.400"} size="lg" />
      ) : (
        <ScrollView w="70%">
          <Heading mt={50} mb={30} size="xl" alignSelf="center">
            Blocked Users
          </Heading>
          <VStack space={4}>
            {blockedUsers?.map((blockedUser) => {
              return (
                <HStack
                  space={3}
                  alignItems="center"
                  justifyContent="space-between"
                  key={blockedUser._id}
                >
                  <HStack space={3} alignItems="center">
                    <Avatar
                      bg="purple.600"
                      size="lg"
                      shadow={1}
                      source={{
                        uri: blockedUser.picture ? blockedUser.picture : null,
                      }}
                    >
                      {`${blockedUser.firstname[0]}`}
                    </Avatar>
                    <Text
                      fontSize="lg"
                      bold
                    >{`${blockedUser.firstname} ${blockedUser.lastname}`}</Text>
                  </HStack>
                  <IconButton
                    onPress={() => dispatch(blockUserAction(blockedUser._id))}
                    borderRadius="25"
                    variant="ghost"
                    colorScheme="warning"
                    w={10}
                    h={10}
                    icon={
                      <Icon
                        as={Feather}
                        name="minus-circle"
                        size="xl"
                        color="coolGray.500"
                      />
                    }
                  />
                </HStack>
              );
            })}
          </VStack>
        </ScrollView>
      )}
    </View>
  );
};

export default BlockedUsersScreen;
