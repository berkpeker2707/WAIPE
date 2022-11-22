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

  console.log("postState");
  console.log(postState);
  console.log("postState");

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
                  uri: postState.postImage,
                }}
                alt="image"
                style={{ padding: 10 }}
              />
            </AspectRatio>
          </Box>
        </Box>
        <Stack p="4" space={3}>
          <Text fontWeight="400">{postState.postDescription ?? ""}</Text>
          <HStack alignItems="center" space={4} justifyContent="space-between">
            <HStack alignItems="center">
              <Circle size="40px" bg="secondary.400">
                <Icon
                  as={<LikeHeartIcon name="add" size={26} />}
                  color="white"
                  size={5}
                />
              </Circle>
              <Circle size="40px" bg="secondary.400">
                <Icon
                  as={<LikeHeartIcon name="add" size={26} />}
                  color="white"
                  size={5}
                />
              </Circle>
              <Circle size="40px" bg="secondary.400">
                <Icon
                  as={<LikeHeartIcon name="add" size={26} />}
                  color="white"
                  size={5}
                />
              </Circle>
              <Circle size="40px" bg="secondary.400">
                <Icon
                  as={<LikeHeartIcon name="add" size={26} />}
                  color="white"
                  size={5}
                />
              </Circle>
              <Circle size="40px" bg="secondary.400">
                <Icon
                  as={<LikeHeartIcon name="add" size={26} />}
                  color="white"
                  size={5}
                />
              </Circle>
            </HStack>
            <HStack alignItems="center">
              <Center
                bg="primary.400"
                _text={{
                  color: "white",
                  fontWeight: "bold",
                }}
              >
                {postState.postDescription ?? ""}
              </Center>
              <Circle size="40px" bg="secondary.400">
                <Icon
                  as={<ProfileIcon name="Profile" size={26} />}
                  color="white"
                  size={5}
                />
              </Circle>
            </HStack>
          </HStack>
          <HStack>
            <HStack alignItems="center">
              <Center
                bg="primary.400"
                _text={{
                  color: "white",
                  fontWeight: "bold",
                }}
              >
                {postState.postDescription ?? ""}
              </Center>
            </HStack>
          </HStack>
          <Box>
            <Divider my={1} />
          </Box>
          <HStack>
            <HStack style={{ flex: 1, flexWrap: "wrap" }} space={2}>
              <HStack>
                <Circle size="40px" bg="secondary.400">
                  <Icon
                    as={<ProfileIcon name="Profile" size={26} />}
                    color="white"
                    size={5}
                  />
                </Circle>
                <Center
                  bg="primary.400"
                  _text={{
                    color: "white",
                    fontWeight: "bold",
                  }}
                >
                  {postState.postDescription ?? ""}
                </Center>
              </HStack>
              <HStack>
                <Text bg="primary.400">
                  Aenean quis efficitur orci. Nullam commodo sodales massa ac
                  tincidunt. Sed sagittis ac lacus et posuere. Aenean quis
                  efficitur orci.
                </Text>
              </HStack>
            </HStack>
          </HStack>
          <HStack>
            <HStack style={{ flex: 1, flexWrap: "wrap" }} space={2}>
              <HStack>
                <Circle size="40px" bg="secondary.400">
                  <Icon
                    as={<ProfileIcon name="Profile" size={26} />}
                    color="white"
                    size={5}
                  />
                </Circle>
                <Center
                  bg="primary.400"
                  _text={{
                    color: "white",
                    fontWeight: "bold",
                  }}
                >
                  {postState.postDescription ?? ""}
                </Center>
              </HStack>
              <HStack>
                <Text bg="primary.400">
                  Aenean quis efficitur orci. Nullam commodo sodales massa ac
                  tincidunt. Sed sagittis ac lacus et posuere. Aenean quis
                  efficitur orci.
                </Text>
              </HStack>
            </HStack>
          </HStack>
          <HStack>
            <HStack style={{ flex: 1, flexWrap: "wrap" }} space={2}>
              <HStack>
                <Circle size="40px" bg="secondary.400">
                  <Icon
                    as={<ProfileIcon name="Profile" size={26} />}
                    color="white"
                    size={5}
                  />
                </Circle>
                <Center
                  bg="primary.400"
                  _text={{
                    color: "white",
                    fontWeight: "bold",
                  }}
                >
                  {postState.postDescription ?? ""}
                </Center>
              </HStack>
              <HStack>
                <Text bg="primary.400">
                  Aenean quis efficitur orci. Nullam commodo sodales massa ac
                  tincidunt. Sed sagittis ac lacus et posuere. Aenean quis
                  efficitur orci.
                </Text>
              </HStack>
            </HStack>
          </HStack>
        </Stack>
      </Box>
    </ScrollView>
  ) : (
    <Text>Loading...</Text>
  );
};

const styles = StyleSheet.create({});

export default PostScreen;
