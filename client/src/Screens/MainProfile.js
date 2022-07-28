import React, { useEffect } from "react";
import { View } from "react-native";
import { NativeBaseProvider, Center, Text } from "native-base";
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

  return (
    <View style={style.container}>
      <NativeBaseProvider>
        <Center flex={1} px="3">
          <Text>Main Profile</Text>
        </Center>
      </NativeBaseProvider>
    </View>
  );
};

const style = {
  container: {
    flex: 1,
    backgroundColor: "#cbd18f",
    alignItems: "center",
    justifyContent: "center",
  },
};

export default MainProfileScreen;
