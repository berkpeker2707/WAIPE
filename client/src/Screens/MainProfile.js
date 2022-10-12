import React, { useEffect, useState } from "react";
import { View } from "react-native";
import { SimpleLineIcons } from "@expo/vector-icons";
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
              <Box w={360} h="5%" mt={10}>
                <Button
                  borderRadius="25"
                  alignSelf="flex-end"
                  variant="ghost"
                  colorScheme="warning"
                  w={10}
                  h={10}
                  leftIcon={
                    <Icon
                      as={SimpleLineIcons}
                      name="settings"
                      size="xl"
                      color="coolGray.500"
                    />
                  }
                />
              </Box>
              <Heading>
                {currentUser.firstname} {currentUser.lastname}
              </Heading>
              <Text
                mb={4}
                _light={{ color: "muted.500" }}
                _dark={{ color: "muted.500" }}
              >
                @Nickname
              </Text>
              <Box mb={4} width={230} height={230}>
                <ZStack>
                  <Avatar
                    bg="purple.600"
                    alignSelf="center"
                    width={230}
                    height={230}
                    shadow={1}
                    source={{
                      uri: "https://images.unsplash.com/photo-1510771463146-e89e6e86560e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=627&q=80",
                    }}
                  >
                    {currentUser.firstname[0]}
                    {currentUser.lastname[0]}
                  </Avatar>
                  <Button
                    borderRadius="25"
                    bg="white"
                    ml={175}
                    mt={175}
                    w={10}
                    h={10}
                    colorScheme="warning"
                    leftIcon={
                      <Icon
                        as={SimpleLineIcons}
                        name="pencil"
                        size="md"
                        color="coolGray.500"
                      />
                    }
                  />
                </ZStack>
              </Box>
              <Box
                bg="trueGray.50"
                rounded="xl"
                height="10%"
                w={330}
                padding="3"
                shadow={1}
                mb={5}
              >
                <Text>
                  City, Country{"\n"}
                  {currentUser.biography}
                </Text>
              </Box>
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
                              <Box w={112}>
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
                                            width={isPressed ? 105 : 110}
                                            height={isPressed ? 105 : 110}
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
