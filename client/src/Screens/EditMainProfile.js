import React from "react";
import { View, Text } from "react-native";
import { Center } from "native-base";

const EditMainProfileScreen = () => {
  return (
    <View style={style.container}>
      <Center flex={1} px="3">
        <Text>Edit Main</Text>
      </Center>
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

export default EditMainProfileScreen;
