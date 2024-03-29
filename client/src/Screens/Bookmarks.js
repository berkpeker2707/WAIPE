import React, { useEffect, useMemo, useState } from "react";
import { View, StyleSheet } from "react-native";
import {
  ScrollView,
  Center,
  Text,
  Button,
  Image,
  Box,
  Pressable,
  VStack,
  Input,
  Icon,
  useTheme,
} from "native-base";
import MasonryList from "@react-native-seoul/masonry-list";
import { useDispatch, useSelector } from "react-redux";
import {
  selectGetArchivedPosts,
  getArchivedPostsAction,
} from "../Redux/Slices/postSlice";

const BookmarksScreen = ({ navigation, route }) => {
  const theme = useTheme();

  const dispatch = useDispatch();

  const archivedPosts = useSelector(selectGetArchivedPosts);

  useEffect(() => {
    dispatch(getArchivedPostsAction());
    return () => {
      //clean up function
    };
  }, [dispatch]);

  const renderItem = ({ item, i }) => {
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
            source={{ uri: item.picture ? item.picture : null }}
            style={{
              height: 150,
              alignSelf: "stretch",
              marginLeft: 12,
              marginRight: 12,
            }}
            resizeMode="cover"
            alt="alt"
          />
        </View>
      </Pressable>
    );
  };

  return archivedPosts ? (
    <ScrollView bg={theme.colors.sage[400]}>
      <MasonryList
        style={{ alignSelf: "stretch" }}
        data={archivedPosts}
        keyExtractor={(item) => item._id}
        numColumns={2}
        showsVerticalScrollIndicator={false}
        renderItem={(archivedPosts) => renderItem(archivedPosts)}
        // onRefresh={() => refetch({ first: ITEM_CNT })}
        // onEndReachedThreshold={0.1}
        // onEndReached={() => loadNext(ITEM_CNT)}
      />
    </ScrollView>
  ) : (
    <Text>Loading...</Text>
  );
};

export default BookmarksScreen;
