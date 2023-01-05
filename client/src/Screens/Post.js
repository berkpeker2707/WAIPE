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
import LikeHeartIcon from "../Components/Icons/LikeHeartIcon";
import ProfileIcon from "../Components/Icons/ProfileIcon";
import AddCommentIcon from "../Components/Icons/AddCommentIcon";
import SendMessageIcon from "../Components/Icons/SendMessageIcon";

import CuteCatEnvelopeIcon from "../Components/Icons/CuteCatEnvelopeIcon";

import ReportIcon from "../Components/Icons/ReportIcon";
import BookmarkIcon from "../Components/Icons/BookmarkIcon";
import { useDispatch, useSelector } from "react-redux";
import { getPostAction, selectGetPost } from "../Redux/Slices/postSlice";
import {
  getCommentAction,
  selectGetComment,
} from "../Redux/Slices/commentSlice";

const PostScreen = ({ navigation, route }) => {
  const theme = useTheme();
  const dispatch = useDispatch();

  const getPostState = useSelector(selectGetPost);
  const getCommentState = useSelector(selectGetComment);

  console.log("getCommentState");
  console.log(getCommentState);
  console.log("getCommentState");

  useEffect(() => {
    dispatch(getPostAction(route.params.post._id));
  }, [dispatch, route.params.post._id]);

  useEffect(() => {
    dispatch(getCommentAction(route.params.post.comment._id));
  }, [dispatch, route.params.post.comment._id]);

  ///BELOW
  useEffect(() => {
    setPostState(route.params.post);
  }, [route.params.post]);

  useEffect(() => {
    setOnLongPressState(false);
    setCommentOpenState(false);
  }, [postState]);

  const [postState, setPostState] = useState(route.params.post);
  const [commentState, setCommentState] = useState(route.params.post);

  const [onLongPressState, setOnLongPressState] = useState(false);
  const [commentOpenState, setCommentOpenState] = useState(false);

  return postState ? (
    <ScrollView bg={theme.colors.sage[400]}>
      {/* image section starts */}
      <Box safeAreaTop ml={7} mr={7}>
        <Pressable
          onLongPress={() => {
            onLongPressState
              ? setOnLongPressState(false)
              : setOnLongPressState(true);
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
                  mt="40%"
                >
                  <AspectRatio w="100%" ratio={1 / 1}>
                    <Image
                      source={{
                        uri: postState.picture,
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
                        <Pressable>
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
                                    <ReportIcon
                                      color={theme.colors.sage[300]}
                                    />
                                  }
                                />
                              </Circle>
                            );
                          }}
                        </Pressable>
                        <Pressable>
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
                        </Pressable>
                        <Pressable>
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
      {/* image section ends */}

      {/* like section 1 starts */}
      <Stack alignItems="center" p="3">
        <HStack space={12} justifyContent="space-between">
          <HStack alignItems="center">
            <Pressable>
              {({ isHovered, isFocused, isPressed }) => {
                return (
                  <Circle
                    size="30px"
                    bg={theme.colors.forestGreen[400]}
                    style={{
                      transform: [{ scale: isPressed ? 0.96 : 1 }],
                    }}
                  >
                    <Icon as={<CuteCatEnvelopeIcon />} />
                  </Circle>
                );
              }}
            </Pressable>
            <Pressable>
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
                      as={<LikeHeartIcon color={theme.colors.sage[300]} />}
                    />
                  </Circle>
                );
              }}
            </Pressable>
            <Pressable>
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
                      as={<LikeHeartIcon color={theme.colors.sage[300]} />}
                    />
                  </Circle>
                );
              }}
            </Pressable>
            <Pressable>
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
                      as={<LikeHeartIcon color={theme.colors.sage[300]} />}
                    />
                  </Circle>
                );
              }}
            </Pressable>
            <Pressable>
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
                      as={<LikeHeartIcon color={theme.colors.sage[300]} />}
                    />
                  </Circle>
                );
              }}
            </Pressable>
          </HStack>
          <Pressable>
            {({ isHovered, isFocused, isPressed }) => {
              return (
                <HStack
                  style={{
                    transform: [{ scale: isPressed ? 0.96 : 1 }],
                  }}
                >
                  <Center
                    _text={{
                      color: "black",
                      fontWeight: "bold",
                    }}
                  >
                    {postState.petID.name ?? ""}
                  </Center>
                  <Pressable>
                    {({ isHovered, isFocused, isPressed }) => {
                      return (
                        <Circle
                          size="30px"
                          bg={theme.colors.forestGreen[400]}
                          style={{
                            transform: [{ scale: isPressed ? 0.96 : 1 }],
                          }}
                        >
                          <Avatar
                            bg="green.500"
                            alignSelf="center"
                            size="xs"
                            source={{
                              uri: postState.petID.picture ?? "",
                            }}
                          >
                            {postState.petID.name ?? ""}
                          </Avatar>
                          {/* <Icon as={<ProfileIcon name="Profile" />} /> */}
                        </Circle>
                      );
                    }}
                  </Pressable>
                </HStack>
              );
            }}
          </Pressable>
        </HStack>
        <HStack>
          <HStack alignItems="center">
            <Center
              _text={{
                color: theme.colors.singletons["black"],
                fontWeight: "normal",
              }}
            >
              {postState.postDescription ?? ""}
            </Center>
          </HStack>
        </HStack>
      </Stack>
      {/* like section 1 ends */}

      <Box alignItems="center">
        <Divider bg={theme.colors.forestGreen[400]} mt="5" mb="5" w="60%" />
      </Box>

      {/* like section 2 starts */}
      <Stack alignItems="center" p="3">
        <Box>
          <VStack alignItems="center">
            <Pressable
              onPress={() =>
                commentOpenState
                  ? setCommentOpenState(false)
                  : setCommentOpenState(true)
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
      {/* like section 2 ends */}

      {/* comment section starts */}
      <Stack alignItems="center" m="2" bg={theme.colors.sage[300]}>
        <VStack
          style={
            commentOpenState ? theme.commentOpenStyle : theme.commentClosedStyle
          }
        >
          <TextArea h={20} placeholder="Add a comment..." />
          <Pressable>
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
        {getCommentState &&
          getCommentState[0].comment.map(
            (getCommentStateInfo, getCommentStateIndex) => {
              return (
                <Stack
                  flex="1"
                  width="100%"
                  key={getCommentStateIndex}
                  bg={theme.colors.sage[400]}
                  safeAreaBottom
                  safeAreaLeft
                  safeAreaRight
                >
                  {/* <Stack direction="row" space={3}> */}
                  <Pressable>
                    {({ isHovered, isFocused, isPressed }) => {
                      return (
                        <HStack
                          style={{
                            transform: [{ scale: isPressed ? 0.96 : 1 }],
                          }}
                        >
                          <Circle
                            size="30px"
                            bg={theme.colors.forestGreen[400]}
                          >
                            <Icon
                              as={
                                <ProfileIcon
                                  name="Profile"
                                  color={theme.colors.sage[300]}
                                />
                              }
                            />
                          </Circle>
                          <Center
                            _text={{
                              color: theme.colors.singletons["white"],
                              fontWeight: "bold",
                            }}
                          >
                            {getCommentStateInfo?.ownerID?.firstname}
                          </Center>
                        </HStack>
                      );
                    }}
                  </Pressable>
                  <HStack>
                    <Text bg={theme.colors.singletons["white"]}>
                      {getCommentStateInfo.commentText}
                    </Text>
                  </HStack>
                  {/* </Stack> */}
                </Stack>
              );
            }
          )}
      </Stack>
      {/* comment section ends */}
    </ScrollView>
  ) : (
    <Text>Loading...</Text>
  );
};

export default PostScreen;
