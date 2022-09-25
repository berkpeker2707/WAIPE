import React, { useEffect, useMemo, useState } from "react";
import { View, StyleSheet } from "react-native";
import {
  ScrollView,
  useSafeArea,
  Box,
  AspectRatio,
  Image,
  Text,
  HStack,
  Stack,
} from "native-base";

const PostScreen = ({ navigation, route }) => {
  const [postState, setPostState] = useState(route.params.post);

  console.log("postState");
  console.log(postState);
  console.log("postState");

  const safeAreaProps = useSafeArea({
    safeAreaTop: true,
    pt: 2,
  });

  return (
    <ScrollView {...safeAreaProps}>
      <Box alignItems="center">
        <Box
          maxW="80"
          rounded="lg"
          overflow="hidden"
          borderColor="coolGray.200"
          borderWidth="1"
          _dark={{
            borderColor: "coolGray.600",
            backgroundColor: "gray.700",
          }}
          _web={{
            shadow: 2,
            borderWidth: 0,
          }}
          _light={{
            backgroundColor: "gray.50",
          }}
        >
          <Box>
            <AspectRatio w="100%" ratio={1 / 1}>
              <Image
                source={{
                  uri: postState[0].postImage,
                }}
                alt="image"
                style={{ padding: 10 }}
              />
            </AspectRatio>
          </Box>
          <Stack p="4" space={3}>
            <Stack space={2}>
              <Text
                fontSize="xs"
                _light={{
                  color: "violet.500",
                }}
                _dark={{
                  color: "violet.400",
                }}
                fontWeight="500"
                ml="-0.5"
                mt="-1"
              >
                My Cat's Cute Post
              </Text>
            </Stack>
            <Text fontWeight="400">
              Look at that cutie pie, she likes kisses and purrrrfect lap times.
              She hated lap time first, but now she just can't get enough. So
              glad I've found her. My life is complete. :)
            </Text>
            <HStack
              alignItems="center"
              space={4}
              justifyContent="space-between"
            >
              <HStack alignItems="center">
                <Text
                  color="coolGray.600"
                  _dark={{
                    color: "warmGray.200",
                  }}
                  fontWeight="400"
                >
                  6 mins ago
                </Text>
              </HStack>
            </HStack>
          </Stack>
        </Box>
      </Box>
    </ScrollView>
  );
};

const styles = StyleSheet.create({});

export default PostScreen;
