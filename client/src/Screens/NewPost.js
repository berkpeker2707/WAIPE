import React, { useEffect } from "react";
import { ScrollView, Text, Stack, useTheme } from "native-base";

import { useDispatch, useSelector } from "react-redux";

import {
  getCurrentUserAction,
  selectCurrentUser,
} from "../Redux/Slices/userSlice";

import NewPostUnifiedSection from "../Components/NewPostComponents/NewPostUnifiedSection";

const NewPostScreen = ({ navigation, route }) => {
  const theme = useTheme();
  const dispatch = useDispatch();

  // const getPostState = useSelector(selectGetPost);
  // const getCommentState = useSelector(selectGetComment);

  // const isLikeUpdated = useSelector(selectLikeUpdated);
  // const isCommentUpdated = useSelector(selectCommentUpdated);

  const currentUser = useSelector(selectCurrentUser);

  // useEffect(() => {
  //   dispatch(getPostAction(route.params.post._id));

  //   return () => {
  //     //clean up function
  //   };
  // }, [dispatch, route.params.post._id, isLikeUpdated]);

  useEffect(() => {
    dispatch(getCurrentUserAction());

    return () => {
      //clean up function
    };
  }, [dispatch]);

  // useEffect(() => {
  //   dispatch(getCommentAction(route.params.post.comment._id));

  //   return () => {
  //     //clean up function
  //   };
  // }, [dispatch, route.params.post.comment._id, isCommentUpdated]);

  return currentUser && currentUser._id ? (
    <ScrollView bg={theme.colors.sage[400]}>
      <NewPostUnifiedSection
        navigation={navigation}
        theme={theme}
        currentUser={currentUser}
      />
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
