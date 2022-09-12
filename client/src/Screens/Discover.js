import React, { useEffect, useState } from "react";
import { View, ScrollView, StyleSheet } from "react-native";
import { NativeBaseProvider, Center, Text, Button, Image } from "native-base";
import Masonry from "react-native-infinite-masonry";

import "react-native-get-random-values";
const { v4: uuidv4 } = require("uuid");

const axios = require("axios");

const sample20CatArrayURL =
  "https://api.thecatapi.com/v1/images/search?limit=10&page=100&order=DESC";

const DiscoverScreen = ({ navigation }) => {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    axios
      .get(sample20CatArrayURL)
      .then((res) => setPosts(res.data))
      .catch((err) => console.log(err));
  }, []);

  const vpWidth = Dimensions.get("window").width;

  return (
    <NativeBaseProvider>
      <ScrollView>
        <Center flex={1} px="3">
          {/* Initial render section starts */}
          <Text>TEST</Text>
          {posts.map((post1) => (
            <View key={uuidv4()}>
              <Masonry
                itemsProvider={dataItemProvider}
                renderItem={Item}
                pageSize={10}
              />
            </View>
          ))}
          {/* Initial render section ends */}

          {/* Render more section starts */}
          {/* {posts.map((post2) => (
            <View key={uuidv4()}>
              <Image
                source={{
                  uri: post2.url,
                }}
                alt="Alternate Text"
                size="xl"
              />
            </View>
          ))} */}
          {/* Render more section ends */}
        </Center>
      </ScrollView>
    </NativeBaseProvider>
  );

  function Item(dataItem, key) {
    return (
      <View
        key={key}
        style={{
          ...styles.card,
          height: dataItem.height,
        }}
      >
        <Image style={styles.img} source={{ uri: dataItem.image_url }} />
      </View>
    );
  }

  function dataItemProvider(pageSize = 10) {
    return [...Array(pageSize).keys()].map((i) => {
      return {
        image_url: `https://i.picsum.photos/id/${parseInt(
          Math.random() * 200
        )}/300/400.jpg`,
        height: parseInt(Math.max(0.3, Math.random()) * vpWidth),
        key: i,
      };
    });
  }
};

const styles = StyleSheet.create({
  container: {
    alignContent: "center",
    alignItems: "center",
  },
  card: {
    margin: 8,
    width: vpWidth * 0.5 - 15,
    shadowColor: "#0000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    backgroundColor: "white",
    borderRadius: 5,
  },
  img: {
    borderRadius: 5,
    flex: 1,
  },
});

export default DiscoverScreen;
