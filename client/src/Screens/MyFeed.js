import React, { useEffect, useState } from "react";
import {
  ScrollView,
  Center,
  Text,
  Image,
  Box,
  Pressable,
  Icon,
  useTheme,
  Stack,
  AspectRatio,
  HStack,
  Circle,
  Divider,
  Spinner,
  useDisclose,
} from "native-base";

import { useDispatch, useSelector } from "react-redux";
import {
  selectGetFollowedPosts,
  getFollowedPostsAction,
  selectPostLoading,
} from "../Redux/Slices/postSlice";
import uuid from "react-native-uuid";

import ReportIcon from "../Components/Icons/ReportIcon";
import BookmarkIcon from "../Components/Icons/BookmarkIcon";
import { postPostReportAction } from "../Redux/Slices/reportSlice";
import { selectCurrentUser } from "../Redux/Slices/userSlice";
import ReportActionsheet from "../Components/ReportActionsheet";

const MyFeedScreen = ({ navigation, route }) => {
  const theme = useTheme();
  const dispatch = useDispatch();

  const currentUser = useSelector(selectCurrentUser);
  const followedPosts = useSelector(selectGetFollowedPosts);
  const postLoading = useSelector(selectPostLoading);

  useEffect(() => {
    const controller = new AbortController();

    dispatch(getFollowedPostsAction());

    return () => {
      controller.abort();
    };
  }, [dispatch]);

  const [onLongPressState, setOnLongPressState] = useState(() => false);
  const [onLongPressItemState, setOnLongPressItemState] = useState(() => null);
  const { isOpen, onOpen, onClose } = useDisclose();

  const handleReport = (reportSubject, post) => {
    dispatch(
      postPostReportAction({
        reportSubject: reportSubject,
        postID: post._id,
        petID: post.petID._id,
        picture: post.picture,
        postDescription: post.postDescription,
        reporter: currentUser._id,
      })
    );
    onClose();
  };

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

  return !postLoading ? (
    followedPosts ? (
      <ScrollView bg={theme.colors.sage[400]}>
        {followedPosts.map((fP, followedPostsIndex) => {
          return (
            <Box key={uuid.v4()} ml={7} mr={7} mt={7} style={theme.postShadow}>
              <ReportActionsheet
                isOpen={isOpen}
                onClose={onClose}
                handleReport={handleReport}
                post={fP}
              />
              <Pressable
                onPress={() => {
                  navigation.navigate("Post", {
                    post: fP,
                  });
                }}
                onLongPress={() => {
                  onLongPressState
                    ? (setOnLongPressState(() => false),
                      setOnLongPressItemState(() => null))
                    : (setOnLongPressState(() => true),
                      setOnLongPressItemState(() => fP._id));
                }}
              >
                <Box
                  maxW="100%"
                  rounded="3xl"
                  overflow="hidden"
                  borderColor={
                    onLongPressItemState === fP._id && onLongPressState
                      ? "#E38E48"
                      : theme.colors.forestGreen[400]
                  }
                  borderWidth="3.5"
                >
                  <AspectRatio w="100%" ratio={1 / 1}>
                    {fP.picture.includes(".mp4") ||
                    fP.picture.includes(".avi") ||
                    fP.picture.includes(".mov") ? (
                      <Image
                        source={{
                          uri: fP.picture
                            ? fP.picture
                                .replace(/.mp4/g, ".jpg")
                                .replace(/.avi/g, ".jpg")
                                .replace(/.mov/g, ".jpg")
                            : null,
                        }}
                        alt="image"
                        blurRadius={
                          onLongPressItemState === fP._id && onLongPressState
                            ? 50
                            : 0
                        }
                      />
                    ) : (
                      <Image
                        source={{
                          uri: fP.picture ? fP.picture : null,
                        }}
                        alt="image"
                        blurRadius={
                          onLongPressItemState === fP._id && onLongPressState
                            ? 50
                            : 0
                        }
                      />
                    )}
                  </AspectRatio>

                  {onLongPressItemState === fP._id && onLongPressState ? (
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
                          alignItems="center"
                          textAlign="center"
                          justifyContent="center"
                          onPress={() =>
                            navigation.navigate("Post", {
                              post: fP,
                            })
                          }
                        >
                          {({ isHovered, isFocused, isPressed }) => {
                            return (
                              <Center
                                _text={{
                                  color: "black",
                                  fontWeight: "normal",
                                }}
                                style={{
                                  transform: [{ scale: isPressed ? 0.96 : 1 }],
                                }}
                              >
                                {fP.petID.name ?? ""}
                              </Center>
                            );
                          }}
                        </Pressable>
                        <Pressable
                          mr={1}
                          onPress={() => {
                            onOpen();
                            // dispatch(postPostReportAction())
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
                                    <ReportIcon
                                      color={theme.colors.sage[300]}
                                    />
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
              </Pressable>
            </Box>
          );
        })}
        <Box alignItems="center">
          <Divider bg={theme.colors.sage[300]} mt="5" mb="5" w="60%" />
        </Box>
      </ScrollView>
    ) : (
      <ScrollView bg={theme.colors.sage[400]}>
        <Stack safeArea>
          <Text>You don't follow any cuties :(</Text>
        </Stack>
      </ScrollView>
    )
  ) : (
    <ScrollView
      bg={theme.colors.sage[400]}
      contentContainerStyle={{ flexGrow: 1, justifyContent: "center" }}
    >
      <Spinner color={"mustard.400"} size="lg" />
    </ScrollView>
  );
};

export default MyFeedScreen;
