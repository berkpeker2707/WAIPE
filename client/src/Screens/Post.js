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
import AddCommentIcon from "../Components/Icons/AddCommentIcon";
import SendMessageIcon from "../Components/Icons/SendMessageIcon";
import CuteCatFeverCoffeeIcon from "../Components/Icons/CuteCatFeverCoffeeIcon";
import CuteCowSurprisedIcon from "../Components/Icons/CuteCowSurprisedIcon";
import CuteRabbitHoldingCarrotIcon from "../Components/Icons/CuteRabbitHoldingCarrotIcon";
import CuteSadCatSittingIcon from "../Components/Icons/CuteSadCatSittingIcon";

import ReportIcon from "../Components/Icons/ReportIcon";
import BookmarkIcon from "../Components/Icons/BookmarkIcon";
import { useDispatch, useSelector } from "react-redux";
import { getPostAction, selectGetPost } from "../Redux/Slices/postSlice";
import {
  getCommentAction,
  selectGetComment,
} from "../Redux/Slices/commentSlice";
import {
  selectUpdatePostLike,
  updatePostLikeAction,
} from "../Redux/Slices/likeSlice";

const PostScreen = ({ navigation, route }) => {
  const theme = useTheme();
  const dispatch = useDispatch();

  const getPostState = useSelector(selectGetPost);
  const getCommentState = useSelector(selectGetComment);
  const updatePostLikeState = useSelector(selectUpdatePostLike);
  const [likeState, setLikeState] = useState([getPostState]);

  useEffect(() => {
    dispatch(getPostAction(route.params.post._id));
  }, [dispatch, route.params.post._id]);

  useEffect(() => {
    dispatch(getCommentAction(route.params.post.comment._id));
  }, [dispatch, route.params.post.comment._id]);

  useEffect(() => {
    setLikeState([getPostState[0].like.like]);
  }, [dispatch, route.params.post.comment._id, getPostState]);

  useEffect(() => {
    setOnLongPressState(false);
    setCommentOpenState(false);
  }, [getPostState[0]]);

  const [onLongPressState, setOnLongPressState] = useState(false);
  const [commentOpenState, setCommentOpenState] = useState(false);

  //checking number of like types
  function findOcc(arr, key) {
    let arr2 = [];

    arr.forEach((x) => {
      // Checking if there is any object in arr2
      // which contains the key value
      if (
        arr2.some((val) => {
          return val[key] == x[key];
        })
      ) {
        // If yes! then increase the occurrence by 1
        arr2.forEach((k) => {
          if (k[key] === x[key]) {
            k["occurrence"]++;
          }
        });
      } else {
        // If not! Then create a new object initialize
        // it with the present iteration key's value and
        // set the occurrence to 1
        let a = {};
        a[key] = x[key];
        a["occurrence"] = 1;
        arr2.push(a);
      }
    });

    return arr2;
  }

  var likeNumbers = findOcc(likeState[0], "likeType");

  var numOfHeart = likeNumbers.find(
    (occur) => occur.likeType === "heart"
  )?.occurrence;
  var numOfCuteCatFeverCoffeeIcon = likeNumbers.find(
    (occur) => occur.likeType === "cuteCatFeverCoffeeIcon"
  )?.occurrence;
  var numOfCuteCowSurprisedIcon = likeNumbers.find(
    (occur) => occur.likeType === "cuteCowSurprisedIcon"
  )?.occurrence;
  var numOfCuteRabbitHoldingCarrotIcon = likeNumbers.find(
    (occur) => occur.likeType === "cuteRabbitHoldingCarrotIcon"
  )?.occurrence;
  var numOfCuteSadCatSittingIcon = likeNumbers.find(
    (occur) => occur.likeType === "cuteSadCatSittingIcon"
  )?.occurrence;

  // console.log(getPostState[0].like._id);

  return getPostState[0] ? (
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
                >
                  <AspectRatio w="100%" ratio={1 / 1}>
                    <Image
                      source={{
                        uri: getPostState[0].picture,
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
            {likeState.map((likeStateInfo, likeStateIndex) => {
              return (
                <HStack key={likeStateIndex}>
                  <Pressable
                    mr={1}
                    onPress={() => {
                      dispatch(
                        updatePostLikeAction({
                          likeID: getPostState[0].like._id,
                          likeType: "heart",
                        })
                      );
                    }}
                  >
                    {({ isHovered, isFocused, isPressed }) => {
                      return (
                        <>
                          {likeStateInfo.some((likeStateSingle) => {
                            return likeStateSingle["likeType"] === "heart";
                          }) ? (
                            <>
                              <Circle
                                size="30px"
                                bg={theme.colors.forestGreen[400]}
                                style={{
                                  transform: [{ scale: isPressed ? 0.96 : 1 }],
                                }}
                              >
                                <Icon
                                  as={
                                    <LikeHeartIcon
                                      color={theme.colors.sage[300]}
                                    />
                                  }
                                />
                              </Circle>
                              <Center
                                _text={{
                                  color: theme.colors.extraOrage[400],
                                  fontWeight: "bold",
                                }}
                                mr={1}
                              >
                                {numOfHeart ?? ""}
                              </Center>
                            </>
                          ) : (
                            <>
                              <Circle
                                size="30px"
                                bg={theme.colors.muted[600]}
                                style={{
                                  transform: [{ scale: isPressed ? 0.96 : 1 }],
                                }}
                              >
                                <Icon
                                  as={
                                    <LikeHeartIcon
                                      color={theme.colors.sage[300]}
                                    />
                                  }
                                />
                              </Circle>
                            </>
                          )}
                        </>
                      );
                    }}
                  </Pressable>

                  <Pressable
                    mr={1}
                    onPress={() => {
                      dispatch(
                        updatePostLikeAction({
                          likeID: getPostState[0].like._id,
                          likeType: "cuteCatFeverCoffeeIcon",
                        })
                      );
                    }}
                  >
                    {({ isHovered, isFocused, isPressed }) => {
                      return (
                        <>
                          {likeStateInfo.some((likeStateSingle) => {
                            return (
                              likeStateSingle["likeType"] ===
                              "cuteCatFeverCoffeeIcon"
                            );
                          }) ? (
                            <>
                              <Circle
                                size="30px"
                                bg={theme.colors.forestGreen[400]}
                                style={{
                                  transform: [{ scale: isPressed ? 0.96 : 1 }],
                                }}
                              >
                                <Icon
                                  as={
                                    <CuteCatFeverCoffeeIcon
                                      color={theme.colors.sage[300]}
                                    />
                                  }
                                />
                              </Circle>
                              <Center
                                _text={{
                                  color: theme.colors.extraOrage[400],
                                  fontWeight: "bold",
                                }}
                                mr={1}
                              >
                                {numOfCuteCatFeverCoffeeIcon ?? ""}
                              </Center>
                            </>
                          ) : (
                            <>
                              <Circle
                                size="30px"
                                bg={theme.colors.muted[600]}
                                style={{
                                  transform: [{ scale: isPressed ? 0.96 : 1 }],
                                }}
                              >
                                <Icon
                                  as={
                                    <CuteCatFeverCoffeeIcon
                                      color={theme.colors.sage[300]}
                                    />
                                  }
                                />
                              </Circle>
                            </>
                          )}
                        </>
                      );
                    }}
                  </Pressable>

                  <Pressable
                    mr={1}
                    onPress={() => {
                      dispatch(
                        updatePostLikeAction({
                          likeID: getPostState[0].like._id,
                          likeType: "cuteCowSurprisedIcon",
                        })
                      );
                    }}
                  >
                    {({ isHovered, isFocused, isPressed }) => {
                      return (
                        <>
                          {likeStateInfo.some((likeStateSingle) => {
                            return (
                              likeStateSingle["likeType"] ===
                              "cuteCowSurprisedIcon"
                            );
                          }) ? (
                            <>
                              <Circle
                                size="30px"
                                bg={theme.colors.forestGreen[400]}
                                style={{
                                  transform: [{ scale: isPressed ? 0.96 : 1 }],
                                }}
                              >
                                <Icon
                                  as={
                                    <CuteCowSurprisedIcon
                                      color={theme.colors.sage[300]}
                                    />
                                  }
                                />
                              </Circle>
                              <Center
                                _text={{
                                  color: theme.colors.extraOrage[400],
                                  fontWeight: "bold",
                                }}
                                mr={1}
                              >
                                {numOfCuteCowSurprisedIcon ?? ""}
                              </Center>
                            </>
                          ) : (
                            <>
                              <Circle
                                size="30px"
                                bg={theme.colors.muted[600]}
                                style={{
                                  transform: [{ scale: isPressed ? 0.96 : 1 }],
                                }}
                              >
                                <Icon
                                  as={
                                    <CuteCowSurprisedIcon
                                      color={theme.colors.sage[300]}
                                    />
                                  }
                                />
                              </Circle>
                            </>
                          )}
                        </>
                      );
                    }}
                  </Pressable>

                  <Pressable
                    mr={1}
                    onPress={() => {
                      dispatch(
                        updatePostLikeAction({
                          likeID: getPostState[0].like._id,
                          likeType: "cuteRabbitHoldingCarrotIcon",
                        })
                      );
                    }}
                  >
                    {({ isHovered, isFocused, isPressed }) => {
                      return (
                        <>
                          {likeStateInfo.some((likeStateSingle) => {
                            return (
                              likeStateSingle["likeType"] ===
                              "cuteRabbitHoldingCarrotIcon"
                            );
                          }) ? (
                            <>
                              <Circle
                                size="30px"
                                bg={theme.colors.forestGreen[400]}
                                style={{
                                  transform: [{ scale: isPressed ? 0.96 : 1 }],
                                }}
                              >
                                <Icon
                                  as={
                                    <CuteRabbitHoldingCarrotIcon
                                      color={theme.colors.sage[300]}
                                    />
                                  }
                                />
                              </Circle>
                              <Center
                                _text={{
                                  color: theme.colors.extraOrage[400],
                                  fontWeight: "bold",
                                }}
                                mr={1}
                              >
                                {numOfCuteRabbitHoldingCarrotIcon ?? ""}
                              </Center>
                            </>
                          ) : (
                            <>
                              <Circle
                                size="30px"
                                bg={theme.colors.muted[600]}
                                style={{
                                  transform: [{ scale: isPressed ? 0.96 : 1 }],
                                }}
                              >
                                <Icon
                                  as={
                                    <CuteRabbitHoldingCarrotIcon
                                      color={theme.colors.sage[300]}
                                    />
                                  }
                                />
                              </Circle>
                            </>
                          )}
                        </>
                      );
                    }}
                  </Pressable>

                  <Pressable
                    mr={1}
                    onPress={() => {
                      dispatch(
                        updatePostLikeAction({
                          likeID: getPostState[0].like._id,
                          likeType: "cuteSadCatSittingIcon",
                        })
                      );
                    }}
                  >
                    {({ isHovered, isFocused, isPressed }) => {
                      return (
                        <>
                          {likeStateInfo.some((likeStateSingle) => {
                            return (
                              likeStateSingle["likeType"] ===
                              "cuteSadCatSittingIcon"
                            );
                          }) ? (
                            <>
                              <Circle
                                size="30px"
                                bg={theme.colors.forestGreen[400]}
                                style={{
                                  transform: [{ scale: isPressed ? 0.96 : 1 }],
                                }}
                              >
                                <Icon
                                  as={
                                    <CuteSadCatSittingIcon
                                      color={theme.colors.sage[300]}
                                    />
                                  }
                                />
                              </Circle>
                              <Center
                                _text={{
                                  color: theme.colors.extraOrage[400],
                                  fontWeight: "bold",
                                }}
                                mr={1}
                              >
                                {numOfCuteSadCatSittingIcon ?? ""}
                              </Center>
                            </>
                          ) : (
                            <>
                              <Circle
                                size="30px"
                                bg={theme.colors.muted[600]}
                                style={{
                                  transform: [{ scale: isPressed ? 0.96 : 1 }],
                                }}
                              >
                                <Icon
                                  as={
                                    <CuteSadCatSittingIcon
                                      color={theme.colors.sage[300]}
                                    />
                                  }
                                />
                              </Circle>
                            </>
                          )}
                        </>
                      );
                    }}
                  </Pressable>
                </HStack>
              );
            })}
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
                    mr={1}
                  >
                    {getPostState[0].petID.name ?? ""}
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
                              uri: getPostState[0].petID.picture ?? "",
                            }}
                          >
                            {getPostState[0].petID.name ?? ""}
                          </Avatar>
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
              {getPostState[0].postDescription ?? ""}
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
      {/* comment section 1 starts */}
      <Stack
        alignItems="center"
        ml={7}
        mr={7}
        mb={2}
        bg={theme.colors.sage[300]}
        borderRadius="2xl"
      >
        <VStack
          overflow="hidden"
          bg={theme.colors.sage[300]}
          borderRadius="2xl"
          borderColor={theme.colors.sage[300]}
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
      </Stack>
      {/* comment section 1 ends */}
      {/* comment section 2 starts */}
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
                  key={getCommentStateIndex}
                  bg={theme.colors.sage[400]}
                  safeAreaBottom
                  safeAreaLeft
                  safeAreaRight
                >
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
                            <Avatar
                              bg={theme.colors.forestGreen[400]}
                              alignSelf="center"
                              size="xs"
                              source={{
                                uri:
                                  getCommentStateInfo?.ownerID?.picture ?? "",
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
                      );
                    }}
                  </Pressable>
                  <HStack
                    ml={8}
                    pt={1}
                    pb={1}
                    bg={theme.colors.sage[300]}
                    borderWidth="1"
                    borderRadius="xs"
                    borderColor={theme.colors.sage[300]}
                  >
                    <Text color={theme.colors.forestGreen[400]}>
                      {getCommentStateInfo.commentText}
                    </Text>
                  </HStack>
                </Stack>
              );
            }
          )}
      </Stack>
      {/* comment section 2 ends */}
    </ScrollView>
  ) : (
    <Text>Loading...</Text>
  );
};

export default PostScreen;
