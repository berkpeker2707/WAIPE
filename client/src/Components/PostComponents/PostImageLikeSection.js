import React, { useEffect, useState, memo } from "react";

import {
  HStack,
  Stack,
  Circle,
  Icon,
  Center,
  Pressable,
  Avatar,
} from "native-base";

import uuid from "react-native-uuid";
import LikeHeartIcon from "../Icons/LikeHeartIcon";
import CuteCatFeverCoffeeIcon from "../Icons/CuteCatFeverCoffeeIcon";
import CuteCowSurprisedIcon from "../Icons/CuteCowSurprisedIcon";
import CuteRabbitHoldingCarrotIcon from "../Icons/CuteRabbitHoldingCarrotIcon";
import CuteSadCatSittingIcon from "../Icons/CuteSadCatSittingIcon";

import { useDispatch, useSelector } from "react-redux";

import {
  selectLikeUpdated,
  updatePostLikeAction,
} from "../../Redux/Slices/likeSlice";
import LottieHeart from "../AnimationComponents/LottieHeart";

const PostImageLikeSection = memo(function PostImageLikeSection(props) {
  const { navigation, theme, getPostState, currentUser } = props;

  const [animationStart, setAnimationStart] = useState(() => false);

  const dispatch = useDispatch();

  const isLikeUpdated = useSelector(selectLikeUpdated);

  const [likeState, setLikeState] = useState(() => [getPostState]);

  useEffect(() => {
    setLikeState(() => [getPostState[0].like.like]);

    return () => {
      //clean up function
    };
  }, [dispatch, getPostState, isLikeUpdated]);

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

  return (
    <Stack alignItems="center" p="3">
      <HStack space={12} justifyContent="space-between">
        <HStack alignItems="center">
          {likeState.map((likeStateInfo, likeStateIndex) => {
            return (
              <HStack key={uuid.v4()}>
                <Pressable
                  mr={1}
                  onPress={() => {
                    dispatch(
                      updatePostLikeAction({
                        likeID: getPostState[0].like._id,
                        likeType: "heart",
                      })
                    );
                    setAnimationStart(() => true);
                  }}
                >
                  {({ isHovered, isFocused, isPressed }) => {
                    return (
                      <>
                        {!isLikeUpdated &&
                        currentUser &&
                        likeStateInfo.some((likeStateSingle) => {
                          return (
                            likeStateSingle["likeType"] === "heart" &&
                            likeStateSingle.ownerID === currentUser._id
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
                                  <LikeHeartIcon
                                    color={theme.colors.sage[300]}
                                  />
                                }
                              />
                              <LottieHeart animationStart={animationStart} />
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
                    setAnimationStart(() => true);
                  }}
                >
                  {({ isHovered, isFocused, isPressed }) => {
                    return (
                      <>
                        {!isLikeUpdated &&
                        currentUser &&
                        likeStateInfo.some((likeStateSingle) => {
                          return (
                            likeStateSingle["likeType"] ===
                              "cuteCatFeverCoffeeIcon" &&
                            likeStateSingle.ownerID === currentUser._id
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
                              <LottieHeart animationStart={animationStart} />
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
                    setAnimationStart(() => true);
                  }}
                >
                  {({ isHovered, isFocused, isPressed }) => {
                    return (
                      <>
                        {!isLikeUpdated &&
                        currentUser &&
                        likeStateInfo.some((likeStateSingle) => {
                          return (
                            likeStateSingle["likeType"] ===
                              "cuteCowSurprisedIcon" &&
                            likeStateSingle.ownerID === currentUser._id
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
                              <LottieHeart animationStart={animationStart} />
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
                    setAnimationStart(() => true);
                  }}
                >
                  {({ isHovered, isFocused, isPressed }) => {
                    return (
                      <>
                        {!isLikeUpdated &&
                        currentUser &&
                        likeStateInfo.some((likeStateSingle) => {
                          return (
                            likeStateSingle["likeType"] ===
                              "cuteRabbitHoldingCarrotIcon" &&
                            likeStateSingle.ownerID === currentUser._id
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
                              <LottieHeart animationStart={animationStart} />
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
                    setAnimationStart(() => true);
                  }}
                >
                  {({ isHovered, isFocused, isPressed }) => {
                    return (
                      <>
                        {!isLikeUpdated &&
                        currentUser &&
                        likeStateInfo.some((likeStateSingle) => {
                          return (
                            likeStateSingle["likeType"] ===
                              "cuteSadCatSittingIcon" &&
                            likeStateSingle.ownerID === currentUser._id
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
                              <LottieHeart animationStart={animationStart} />
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
                <Pressable
                  onPress={() =>
                    navigation.navigate("MyPetProfile", {
                      petId: getPostState[0].petID._id,
                    })
                  }
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
                        <Avatar
                          bg="green.500"
                          alignSelf="center"
                          size="xs"
                          source={{
                            uri: getPostState[0].petID.picture
                              ? getPostState[0].petID.picture
                              : null,
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
  );
});

export default PostImageLikeSection;
