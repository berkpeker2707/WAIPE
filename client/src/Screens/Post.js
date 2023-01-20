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
import {
  selectLikeUpdated,
  selectUpdatePostLike,
  updatePostLikeAction,
} from "../Redux/Slices/likeSlice";

import PostImageSection from "../Components/PostComponents/PostImageSection";
import PostImageLikeSection from "../Components/PostComponents/PostImageLikeSection";
import PostAddCommentSection from "../Components/PostComponents/PostAddCommentSection";
import PostViewCommentSection from "../Components/PostComponents/PostViewCommentSection";

const PostScreen = ({ navigation, route }) => {
  const theme = useTheme();
  const dispatch = useDispatch();

  const getPostState = useSelector(selectGetPost);
  const getCommentState = useSelector(selectGetComment);
  // const updatePostLikeState = useSelector(selectUpdatePostLike);
  const [likeState, setLikeState] = useState([getPostState]);
  const isLikeUpdated = useSelector(selectLikeUpdated);
  const isPostUpdated = useSelector(selectPostUpdated);
  const isCommentUpdated = useSelector(selectCommentUpdated);

  useEffect(() => {
    dispatch(getPostAction(route.params.post._id));
  }, [dispatch, route.params.post._id, isLikeUpdated]);

  useEffect(() => {
    dispatch(getCommentAction(route.params.post.comment._id));
  }, [dispatch, route.params.post.comment._id, isCommentUpdated]);

  // useEffect(() => {
  //   setLikeState([getPostState[0].like.like]);
  // }, [dispatch, route.params.post.comment._id, getPostState, isLikeUpdated]);

  // useEffect(() => {
  //   setOnLongPressState(false);
  //   setCommentOpenState(false);
  // }, [getPostState[0]]);

  // const [commentTextState, setCommentTextState] = useState("");

  // const [onLongPressState, setOnLongPressState] = useState(false);
  // const [commentOpenState, setCommentOpenState] = useState(false);
  return getPostState[0] ? (
    <ScrollView bg={theme.colors.sage[400]}>
      {/* image section starts */}
      <PostImageSection theme={theme} getPostState={getPostState} />
      {/* image section ends */}

      {/* like section 1 starts */}
      <PostImageLikeSection theme={theme} getPostState={getPostState} />
      {/* like section 1 ends */}

      <Box alignItems="center">
        <Divider bg={theme.colors.forestGreen[400]} mt="5" mb="5" w="60%" />
      </Box>

      {/* comment section 1 starts */}
      <PostAddCommentSection
        theme={theme}
        getPostState={getPostState}
        getCommentState={getCommentState}
      />
      {/* comment section 1 ends */}

      {/* comment section 2 starts */}
      <PostViewCommentSection
        theme={theme}
        getPostState={getPostState}
        getCommentState={getCommentState}
      />
      {/* comment section 2 ends */}
    </ScrollView>
  ) : (
    <Text>Loading...</Text>
  );
};

export default PostScreen;
