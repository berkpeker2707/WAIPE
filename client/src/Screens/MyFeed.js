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
import { getAllPosts, selectAllPost } from "../Redux/Slices/postSlice";

const MyFeedScreen = ({ navigation, route }) => {
  const dispatch = useDispatch();

  const allPost = useSelector(selectAllPost);

  useEffect(() => {
    dispatch(getAllPosts());
  }, [dispatch]);

  const safeAreaProps = useSafeArea({
    safeAreaTop: true,
    pt: 2,
  });

  return allPost ? (
    <ScrollView {...safeAreaProps}></ScrollView>
  ) : (
    <Text>Loading...</Text>
  );
};

const styles = StyleSheet.create({});

export default MyFeedScreen;
