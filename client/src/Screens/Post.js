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
} from "native-base";
import LikeHeartIcon from "../Components/Icons/LikeHeartIcon";
import ProfileIcon from "../Components/Icons/ProfileIcon";
import AddCommentIcon from "../Components/Icons/AddCommentIcon";
import SendMessageIcon from "../Components/Icons/SendMessageIcon";

import ReportIcon from "../Components/Icons/ReportIcon";
import BookmarkIcon from "../Components/Icons/BookmarkIcon";

const PostScreen = ({ navigation, route }) => {
  useEffect(() => {
    setPostState(route.params.post);
  }, [route.params.post]);

  useEffect(() => {
    setOnLongPressState(false);
    setCommentOpenState(false);
  }, [postState]);

  const [postState, setPostState] = useState(route.params.post);
  const [onLongPressState, setOnLongPressState] = useState(false);
  const [commentOpenState, setCommentOpenState] = useState(false);

  const safeAreaProps = useSafeArea({
    safeAreaTop: true,
    pt: 2,
  });

  return postState ? (
    <ScrollView {...safeAreaProps}>
      <Box alignItems="center">
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
                borderColor={isPressed ? "#E38E48" : "#3a6b35"}
                borderWidth="1"
              >
                <AspectRatio w="100%" ratio={1 / 1}>
                  <Image
                    source={{
                      uri: postState.postImage,
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
                      borderColor="#f3f3f3"
                      p="2"
                      bg="#f3f3f3"
                    >
                      <Circle size="30px" bg="#3a6b35">
                        <Icon as={<ReportIcon />} />
                      </Circle>
                      <Circle size="30px" bg="#3a6b35">
                        <Icon as={<SendMessageIcon />} />
                      </Circle>
                      <Circle size="30px" bg="#3a6b35">
                        <Icon as={<BookmarkIcon />} />
                      </Circle>
                    </HStack>
                  </HStack>
                ) : (
                  <></>
                )}
              </Box>
            );
          }}
        </Pressable>
        <Box>
          <Stack p="3" space={5}>
            <HStack space={12} justifyContent="space-between">
              <HStack alignItems="center">
                <Circle size="30px" bg="#3a6b35">
                  <Icon as={<LikeHeartIcon />} />
                </Circle>
                <Circle size="30px" bg="#3a6b35">
                  <Icon as={<LikeHeartIcon />} />
                </Circle>
                <Circle size="30px" bg="#3a6b35">
                  <Icon as={<LikeHeartIcon />} />
                </Circle>
                <Circle size="30px" bg="#3a6b35">
                  <Icon as={<LikeHeartIcon />} />
                </Circle>
                <Circle size="30px" bg="#3a6b35">
                  <Icon as={<LikeHeartIcon />} />
                </Circle>
              </HStack>
              <HStack alignItems="center">
                <Center
                  _text={{
                    color: "black",
                    fontWeight: "bold",
                  }}
                >
                  {"Lulu "}
                </Center>
                <Circle size="30px" bg="#3a6b35">
                  <Icon as={<ProfileIcon name="Profile" />} />
                </Circle>
              </HStack>
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
                    <Icon as={<AddCommentIcon />} />
                  </Circle>
                </Pressable>
              </VStack>
            </Box>
            <Box>
              <VStack
                style={
                  commentOpenState
                    ? styles.commentOpenStyle
                    : styles.commentClosedStyle
                }
              >
                <TextArea h={20} placeholder="Add a comment..." />
                <Circle
                  size="30px"
                  bg="#3a6b35"
                  alignItems={{
                    base: "center",
                    md: "flex-end",
                  }}
                >
                  <Icon as={<SendMessageIcon name="SendMessageIcon" />} />
                </Circle>
              </VStack>
            </Box>
            <HStack>
              <HStack style={{ flex: 1, flexWrap: "wrap" }}>
                <HStack>
                  <Circle size="30px" bg="#3a6b35">
                    <Icon as={<ProfileIcon name="Profile" />} />
                  </Circle>
                  <Center
                    _text={{
                      color: "black",
                      fontWeight: "bold",
                    }}
                  >
                    {" " + postState.postDescription ?? ""}
                  </Center>
                </HStack>
                <HStack>
                  <Text bg="#fff9">
                    Aenean quis efficitur orci. Nullam commodo sodales massa ac
                    tincidunt. Sed sagittis ac lacus et posuere. Aenean quis
                    efficitur orci.
                  </Text>
                </HStack>
              </HStack>
            </HStack>
            <HStack>
              <HStack style={{ flex: 1, flexWrap: "wrap" }}>
                <HStack>
                  <Circle size="30px" bg="#3a6b35">
                    <Icon as={<ProfileIcon name="Profile" />} />
                  </Circle>
                  <Center
                    _text={{
                      color: "black",
                      fontWeight: "bold",
                    }}
                  >
                    {" " + postState.postDescription ?? ""}
                  </Center>
                </HStack>
                <HStack>
                  <Text bg="#fff9">
                    Aenean quis efficitur orci. Nullam commodo sodales massa ac
                    tincidunt. Sed sagittis ac lacus et posuere. Aenean quis
                    efficitur orci.
                  </Text>
                </HStack>
              </HStack>
            </HStack>
            <HStack>
              <HStack style={{ flex: 1, flexWrap: "wrap" }}>
                <HStack>
                  <Circle size="30px" bg="#3a6b35">
                    <Icon as={<ProfileIcon name="Profile" />} />
                  </Circle>
                  <Center
                    _text={{
                      color: "black",
                      fontWeight: "bold",
                    }}
                  >
                    {" " + postState.postDescription ?? ""}
                  </Center>
                </HStack>
                <HStack>
                  <Text bg="#fff9">
                    Aenean quis efficitur orci. Nullam commodo sodales massa ac
                    tincidunt. Sed sagittis ac lacus et posuere. Aenean quis
                    efficitur orci.
                  </Text>
                </HStack>
              </HStack>
            </HStack>
          </Stack>
        </Box>
      </Box>
    </ScrollView>
  ) : (
    <Text>Loading...</Text>
  );
};

const styles = StyleSheet.create({
  commentOpenStyle: {
    display: "flex",
  },
  commentClosedStyle: {
    display: "none",
  },
});

export default PostScreen;
