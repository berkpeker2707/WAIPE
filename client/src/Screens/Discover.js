import React from "react";
import { NativeBaseProvider, Center, Text } from "native-base";

const DiscoverScreen = () => {
  return (
    <NativeBaseProvider>
      <Center flex={1} px="3">
        <Text>Discover Page</Text>
      </Center>
    </NativeBaseProvider>
  );
};

export default DiscoverScreen;
