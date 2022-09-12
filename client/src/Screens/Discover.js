import React from "react";
import { NativeBaseProvider, Center, Text } from "native-base";
import Masonry from "react-native-masonry";

const sample20CatArrayURL =
  "https://api.thecatapi.com/v1/images/search?limit=20&page=100&order=DESC";

const getCatArray = (httpGet = (sample20CatArrayURL) => {
  var xmlHttp = new XMLHttpRequest();
  xmlHttp.open("GET", sample20CatArrayURL, false); // false for synchronous request
  xmlHttp.send(null);
  return xmlHttp.responseText;
});

console.log(getCatArray);

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
