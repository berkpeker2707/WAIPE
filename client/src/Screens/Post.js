import React, { useEffect, useState } from "react";
import {
  ScrollView,
  Box,
  Divider,
  useTheme,
  Spinner,
  useSafeArea,
} from "native-base";
import { useDispatch, useSelector } from "react-redux";

import {
  getPostAction,
  selectGetPost,
  selectPostLoading,
} from "../Redux/Slices/postSlice";
import {
  getCommentAction,
  selectCommentUpdated,
  selectGetComment,
} from "../Redux/Slices/commentSlice";
import { selectLikeUpdated } from "../Redux/Slices/likeSlice";

import PostImageSection from "../Components/PostComponents/PostImageSection";
import PostImageLikeSection from "../Components/PostComponents/PostImageLikeSection";
import PostAddCommentSection from "../Components/PostComponents/PostAddCommentSection";
import PostViewCommentSection from "../Components/PostComponents/PostViewCommentSection";
import {
  getCurrentUserAction,
  selectCurrentUser,
} from "../Redux/Slices/userSlice";

const PostScreen = ({ navigation, route }) => {
  const theme = useTheme();
  const dispatch = useDispatch();

  const getPostState = useSelector(selectGetPost);
  const getCommentState = useSelector(selectGetComment);

  const isLikeUpdated = useSelector(selectLikeUpdated);
  const isCommentUpdated = useSelector(selectCommentUpdated);

  const currentUser = useSelector(selectCurrentUser);

  const postLoading = useSelector(selectPostLoading);

  useEffect(() => {
    const controller = new AbortController();

    dispatch(getPostAction(route.params.post._id));

    return () => {
      controller.abort();
    };
  }, [dispatch, route.params.post._id, isLikeUpdated]);

  useEffect(() => {
    const controller = new AbortController();

    dispatch(getCurrentUserAction());

    return () => {
      controller.abort();
    };
  }, [dispatch, route.params.post._id]);

  useEffect(() => {
    const controller = new AbortController();

    dispatch(getCommentAction(route.params.post.comment._id));

    return () => {
      controller.abort();
    };
  }, [dispatch, route.params.post.comment._id, isCommentUpdated]);

  const safeAreaProps = useSafeArea({
    safeArea: true,
    pt: 2,
  });

  return getPostState &&
    getPostState[0] &&
    currentUser &&
    currentUser._id &&
    getCommentState &&
    !postLoading ? (
    <ScrollView bg={theme.colors.sage[400]}>
      {/* image section starts */}
      <PostImageSection
        navigation={navigation}
        theme={theme}
        getPostState={getPostState}
      />
      {/* image section ends */}

      {/* like section 1 starts */}
      <PostImageLikeSection
        navigation={navigation}
        theme={theme}
        getPostState={getPostState}
      />
      {/* like section 1 ends */}

      <Box alignItems="center">
        <Divider bg={theme.colors.forestGreen[400]} mt="5" mb="5" w="60%" />
      </Box>

      {/* comment section 1 starts */}
      <PostAddCommentSection
        navigation={navigation}
        theme={theme}
        getPostState={getPostState}
        getCommentState={getCommentState}
      />
      {/* comment section 1 ends */}

      {/* comment section 2 starts */}
      <PostViewCommentSection
        navigation={navigation}
        theme={theme}
        getCommentState={getCommentState}
        currentUserID={currentUser._id}
      />
      {/* comment section 2 ends */}
    </ScrollView>
  ) : (
    <ScrollView
      bg={theme.colors.sage[400]}
      {...safeAreaProps}
      contentContainerStyle={{ flexGrow: 1, justifyContent: "center" }}
    >
      <Spinner color={"mustard.400"} size="lg" />
    </ScrollView>
  );
};

export default PostScreen;
