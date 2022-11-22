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
} from "native-base";
import MasonryList from "@react-native-seoul/masonry-list";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllPosts,
  getPost,
  selectAllPost,
  selectPost,
} from "../Redux/Slices/postSlice";

const DiscoverScreen = ({ navigation, route }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllPosts());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getPost(testID));
  }, [dispatch]);
  var testID = "62c5253aba3f45ae697a82bc";
  const allPost = useSelector(selectAllPost);

  console.log(
    "🚀 ~ file: Discover.js ~ line 27 ~ DiscoverScreen ~ allPost",
    allPost
  );

  const safeAreaProps = useSafeArea({
    safeAreaTop: true,
    pt: 2,
  });

  const PhotoCard = ({ item, style }) => {
    const randomBool = useMemo(() => Math.random() < 0.5, []);
    return (
      <View key={item.id} style={[{ marginTop: 12, flex: 1 }, style]}>
        <Image
          source={{ uri: item.postImage }}
          style={{
            height: randomBool ? 150 : 280,
            alignSelf: "stretch",
          }}
          resizeMode="cover"
          alt="alt"
        />
      </View>
    );
  };

  const renderItem = ({ item, i }) => {
    return (
      <Pressable
        onPress={() => {
          /* 1. Navigate to the Details route with params */
          navigation.navigate("Post", {
            post: item,
          });
        }}
      >
        <PhotoCard item={item} style={{ marginLeft: i % 2 === 0 ? 0 : 12 }} />
      </Pressable>
    );
  };

  console.log(allPost);
  return allPost ? (
    <ScrollView {...safeAreaProps}>
      <MasonryList
        style={{ alignSelf: "stretch" }}
        data={allPost}
        numColumns={2}
        showsVerticalScrollIndicator={false}
        renderItem={renderItem}
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
