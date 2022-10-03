import React, { useEffect } from "react";
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
} from "native-base";
import {
  getUser,
  selectCurrentUser,
  selectUserLoading,
} from "../Redux/Slices/userSlice";
import { useSelector, useDispatch } from "react-redux";

const MainProfileScreen = ({ token }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUser(token));
  }, [dispatch]);

  const currentUser = useSelector(selectCurrentUser);
  const userLoading = useSelector(selectUserLoading);

  console.log(currentUser.pets);

  return (
    <View style={style.container}>
      <NativeBaseProvider>
        <Center flex={1} px="3">
          {userLoading ? (
            <Spinner color={"mustard.400"} size="lg" />
          ) : (
            <>
              <Box w="155%" h="5%" mt={10}>
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
                width="120%"
                padding="3"
                shadow={1}
                mb={12}
              >
                <Text>
                  City, Country{"\n"}
                  {currentUser.biography}
                </Text>
              </Box>
              <Box w="155%" h="35%" bg="trueGray.50"></Box>
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
