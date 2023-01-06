import React from "react";
import { View } from "react-native";
import {
  Text,
  Center,
  HStack,
  Avatar,
  Spinner,
  useTheme,
  ScrollView,
  Box,
  Heading,
  VStack,
} from "native-base";
import {
  selectCurrentUser,
  selectUserLoading,
  selectUserUpdated,
} from "../Redux/Slices/userSlice";
import { useSelector } from "react-redux";

const BlockedUsersScreen = () => {
  const theme = useTheme();

  const currentUser = useSelector(selectCurrentUser);
  const userLoading = useSelector(selectUserLoading);
  const isUpdate = useSelector(selectUserUpdated);
  const blockedUsers = currentUser?.blockedUsers;

  console.log("currentUser");
  console.log(currentUser.blockedUsers);
  console.log("currentUser");

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
            {blockedUsers?.map((blockedUser, index) => {
              return (
                <HStack space={3} alignItems="center">
                  <Avatar
                    bg="purple.600"
                    size="lg"
                    shadow={1}
                    source={{
                      uri: blockedUser.picture,
                    }}
                  >
                    {`${blockedUser.firstname[0]}`}
                  </Avatar>
                  <VStack>
                    <Text
                      fontSize="lg"
                      bold
                    >{`${blockedUser.firstname} ${blockedUser.lastname}`}</Text>
                    <Text
                      _light={{ color: "muted.500" }}
                      _dark={{ color: "muted.500" }}
                    >
                      Nickname
                    </Text>
                  </VStack>
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
