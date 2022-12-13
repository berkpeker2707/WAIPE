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
import { selectGetAllPosts } from "../Redux/Slices/postSlice";

const MyFeedScreen = ({ navigation, route }) => {
  const dispatch = useDispatch();

  const allPosts = useSelector(selectGetAllPosts);

  // useEffect(() => {
  //   dispatch(getAllPosts());
  // }, [dispatch]);

  const safeAreaProps = useSafeArea({
    safeArea: true,
    pt: 2,
  });

  return allPosts ? (
    <ScrollView {...safeAreaProps}></ScrollView>
  ) : (
    <Text>Loading...</Text>
  );
};

const styles = StyleSheet.create({});

export default MyFeedScreen;
