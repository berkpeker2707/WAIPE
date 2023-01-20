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

// import {
//   archivePostAction,
//   getPostAction,
//   selectGetPost,
//   selectPostUpdated,
// } from "../Redux/Slices/postSlice";
// import {
//   getCommentAction,
//   selectCommentUpdated,
//   selectGetComment,
//   updateCommentAction,
// } from "../Redux/Slices/commentSlice";
// import {
//   selectLikeUpdated,
//   selectUpdatePostLike,
//   updatePostLikeAction,
// } from "../Redux/Slices/likeSlice";

export default function PostViewCommentSection(props) {
  const { theme, getPostState, getCommentState } = props;

  const dispatch = useDispatch();

  return (
    <Stack
      alignItems="center"
      ml={7}
      mr={7}
      bg={theme.colors.forestGreen[400]}
      borderRadius="2xl"
    >
      {getCommentState &&
        getCommentState[0].comment.map(
          (getCommentStateInfo, getCommentStateIndex) => {
            return (
              <Stack
                flex="1"
                width="100%"
                key={uuid.v4()}
                bg={theme.colors.sage[400]}
                safeAreaBottom
                safeAreaLeft
                safeAreaRight
              >
                <Pressable>
                  {({ isHovered, isFocused, isPressed }) => {
                    return (
                      <HStack
                        style={{
                          transform: [{ scale: isPressed ? 0.96 : 1 }],
                        }}
                      >
                        <Circle size="30px" bg={theme.colors.forestGreen[400]}>
                          <Avatar
                            bg={theme.colors.forestGreen[400]}
                            alignSelf="center"
                            size="xs"
                            source={{
                              uri: getCommentStateInfo.ownerID.picture ?? "",
                            }}
                          >
                            {getPostState[0].petID.name ?? ""}
                          </Avatar>
                        </Circle>
                        <Center
                          _text={{
                            color: theme.colors.forestGreen[400],
                            fontWeight: "bold",
                          }}
                          ml={1}
                        >
                          {getCommentStateInfo?.ownerID?.firstname}
                        </Center>
                      </HStack>
                    );
                  }}
                </Pressable>
                <HStack
                  ml={8}
                  pt={1}
                  pb={1}
                  bg={theme.colors.sage[300]}
                  borderWidth="1"
                  borderRadius="xs"
                  borderColor={theme.colors.sage[300]}
                >
                  <Text color={theme.colors.forestGreen[400]}>
                    {getCommentStateInfo.commentText}
                  </Text>
                </HStack>
              </Stack>
            );
          }
        )}
    </Stack>
  );
}
