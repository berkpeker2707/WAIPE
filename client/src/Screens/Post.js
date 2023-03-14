import React, { useEffect, useState } from "react";
import { ScrollView, Box, Divider, useTheme, useSafeArea } from "native-base";
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
import {
  getCurrentUserAction,
  selectCurrentUser,
} from "../Redux/Slices/userSlice";

import {
  getPostLikeAction,
  selectGetPostLike,
  selectLikeUpdatedBool,
} from "../Redux/Slices/likeSlice";

import PostImageSection from "../Components/PostComponents/PostImageSection";
import PostImageLikeSection from "../Components/PostComponents/PostImageLikeSection";
import PostAddCommentSection from "../Components/PostComponents/PostAddCommentSection";
import PostViewCommentSection from "../Components/PostComponents/PostViewCommentSection";

const PostScreen = ({ navigation, route }) => {
  const theme = useTheme();
  const dispatch = useDispatch();

  const getPostState = useSelector(selectGetPost);
  const getPostLikeState = useSelector(selectGetPostLike);

  const getCommentState = useSelector(selectGetComment);

  const isLikeUpdatedBool = useSelector(selectLikeUpdatedBool);
  const isCommentUpdated = useSelector(selectCommentUpdated);

  const currentUser = useSelector(selectCurrentUser);

  const postLoading = useSelector(selectPostLoading);

  useEffect(() => {
    const controller = new AbortController();

    dispatch(getPostAction(route.params.post._id));
    dispatch(getPostLikeAction(route.params.post._id));
    return () => {
      controller.abort();
    };
  }, [dispatch, route.params.post._id, isLikeUpdatedBool]);

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

  return (
    // && !postLoading
    <ScrollView {...safeAreaProps} bg={theme.colors.sage[400]}>
      {/* image section starts */}
      {getPostState && getPostState[0] ? (
        <PostImageSection
          navigation={navigation}
          theme={theme}
          getPostState={getPostState}
        />
      ) : (
        <></>
      )}

      {/* image section ends */}

      {/* like section 1 starts */}
      {getPostState && getPostState[0] && currentUser && currentUser._id ? (
        <PostImageLikeSection
          navigation={navigation}
          theme={theme}
          getPostState={getPostState}
          getPostLikeState={getPostLikeState}
          currentUser={currentUser}
        />
      ) : (
        <></>
      )}
      {/* like section 1 ends */}

      <Box alignItems="center">
        <Divider bg={theme.colors.forestGreen[400]} mt="5" w="60%" />
      </Box>

      {/* comment section 1 starts */}
      {getPostState && getPostState[0] && getCommentState ? (
        <PostAddCommentSection
          navigation={navigation}
          theme={theme}
          getPostState={getPostState}
          getCommentState={getCommentState}
        />
      ) : (
        <></>
      )}
      {/* comment section 1 ends */}

      {/* comment section 2 starts */}
      {currentUser && currentUser._id && getCommentState ? (
        <PostViewCommentSection
          navigation={navigation}
          theme={theme}
          getCommentState={getCommentState}
          currentUserID={currentUser._id}
        />
      ) : (
        <></>
      )}
      {/* comment section 2 ends */}
    </ScrollView>
  );
};

export default PostScreen;
