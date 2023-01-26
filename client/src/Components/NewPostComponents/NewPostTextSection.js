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

export default function NewPostTextSection(props) {
  const { navigation, theme } = props;

  const dispatch = useDispatch();

  const [newPostTextState, setNewPostTextState] = useState(() => "");

  return (
    <>
      <Stack
        alignItems="center"
        ml={7}
        mr={7}
        mb={2}
        mt={2}
        bg={theme.colors.sage[300]}
        borderRadius="2xl"
      >
        <VStack
          overflow="hidden"
          bg={theme.colors.sage[300]}
          borderRadius="2xl"
          borderColor={theme.colors.sage[300]}
          style={theme.commentOpenStyle}
          // m="2"
        >
          <TextArea
            h={20}
            _focus={{
              bg: theme.colors.singletons["white"],
              borderColor: theme.colors.sage[300],
            }}
            placeholder="Add a comment..."
            value={newPostTextState}
            onChangeText={(newPostTextState) =>
              setNewPostTextState(() => newPostTextState)
            }
          />
        </VStack>
      </Stack>
      <HStack
        alignItems="center"
        textAlign="center"
        justifyContent="center"
        p="2"
        bg={theme.colors.sage[400]}
      >
        <Button
          colorScheme="danger"
          onPress={() => console.log("I AM CLICKED... HELP ME!")}
          borderRadius="50"
          bg={theme.colors.forestGreen[400]}
        >
          Publish
        </Button>
      </HStack>
    </>
  );
}
