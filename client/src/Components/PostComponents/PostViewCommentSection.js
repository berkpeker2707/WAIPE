import React, { useEffect, useMemo, useState } from "react";
import { View, StyleSheet, ImageBackground } from "react-native";
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
import { deletePostAction } from "../../Redux/Slices/postSlice";

export default function PostViewCommentSection(props) {
  const { theme, getPostState, getCommentState } = props;

  const dispatch = useDispatch();

  const [onLongPressState, setOnLongPressState] = useState(() => false);
  const [selectedItemID, setSelectedItemID] = useState(() => null);

  //   console.log(getCommentState.ownerID._id);
  console.log(selectedItemID);
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
                <Pressable
                  onLongPress={() => {
                    onLongPressState
                      ? (setOnLongPressState(() => false),
                        setSelectedItemID(() => null))
                      : (setOnLongPressState(() => true),
                        setSelectedItemID(() => getCommentStateInfo._id));
                  }}
                  // dispatch(
                  //   deletePostAction({
                  //   parentCommentID: getCommentState[0]._id,
                  //   commentText: commentTextState,
                  //   })
                  // );
                >
                  {({ isHovered, isFocused, isPressed }) => {
                    return (
                      <>
                        <HStack
                          style={{
                            transform: [{ scale: isPressed ? 0.96 : 1 }],
                          }}
                        >
                          <Circle
                            size="30px"
                            bg={theme.colors.forestGreen[400]}
                          >
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

                        {/* Report and Bookmark Starts */}
                        <Pressable
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
                          onLongPress={() => {
                            onLongPressState
                              ? setOnLongPressState(() => false)
                              : setOnLongPressState(() => true);
                          }}
                        >
                          {({ isHovered, isFocused, isPressed }) => {
                            return (
                              <HStack
                                // borderWidth="1"
                                // borderRadius="lg"
                                // borderColor={theme.colors.sage[300]}
                                // p="2"
                                // bg={theme.colors.sage[300]}
                                style={{
                                  transform: [{ scale: isPressed ? 0.96 : 1 }],
                                  opacity:
                                    selectedItemID ===
                                      getCommentStateInfo._id &&
                                    onLongPressState
                                      ? 1
                                      : 0,
                                  zIndex:
                                    selectedItemID ===
                                      getCommentStateInfo._id &&
                                    onLongPressState
                                      ? 1
                                      : -1,
                                }}
                              >
                                <Pressable
                                  m="1"
                                  onPress={() =>
                                    console.log("Pressed report button")
                                  }
                                >
                                  {({ isHovered, isFocused, isPressed }) => {
                                    return (
                                      <Circle
                                        size="30px"
                                        bg={theme.colors.forestGreen[400]}
                                        style={{
                                          transform: [
                                            { scale: isPressed ? 0.96 : 1 },
                                          ],
                                        }}
                                      >
                                        <Icon
                                          as={
                                            <ReportIcon
                                              color={theme.colors.sage[300]}
                                            />
                                          }
                                        />
                                      </Circle>
                                    );
                                  }}
                                </Pressable>
                                <Pressable
                                  m="1"
                                  onPress={() => {
                                    dispatch(
                                      archivePostAction({
                                        postID: getPostState[0]._id,
                                      })
                                    );
                                  }}
                                >
                                  {({ isHovered, isFocused, isPressed }) => {
                                    return (
                                      <Circle
                                        size="30px"
                                        bg={theme.colors.forestGreen[400]}
                                        style={{
                                          transform: [
                                            { scale: isPressed ? 0.96 : 1 },
                                          ],
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
                            );
                          }}
                        </Pressable>
                        {/* Report and Bookmark Ends */}

                        <HStack
                          ml={8}
                          pt={1}
                          pb={1}
                          bg={theme.colors.sage[300]}
                          borderWidth="1"
                          borderRadius="xs"
                          borderColor={theme.colors.sage[300]}
                          style={{
                            transform: [{ scale: isPressed ? 0.96 : 1 }],
                            opacity:
                              selectedItemID === getCommentStateInfo._id &&
                              onLongPressState
                                ? 0.4
                                : 1,
                            zIndex:
                              selectedItemID === getCommentStateInfo._id &&
                              onLongPressState
                                ? -1
                                : 1,
                          }}
                        >
                          <Text color={theme.colors.forestGreen[400]}>
                            {getCommentStateInfo.commentText}
                          </Text>
                        </HStack>
                      </>
                    );
                  }}
                </Pressable>
              </Stack>
            );
          }
        )}
    </Stack>
  );
}
