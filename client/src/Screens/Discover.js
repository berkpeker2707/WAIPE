import React, { useEffect, useMemo, useState } from "react";
import { View, StyleSheet } from "react-native";
import {
  ScrollView,
  Center,
  Text,
  Button,
  Image,
  Box,
  useSafeArea,
  Pressable,
  VStack,
  Input,
  Icon,
} from "native-base";
import MasonryList from "@react-native-seoul/masonry-list";
import { useDispatch, useSelector } from "react-redux";
import { getAllPosts, selectAllPost } from "../Redux/Slices/postSlice";
import SearchBarIcon from "../Components/Icons/SearchBarIcon";

const DiscoverScreen = ({ navigation, route }) => {
  const dispatch = useDispatch();

  const allPost = useSelector(selectAllPost);

  useEffect(() => {
    dispatch(getAllPosts());
  }, [dispatch, allPost]);

  const safeAreaProps = useSafeArea({
    safeAreaTop: true,
    pt: 2,
  });

  const renderItem = ({ item, i }) => {
    const randomBool = useMemo(() => Math.random() < 0.5, []);

    return (
      <Pressable
        onPress={() => {
          navigation.navigate("Post", {
            post: item,
          });
        }}
      >
        <View key={item._id} style={[{ marginTop: 12, flex: 1 }]}>
          <Image
            source={{ uri: item.postImage }}
            style={{
              height: randomBool ? 150 : 280,
              alignSelf: "stretch",
              marginLeft: i % 2 === 0 ? 0 : 12,
            }}
            resizeMode="cover"
            alt="alt"
          />
        </View>
      </Pressable>
    );
  };

  return allPost ? (
    <ScrollView {...safeAreaProps}>
      <VStack w="100%" space={5} alignSelf="center">
        <Input
          placeholder="Search"
          variant="filled"
          width="100%"
          borderRadius="10"
          py="3"
          px="3"
          InputLeftElement={<Icon as={<SearchBarIcon />} />}
        />
      </VStack>
      <MasonryList
        style={{ alignSelf: "stretch" }}
        data={allPost}
        keyExtractor={(item) => item._id}
        numColumns={2}
        showsVerticalScrollIndicator={false}
        renderItem={(allPost) => renderItem(allPost)}
        onRefresh={() => refetch({ first: ITEM_CNT })}
        onEndReachedThreshold={0.1}
        onEndReached={() => loadNext(ITEM_CNT)}
      />
    </ScrollView>
  ) : (
    <Text>Loading...</Text>
  );
};

const styles = StyleSheet.create({});

export default DiscoverScreen;
