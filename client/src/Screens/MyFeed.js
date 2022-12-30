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
import {
  selectGetFollowedPosts,
  getFollowedPostsAction,
} from "../Redux/Slices/postSlice";

const MyFeedScreen = ({ navigation, route }) => {
  const dispatch = useDispatch();

  const followedPosts = useSelector(selectGetFollowedPosts);

  useEffect(() => {
    dispatch(getFollowedPostsAction());
  }, [dispatch]);

  const safeAreaProps = useSafeArea({
    safeArea: true,
    pt: 2,
  });

  const renderItem = ({ item }) => {
    return (
      <Pressable
        onPress={() => {
          navigation.navigate("Post", {
            post: item,
          });
        }}
      >
        <View key={item._id} style={[{ flex: 1 }]}>
          <Image
            source={{ uri: item.picture }}
            style={{
              height: 150,
              alignSelf: "stretch",
              margin: 2,
            }}
            resizeMode="cover"
            alt="alt"
          />
        </View>
      </Pressable>
    );
  };

  return followedPosts ? (
    <ScrollView {...safeAreaProps}>
      <MasonryList
        style={{ alignSelf: "stretch" }}
        data={followedPosts}
        keyExtractor={(item) => item._id}
        numColumns={2}
        showsVerticalScrollIndicator={false}
        renderItem={(followedPosts) => renderItem(followedPosts)}
        // onRefresh={() => refetch({ first: ITEM_CNT })}
        // onEndReachedThreshold={0.1}
        // onEndReached={() => loadNext(ITEM_CNT)}
      />
    </ScrollView>
  ) : (
    <Text>Loading...</Text>
  );
};

export default MyFeedScreen;
