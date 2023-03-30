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

  const currentUser = useSelector(selectCurrentUser);

  useEffect(() => {
    dispatch(getCurrentUserAction());

    return () => {
      //clean up function
    };
  }, [dispatch]);

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
      <Stack>
        <Text>Loading...</Text>
      </Stack>
    </ScrollView>
  );
};

export default NewPostScreen;
