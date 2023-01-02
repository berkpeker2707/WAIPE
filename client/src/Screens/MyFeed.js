import React, { useEffect, useMemo, useState } from "react";
import {
  ScrollView,
  Center,
  Text,
  Button,
  Image,
  Box,
  useSafeArea,
  Pressable,
  VStack,
  Input,
  Icon,
  useTheme,
  Stack,
  AspectRatio,
  HStack,
  Circle,
  Divider,
} from "native-base";
import { useDispatch, useSelector } from "react-redux";
import {
  selectGetFollowedPosts,
  getFollowedPostsAction,
} from "../Redux/Slices/postSlice";

import SendMessageIcon from "../Components/Icons/SendMessageIcon";

import ReportIcon from "../Components/Icons/ReportIcon";
import BookmarkIcon from "../Components/Icons/BookmarkIcon";

const MyFeedScreen = ({ navigation, route }) => {
  const theme = useTheme();
  const dispatch = useDispatch();

  const followedPosts = useSelector(selectGetFollowedPosts);

  useEffect(() => {
    dispatch(getFollowedPostsAction());
  }, [dispatch]);

  useEffect(() => {
    setOnLongPressState(false);
  }, [followedPosts]);

  const [onLongPressState, setOnLongPressState] = useState(false);
  const [onLongPressItemState, setOnLongPressItemState] = useState(null);

  return followedPosts ? (
    <ScrollView bg={theme.colors.sage[400]}>
      {followedPosts.map((fP, followedPostsIndex) => {
        return (
          <Box key={followedPostsIndex} safeAreaTop ml={7} mr={7}>
            <Pressable
              onPress={() => {
                navigation.navigate("Post", {
                  post: fP,
                });
              }}
              onLongPress={() => {
                onLongPressState
                  ? (setOnLongPressState(false), setOnLongPressItemState(null))
                  : (setOnLongPressState(true),
                    setOnLongPressItemState(fP._id));
              }}
            >
              <Box
                key={followedPostsIndex}
                maxW="100%"
                rounded="lg"
                overflow="hidden"
                borderColor={
                  onLongPressItemState === fP._id && onLongPressState
                    ? "#E38E48"
                    : theme.colors.forestGreen[400]
                }
                borderWidth="1.5"
              >
                <AspectRatio w="100%" ratio={1 / 1}>
                  <Image
                    source={{
                      uri: fP.picture,
                    }}
                    alt="image"
                    blurRadius={
                      onLongPressItemState === fP._id && onLongPressState
                        ? 50
                        : 0
                    }
                  />
                </AspectRatio>

                {onLongPressItemState === fP._id ? (
                  <HStack
                    alignItems="center"
                    textAlign="center"
                    justifyContent="center"
                    style={{
                      margin: "auto",
                      position: "absolute",
                      bottom: 0,
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
            </Pressable>
          </Box>
        );
      })}
      <Box alignItems="center">
        <Divider bg={theme.colors.sage[300]} mt="5" mb="5" w="60%" />
      </Box>
    </ScrollView>
  ) : (
    <Text>You don't follow any cuties :(</Text>
  );
};

export default MyFeedScreen;
