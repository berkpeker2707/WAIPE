import React from "react";
import { View } from "react-native";
import { NativeBaseProvider, Center, Text } from "native-base";
import { getUser, selectCurrentUser } from "../Redux/Slices/userSlice";
import { useSelector, useDispatch } from "react-redux";

const MainProfileScreen = () => {
  const dispatch = useDispatch();

  dispatch(getUser());

  const currentUser = useSelector(selectCurrentUser);

  console.log(currentUser);

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
