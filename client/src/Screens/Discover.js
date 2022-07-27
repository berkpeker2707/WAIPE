import React from "react";
import { NativeBaseProvider, Center, Text, Button } from "native-base";

const DiscoverScreen = ({ navigation }) => {
  return (
    <NativeBaseProvider>
      <Center flex={1} px="3">
        <Text>Discover Page</Text>
        <Button onPress={() => navigation.navigate("MainProfile")}>
          Main Profile
        </Button>
      </Center>
    </NativeBaseProvider>
  );
};

export default DiscoverScreen;
