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
  Badge,
  Button,
  useTheme,
} from "native-base";

import LikeHeartIcon from "../Components/Icons/LikeHeartIcon";
import SendMessageIcon from "../Components/Icons/SendMessageIcon";

import ReportIcon from "../Components/Icons/ReportIcon";
import BookmarkIcon from "../Components/Icons/BookmarkIcon";
import { useDispatch, useSelector } from "react-redux";
import { selectPostPost, postPostAction } from "../Redux/Slices/postSlice";

const NewPostScreen = ({ navigation, route }) => {
  const theme = useTheme();
  const dispatch = useDispatch();

  const selectPostPostState = useSelector(selectPostPost);

  useEffect(() => {
    dispatch(postPostAction());
  }, [dispatch]);

  return (
    <ScrollView m="2" bg={theme.colors.sage[400]}>
      {/* image section starts */}
      <Stack alignItems="center" safeAreaBottom safeAreaLeft safeAreaRight>
        <Pressable
          onPress={() => {
            console.log("Pressed");
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
                  <Pressable>
                    {({ isHovered, isFocused, isPressed }) => {
                      <AspectRatio w="100%" ratio={1 / 1}>
                        <Circle
                          size="300px"
                          bg={theme.colors.forestGreen[400]}
                          style={{
                            transform: [{ scale: isPressed ? 0.96 : 1 }],
                          }}
                        >
                          <LikeHeartIcon color={theme.colors.sage[300]} />
                        </Circle>

                        {/* <Image
                      source={{
                        uri: getPostState[0].picture,
                      }}
                      alt="image"
                      blurRadius={onLongPressState ? 50 : 0}
                    /> */}
                      </AspectRatio>;
                    }}
                  </Pressable>
                </Box>
              </Box>
            );
          }}
        </Pressable>
      </Stack>
      {/* image section ends */}

      {/* post description starts */}
      <Stack>
        <HStack>
          <HStack alignItems="center">
            <Center
              _text={{
                color: "black",
                fontWeight: "normal",
              }}
            >
              Enter here
            </Center>
          </HStack>
        </HStack>
        <Box>
          <VStack alignItems="center">
            <Divider my={1} />
            <Pressable
              onPress={() => console.log("TEST")}
              rounded="8"
              overflow="hidden"
              bg="coolGray.100"
            >
              <Circle size="30px">
                <Icon as={<LikeHeartIcon color={theme.colors.sage[300]} />} />
              </Circle>
              <Box alignItems="center">
                <Button onPress={() => console.log("hello world")}>
                  Click Me
                </Button>
              </Box>
            </Pressable>
          </VStack>
        </Box>
      </Stack>
      {/* post description ends */}
    </ScrollView>
  );
};

export default NewPostScreen;
