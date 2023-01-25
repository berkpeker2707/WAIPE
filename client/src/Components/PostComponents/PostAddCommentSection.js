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

export default function PostAddCommentSection(props) {
  const { theme, getPostState, getCommentState } = props;

  const dispatch = useDispatch();

  useEffect(() => {
    setOnLongPressState(() => false);
    setCommentOpenState(() => false);

    return () => {
      //clean up function
    };
  }, [getPostState[0]]);

  const [commentTextState, setCommentTextState] = useState(() => "");

  const [onLongPressState, setOnLongPressState] = useState(() => false);
  const [commentOpenState, setCommentOpenState] = useState(() => false);

  return (
    <>
      <Stack alignItems="center" p="3">
        <Box>
          <VStack alignItems="center">
            <Pressable
              onPress={() =>
                commentOpenState
                  ? setCommentOpenState(() => false)
                  : setCommentOpenState(() => true)
              }
              rounded="8"
              overflow="hidden"
              bg={theme.colors.sage[400]}
            >
              <Circle size="30px">
                <Icon
                  as={<AddCommentIcon color={theme.colors.forestGreen[400]} />}
                />
              </Circle>
            </Pressable>
          </VStack>
        </Box>
      </Stack>

      <Stack
        alignItems="center"
        ml={7}
        mr={7}
        mb={2}
        bg={theme.colors.sage[300]}
        borderRadius="2xl"
      >
        <VStack
          overflow="hidden"
          bg={theme.colors.sage[300]}
          borderRadius="2xl"
          borderColor={theme.colors.sage[300]}
          style={
            commentOpenState ? theme.commentOpenStyle : theme.commentClosedStyle
          }
        >
          <TextArea
            h={20}
            _focus={{
              bg: theme.colors.singletons["white"],
              borderColor: theme.colors.sage[300],
            }}
            placeholder="Add a comment..."
            value={commentTextState}
            onChangeText={(commentTextState) =>
              setCommentTextState(() => commentTextState)
            }
          />
          <Pressable
            onPress={() => {
              dispatch(
                updateCommentAction({
                  parentCommentID: getCommentState[0]._id,
                  commentText: commentTextState,
                })
              );
              setCommentOpenState(() => false);
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
                    as={
                      <SendMessageIcon
                        name="SendMessageIcon"
                        color={theme.colors.sage[300]}
                      />
                    }
                  />
                </Circle>
              );
            }}
          </Pressable>
        </VStack>
      </Stack>
    </>
  );
}
