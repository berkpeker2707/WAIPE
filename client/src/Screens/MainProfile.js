import React, { useEffect } from "react";
import { View } from "react-native";
import {
  NativeBaseProvider,
  Center,
  Text,
  Spinner,
  extendTheme,
  Heading,
  Avatar,
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

  console.log(currentUser);

  return (
    <View style={style.container}>
      <NativeBaseProvider>
        <Center flex={1} px="3">
          {userLoading ? (
            <Spinner color={"mustard.400"} size="lg" />
          ) : (
            <>
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
              <Avatar
                bg="purple.600"
                alignSelf="center"
                width={230}
                height={230}
                source={{
                  uri: "https://images.unsplash.com/photo-1510771463146-e89e6e86560e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=627&q=80",
                }}
              >
                {currentUser.firstname[0]}
                {currentUser.lastname[0]}
              </Avatar>
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
