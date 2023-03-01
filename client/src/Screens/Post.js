import React, { useEffect } from "react";
import { ScrollView, Box, Text, Stack, Divider, useTheme } from "native-base";
import { useDispatch, useSelector } from "react-redux";

import { getPostAction, selectGetPost } from "../Redux/Slices/postSlice";
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

  useEffect(() => {
    dispatch(getPostAction(route.params.post._id));

    return () => {
      //clean up function
    };
  }, [dispatch, route.params.post._id, isLikeUpdated]);

  useEffect(() => {
    dispatch(getCurrentUserAction());

    return () => {
      //clean up function
    };
  }, [dispatch, route.params.post._id]);

  useEffect(() => {
    dispatch(getCommentAction(route.params.post.comment._id));

    return () => {
      //clean up function
    };
  }, [dispatch, route.params.post.comment._id, isCommentUpdated]);

  return getPostState && getPostState[0] && currentUser && currentUser._id ? (
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
        <Divider bg={theme.colors.forestGreen[400]} mt="5" w="60%" />
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
    <ScrollView bg={theme.colors.sage[400]}>
      <Stack safeArea>
        <Text>Loading...</Text>
      </Stack>
    </ScrollView>
  );
};

export default PostScreen;
