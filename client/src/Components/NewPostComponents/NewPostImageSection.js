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
import LikeHeartIcon from "../Icons/LikeHeartIcon";
import AddCommentIcon from "../Icons/AddCommentIcon";
import SendMessageIcon from "../Icons/SendMessageIcon";
import CuteCatFeverCoffeeIcon from "../Icons/CuteCatFeverCoffeeIcon";
import CuteCowSurprisedIcon from "../Icons/CuteCowSurprisedIcon";
import CuteRabbitHoldingCarrotIcon from "../Icons/CuteRabbitHoldingCarrotIcon";
import CuteSadCatSittingIcon from "../Icons/CuteSadCatSittingIcon";

import ReportIcon from "../Icons/ReportIcon";
import BookmarkIcon from "../Icons/BookmarkIcon";

import { useDispatch, useSelector } from "react-redux";

import {
  archivePostAction,
  getPostAction,
  selectGetPost,
  selectPostUpdated,
} from "../../Redux/Slices/postSlice";

import {
  getCommentAction,
  selectCommentUpdated,
  selectGetComment,
  updateCommentAction,
} from "../../Redux/Slices/commentSlice";
import {
  selectLikeUpdated,
  selectUpdatePostLike,
  updatePostLikeAction,
} from "../../Redux/Slices/likeSlice";

const palet = require("../../../assets/palet.png");

export default function NewPostImageSection(props) {
  const { navigation, theme } = props;

  const dispatch = useDispatch();

  const isPostUpdated = useSelector(selectPostUpdated);

  useEffect(() => {
    // return the function to unsubscribe from the event so it gets removed on unmount
    return () => {
      //clean up function
    };
  }, []);

  return (
    <Box safeAreaTop ml={7} mr={7}>
      <Box style={theme.postShadow}>
        <Box
          maxW="100%"
          rounded="3xl"
          overflow="hidden"
          borderColor={theme.colors.forestGreen[400]}
          borderWidth="3.5"
        >
          <AspectRatio w="100%" ratio={1 / 1}>
            <Image size="100%" source={palet} alt="image" />
          </AspectRatio>

          <Pressable
            onPress={() => {
              //   dispatch(
              //     updateCommentAction({
              //       parentCommentID: getCommentState[0]._id,
              //       commentText: commentTextState,
              //     })
              //   );
            }}
          >
            {({ isHovered, isFocused, isPressed }) => {
              return (
                <Circle
                  size="30px"
                  bg={theme.colors.forestGreen[400]}
                  style={{
                    margin: "auto",
                    position: "absolute",
                    bottom: 0,
                    right: 0,
                    transform: [{ scale: isPressed ? 0.96 : 1 }],
                  }}
                >
                  <Icon
                    as={<AddCommentIcon color={theme.colors.sage[400]} />}
                  />
                </Circle>
              );
            }}
          </Pressable>
        </Box>
      </Box>
    </Box>
  );
}
