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
} from "native-base";
import LikeHeartIcon from "../Components/Icons/LikeHeartIcon";
import ProfileIcon from "../Components/Icons/ProfileIcon";

const PostScreen = ({ navigation, route }) => {
  const [postState, setPostState] = useState(route?.params?.post);

  // useEffect(() => {
  //   s;
  // }, [postState]);

  const safeAreaProps = useSafeArea({
    safeAreaTop: true,
    pt: 2,
  });

  return postState ? (
    <ScrollView {...safeAreaProps}>
      <Box alignItems="center">
        <Box
          maxW="80"
          rounded="lg"
          overflow="hidden"
          borderColor="#3a6b35"
          borderWidth="1"
        >
          <AspectRatio w="100%" ratio={1 / 1}>
            <Image
              source={{
                uri: postState.postImage,
              }}
              alt="image"
              style={{ padding: 10 }}
            />
          </AspectRatio>
        </Box>
        <Box>
          <Stack p="3" space={5}>
            <HStack space={12} justifyContent="space-between">
              <HStack alignItems="center">
                <Circle size="30px" bg="#3a6b35">
                  <Icon as={<LikeHeartIcon />} color="black" />
                </Circle>
                <Circle size="30px" bg="#3a6b35">
                  <Icon as={<LikeHeartIcon />} color="white" />
                </Circle>
                <Circle size="30px" bg="#3a6b35">
                  <Icon as={<LikeHeartIcon />} color="white" />
                </Circle>
                <Circle size="30px" bg="#3a6b35">
                  <Icon as={<LikeHeartIcon />} color="white" />
                </Circle>
                <Circle size="30px" bg="#3a6b35">
                  <Icon as={<LikeHeartIcon />} color="white" />
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
                    fontWeight: "bold",
                  }}
                >
                  {postState.postDescription ?? ""}
                  {"\n" + postState._id}
                </Center>
              </HStack>
            </HStack>
            <Box>
              <Divider my={1} />
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

const styles = StyleSheet.create({});

export default PostScreen;
