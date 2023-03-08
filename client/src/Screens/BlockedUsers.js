import React, { useEffect, useState } from "react";
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
  blockPetAction,
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
  const [blockedProfiles, setBlockedProfiles] = useState([]);

  const currentUser = useSelector(selectCurrentUser);
  const userLoading = useSelector(selectUserLoading);
  const isUpdate = useSelector(selectUserUpdated);
  const blockedUsers = currentUser?.blockedUsers;
  const blockedPets = currentUser?.blockedPets;

  console.log("blockedPets");
  console.log(blockedProfiles);
  console.log("blockedPets");

  useEffect(() => {
    dispatch(getCurrentUserAction());
  }, [isUpdate]);

  useEffect(() => {
    setBlockedProfiles([...blockedUsers, ...blockedPets]);
  }, [blockedUsers?.length, blockedPets?.length]);

  return (
    <View style={theme.settingsContainer}>
      {userLoading ? (
        <Spinner color={"mustard.400"} size="lg" />
      ) : (
        <ScrollView w="70%">
          <Heading mt={50} mb={30} size="xl" alignSelf="center">
            Blocked Profiles
          </Heading>
          <VStack space={4}>
            {blockedProfiles?.map((blockedProfile) => {
              return (
                <HStack
                  space={3}
                  alignItems="center"
                  justifyContent="space-between"
                  key={blockedProfile._id}
                >
                  <HStack space={3} alignItems="center">
                    <Avatar
                      bg="purple.600"
                      size="lg"
                      shadow={1}
                      source={{
                        uri: blockedProfile.picture
                          ? blockedProfile.picture
                          : null,
                      }}
                    >
                      {blockedProfile.ownerID
                        ? `${blockedProfile.name[0]}`
                        : `${blockedProfile.firstname[0]}`}
                    </Avatar>
                    <Text fontSize="lg" bold>
                      {blockedProfile.ownerID
                        ? `${blockedProfile.name}`
                        : `${blockedProfile.firstname} ${blockedProfile.lastname}`}
                    </Text>
                  </HStack>
                  <IconButton
                    onPress={() => {
                      if (blockedProfile.ownerID) {
                        dispatch(blockPetAction(blockedProfile._id));
                      } else {
                        dispatch(blockUserAction(blockedProfile._id));
                      }
                    }}
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
