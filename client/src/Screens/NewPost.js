import React, { useEffect, useMemo, useState } from "react";
import { View, StyleSheet } from "react-native";
import {
  ScrollView,
  Box,
  AspectRatio,
  Image,
  Text,
  VStack,
  HStack,
  Stack,
  Divider,
  Circle,
  Icon,
  Center,
  Pressable,
  TextArea,
  Avatar,
  useTheme,
  Button,
} from "native-base";

import uuid from "react-native-uuid";
import LikeHeartIcon from "../Components/Icons/LikeHeartIcon";
import AddCommentIcon from "../Components/Icons/AddCommentIcon";
import SendMessageIcon from "../Components/Icons/SendMessageIcon";
import CuteCatFeverCoffeeIcon from "../Components/Icons/CuteCatFeverCoffeeIcon";
import CuteCowSurprisedIcon from "../Components/Icons/CuteCowSurprisedIcon";
import CuteRabbitHoldingCarrotIcon from "../Components/Icons/CuteRabbitHoldingCarrotIcon";
import CuteSadCatSittingIcon from "../Components/Icons/CuteSadCatSittingIcon";

import ReportIcon from "../Components/Icons/ReportIcon";
import BookmarkIcon from "../Components/Icons/BookmarkIcon";
import { useDispatch, useSelector } from "react-redux";

import {
  archivePostAction,
  getPostAction,
  selectGetPost,
  selectPostUpdated,
} from "../Redux/Slices/postSlice";
import {
  getCommentAction,
  selectCommentUpdated,
  selectGetComment,
  updateCommentAction,
} from "../Redux/Slices/commentSlice";
import { selectLikeUpdated } from "../Redux/Slices/likeSlice";

import PostImageSection from "../Components/PostComponents/PostImageSection";
import PostImageLikeSection from "../Components/PostComponents/PostImageLikeSection";
import PostViewCommentSection from "../Components/PostComponents/PostViewCommentSection";
import {
  getCurrentUserAction,
  selectCurrentUser,
} from "../Redux/Slices/userSlice";

import NewPostUnifiedSection from "../Components/NewPostComponents/NewPostUnifiedSection";

const NewPostScreen = ({ navigation, route }) => {
  const theme = useTheme();
  const dispatch = useDispatch();

  const getPostState = useSelector(selectGetPost);
  const getCommentState = useSelector(selectGetComment);

  const isLikeUpdated = useSelector(selectLikeUpdated);
  const isCommentUpdated = useSelector(selectCommentUpdated);

  const currentUser = useSelector(selectCurrentUser);

  // useEffect(() => {
  //   dispatch(getPostAction(route.params.post._id));

  //   return () => {
  //     //clean up function
  //   };
  // }, [dispatch, route.params.post._id, isLikeUpdated]);

  // useEffect(() => {
  //   dispatch(getCurrentUserAction());

  //   return () => {
  //     //clean up function
  //   };
  // }, [dispatch, route.params.post._id]);

  // useEffect(() => {
  //   dispatch(getCommentAction(route.params.post.comment._id));

  //   return () => {
  //     //clean up function
  //   };
  // }, [dispatch, route.params.post.comment._id, isCommentUpdated]);

  return getPostState && getPostState[0] && currentUser && currentUser._id ? (
    <ScrollView bg={theme.colors.sage[400]}>
      <NewPostUnifiedSection navigation={navigation} theme={theme} />
    </ScrollView>
  ) : (
    <ScrollView bg={theme.colors.sage[400]}>
      <Stack safeArea>
        <Text>Loading...</Text>
      </Stack>
    </ScrollView>
  );
};

export default NewPostScreen;
