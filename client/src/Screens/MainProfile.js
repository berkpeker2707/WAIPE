import React, { useEffect, useState } from "react";
import { View } from "react-native";
import { SimpleLineIcons } from "@expo/vector-icons";
import ProfileInfoCard from "../Components/ProfileInfoCard";
import {
  NativeBaseProvider,
  Center,
  Text,
  Spinner,
  extendTheme,
  Heading,
  Avatar,
  Box,
  Button,
  Icon,
  ZStack,
  ScrollView,
  HStack,
  VStack,
  Pressable,
} from "native-base";
import {
  getUser,
  selectCurrentUser,
  selectUserLoading,
} from "../Redux/Slices/userSlice";
import { useSelector, useDispatch } from "react-redux";

const MainProfileScreen = ({ token }) => {
  const dispatch = useDispatch();

  const currentUser = useSelector(selectCurrentUser);
  const userLoading = useSelector(selectUserLoading);
  const [pets, setPets] = useState();

  const petsMatrix = () => {
    const petsOfUser = currentUser.pets;
    let rows = [];
    let col = [];

    petsOfUser.forEach((pet, index) => {
      col.push(pet);
      if ((index + 1) % 3 === 0) {
        rows.push(col);
        col = [];
      }
    });

    if (col.length) {
      console.log(col);
      if (col.length % 3 !== 0) {
        col.push("end");
      }
      rows.push(col);
    } else {
      rows.push(["end"]);
    }

    return rows;
  };

  useEffect(() => {
    dispatch(getUser(token));
    setPets(petsMatrix());
  }, [dispatch]);

  return (
    <View style={style.container}>
      <NativeBaseProvider>
        <Center flex={1} px="3">
          {userLoading ? (
            <Spinner color={"mustard.400"} size="lg" />
          ) : (
            <>
              <ProfileInfoCard
                name={`${currentUser.firstname} ${currentUser.lastname}`}
                nickname={"@Nickname"}
                image={
                  "https://images.unsplash.com/photo-1510771463146-e89e6e86560e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=627&q=80"
                }
                infoText={`City, Country\n${currentUser.biography}`}
              />
              <Box w={330} h="40%">
                <ScrollView w={400} h="80">
                  {pets?.map((petRow, index) => {
                    return (
                      <HStack
                        space={3}
                        flex="1"
                        key={index}
                        justifyContent="flex-start"
                      >
                        {petRow?.map((pet, petIndex) => {
                          return (
                            <VStack space={2} key={petIndex}>
                              <Box w={108}>
                                {pet !== "end" ? (
                                  <Pressable
                                    onPress={() => console.log("I'm Pressed")}
                                  >
                                    {({ isPressed }) => {
                                      return (
                                        <View>
                                          <Avatar
                                            bg="purple.600"
                                            alignSelf="center"
                                            width={isPressed ? 105 : 108}
                                            height={isPressed ? 105 : 108}
                                            shadow={1}
                                            source={{
                                              uri: "https://images.unsplash.com/photo-1510771463146-e89e6e86560e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=627&q=80",
                                            }}
                                          >
                                            {pet.name[0]}
                                          </Avatar>
                                          <Text
                                            isTruncated
                                            style={{
                                              textAlign: "center",
                                            }}
                                            w={79}
                                            alignSelf="center"
                                            fontSize="xs"
                                          >
                                            {pet.name}
                                          </Text>
                                        </View>
                                      );
                                    }}
                                  </Pressable>
                                ) : (
                                  <Button
                                    borderRadius="70"
                                    variant="ghost"
                                    colorScheme="warning"
                                    alignSelf="center"
                                    width={112}
                                    height={112}
                                    leftIcon={
                                      <Icon
                                        as={SimpleLineIcons}
                                        name="plus"
                                        size="5xl"
                                        color="trueGray.50"
                                      />
                                    }
                                  />
                                )}
                              </Box>
                            </VStack>
                          );
                        })}
                      </HStack>
                    );
                  })}
                </ScrollView>
              </Box>
            </>
          )}
        </Center>
      </NativeBaseProvider>
    </View>
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
    justifyContent: "center",
  },
};

export default MainProfileScreen;
