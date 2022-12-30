import React, { useEffect, useMemo, useState } from "react";
import { View, StyleSheet } from "react-native";
import {
  ScrollView,
  useSafeArea,
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
  theme,
  useTheme,
} from "native-base";
import LikeHeartIcon from "../Components/Icons/LikeHeartIcon";
import ProfileIcon from "../Components/Icons/ProfileIcon";
import AddCommentIcon from "../Components/Icons/AddCommentIcon";
import SendMessageIcon from "../Components/Icons/SendMessageIcon";

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

  const safeAreaProps = useSafeArea({
    safeArea: true,
    pt: 2,
  });

  return postState ? (
    <ScrollView
      m="2"
      // {...safeAreaProps}
    >
      {/* image section starts */}
      <Stack alignItems="center">
        <Pressable
          onLongPress={() => {
            onLongPressState
              ? setOnLongPressState(false)
              : setOnLongPressState(true);
          }}
        >
          {({ isHovered, isFocused, isPressed }) => {
            return (
              <Box
                maxW="80"
                rounded="lg"
                overflow="hidden"
                borderColor={
                  isPressed ? "#E38E48" : theme.colors.forestGreen[400]
                }
                borderWidth="1"
              >
                <AspectRatio w="100%" ratio={1 / 1}>
                  <Image
                    source={{
                      uri: postState.picture,
                    }}
                    alt="image"
                    style={{ padding: 10 }}
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
                                  <ReportIcon color={theme.colors.sage[300]} />
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
            );
          }}
        </Pressable>
      </Stack>
      {/* image section ends */}

      {/* like section starts */}
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
                color: "black",
                fontWeight: "normal",
              }}
            >
              {postState.postDescription ?? ""}
            </Center>
          </HStack>
        </HStack>
        <Box>
          <VStack alignItems="center">
            <Divider my={1} />
            <Pressable
              onPress={() =>
                commentOpenState
                  ? setCommentOpenState(false)
                  : setCommentOpenState(true)
              }
              rounded="8"
              overflow="hidden"
              bg="coolGray.100"
            >
              <Circle size="30px">
                <Icon as={<AddCommentIcon color={theme.colors.sage[300]} />} />
              </Circle>
            </Pressable>
          </VStack>
        </Box>
      </Stack>
      {/* like section ends */}

      {/* comment section starts */}
      <Stack alignItems="center">
        <VStack
          safeAreaBottom
          safeAreaLeft
          safeAreaRight
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
                  bg="#3a6b"
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
                              color: "black",
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
                    <Text bg="#fff9">{getCommentStateInfo.commentText}</Text>
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
