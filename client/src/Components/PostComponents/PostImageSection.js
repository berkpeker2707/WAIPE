import React, { useEffect, useState, memo } from "react";
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

const PostImageSection = memo(function PostImageSection(props) {
  const { navigation, theme, getPostState } = props;

  const dispatch = useDispatch();

  const isPostUpdated = useSelector(selectPostUpdated);

  const [onLongPressState, setOnLongPressState] = useState(() => false);

  //check if screen is changed and reset booleans
  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      setOnLongPressState(() => false);
    });

    // return the function to unsubscribe from the event so it gets removed on unmount
    return () => {
      //clean up function
      unsubscribe;
    };
  }, []);

  return (
    <Box safeAreaTop mt={3} ml={7} mr={7}>
      <Pressable
        onLongPress={() => {
          onLongPressState
            ? setOnLongPressState(() => false)
            : setOnLongPressState(() => true);
        }}
      >
        {({ isHovered, isFocused, isPressed }) => {
          return (
            <Box style={theme.postShadow}>
              <Box
                maxW="100%"
                rounded="3xl"
                overflow="hidden"
                borderColor={
                  isPressed ? "#E38E48" : theme.colors.forestGreen[400]
                }
                borderWidth="3.5"
              >
                <AspectRatio w="100%" ratio={1 / 1}>
                  <Image
                    source={{
                      uri: getPostState[0].picture,
                    }}
                    alt="image"
                    blurRadius={onLongPressState ? 50 : 0}
                  />
                </AspectRatio>
                {onLongPressState ? (
                  <HStack
                    alignItems="center"
                    textAlign="center"
                    justifyContent="center"
                    style={{
                      margin: "auto",
                      position: "absolute",
                      top: 0,
                      bottom: 0,
                      left: 0,
                      right: 0,
                    }}
                  >
                    <HStack
                      borderWidth="1"
                      borderRadius="lg"
                      borderColor={theme.colors.sage[300]}
                      p="2"
                      bg={theme.colors.sage[300]}
                    >
                      <Pressable
                        mr={1}
                        onPress={() => console.log("Pressed report button")}
                      >
                        {({ isHovered, isFocused, isPressed }) => {
                          return (
                            <Circle
                              size="30px"
                              bg={theme.colors.forestGreen[400]}
                              style={{
                                transform: [{ scale: isPressed ? 0.96 : 1 }],
                              }}
                            >
                              <Icon
                                as={
                                  <ReportIcon color={theme.colors.sage[300]} />
                                }
                              />
                            </Circle>
                          );
                        }}
                      </Pressable>
                      {/* <Pressable mr={1}>
                        {({ isHovered, isFocused, isPressed }) => {
                          return (
                            <Circle
                              size="30px"
                              bg={theme.colors.forestGreen[400]}
                              style={{
                                transform: [{ scale: isPressed ? 0.96 : 1 }],
                              }}
                            >
                              <Icon
                                as={
                                  <SendMessageIcon
                                    color={theme.colors.sage[300]}
                                  />
                                }
                              />
                            </Circle>
                          );
                        }}
                      </Pressable> */}
                      <Pressable
                        onPress={() => {
                          dispatch(
                            archivePostAction({ postID: getPostState[0]._id })
                          );
                          setOnLongPressState(() => false);
                        }}
                      >
                        {({ isHovered, isFocused, isPressed }) => {
                          return (
                            <Circle
                              size="30px"
                              bg={theme.colors.forestGreen[400]}
                              style={{
                                transform: [{ scale: isPressed ? 0.96 : 1 }],
                              }}
                            >
                              <Icon
                                as={
                                  <BookmarkIcon
                                    color={theme.colors.sage[300]}
                                  />
                                }
                              />
                            </Circle>
                          );
                        }}
                      </Pressable>
                    </HStack>
                  </HStack>
                ) : (
                  <></>
                )}
              </Box>
            </Box>
          );
        }}
      </Pressable>
    </Box>
  );
});

export default PostImageSection;
