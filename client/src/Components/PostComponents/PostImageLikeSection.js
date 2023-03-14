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
  selectLikeUpdatedBool,
  selectLike1UpdatedBool,
  selectLike2UpdatedBool,
  selectLike3UpdatedBool,
  selectLike4UpdatedBool,
  selectLike5UpdatedBool,
  updatePostLike1Action,
  updatePostLike2Action,
  updatePostLike3Action,
  updatePostLike4Action,
  updatePostLike5Action,
} from "../../Redux/Slices/likeSlice";
import LottieHeart from "../AnimationComponents/LottieHeart";
import LottieRain from "../AnimationComponents/LottieRain";
import LottieSteam from "../AnimationComponents/LottieSteam";
import LottieQuestion from "../AnimationComponents/LottieQuestion";
import LottieSparkle from "../AnimationComponents/LottieSparkle";

const PostImageLikeSection = memo(function PostImageLikeSection(props) {
  const { navigation, theme, getPostState, getPostLikeState, currentUser } =
    props;

  console.log("getPostLikeState");
  console.log(getPostLikeState);
  console.log("getPostLikeState");

  const dispatch = useDispatch();

  useEffect(() => {
    setLikeState(() => [getPostState[0].like.like]);
  }, [dispatch, getPostState]);

  const isLikeUpdatedBool = useSelector(selectLikeUpdatedBool);
  const isLike1UpdatedBool = useSelector(selectLike1UpdatedBool);
  const isLike2UpdatedBool = useSelector(selectLike2UpdatedBool);
  const isLike3UpdatedBool = useSelector(selectLike3UpdatedBool);
  const isLike4UpdatedBool = useSelector(selectLike4UpdatedBool);
  const isLike5UpdatedBool = useSelector(selectLike5UpdatedBool);

  // const updatePostLike = useSelector(selectUpdatePostLike);
  // const updatePostLike1 = useSelector(selectUpdatePostLike1);
  // const updatePostLike2 = useSelector(selectUpdatePostLike2);
  // const updatePostLike3 = useSelector(selectUpdatePostLike3);
  // const updatePostLike4 = useSelector(selectUpdatePostLike4);
  // const updatePostLike5 = useSelector(selectUpdatePostLike5);

  const [likeState, setLikeState] = useState(() => [getPostState]);

  // function findOcc(arr, key) {
  //   let arr2 = [];

  //   arr.forEach((x) => {
  //     // Checking if there is any object in arr2
  //     // which contains the key value
  //     if (
  //       arr2.some((val) => {
  //         return val[key] == x[key];
  //       })
  //     ) {
  //       // If yes! then increase the occurrence by 1
  //       arr2.forEach((k) => {
  //         if (k[key] === x[key]) {
  //           k["occurrence"]++;
  //         }
  //       });
  //     } else {
  //       // If not! Then create a new object initialize
  //       // it with the present iteration key's value and
  //       // set the occurrence to 1
  //       let a = {};
  //       a[key] = x[key];
  //       a["occurrence"] = 1;
  //       arr2.push(a);
  //     }
  //   });

  //   return arr2;
  // }

  // var likeNumbers = findOcc(likeState[0], "likeType");

  // const [numOfHeartState, setNumOfHeartState] = useState(
  //   likeNumbers?.find((occur) => occur?.likeType === "heart")?.occurrence
  // );

  // const [
  //   numOfCuteCatFeverCoffeeIconState,
  //   setNumOfCuteCatFeverCoffeeIconState,
  // ] = useState(0);
  // const [numOfCuteCowSurprisedIconState, setNumOfCuteCowSurprisedIconState] =
  //   useState(0);
  // const [
  //   numOfCuteRabbitHoldingCarrotIconState,
  //   setNumOfCuteRabbitHoldingCarrotIconState,
  // ] = useState(0);
  // const [numOfCuteSadCatSittingIconState, setNumOfCuteSadCatSittingIconState] =
  //   useState(0);

  // useEffect(() => {
  //   setLikeState(() => [getPostState[0].like.like]);

  //   return () => {
  //     //clean up function
  //   };
  // }, [dispatch, getPostState, isLikeUpdatedBool]);

  // useEffect(() => {
  //   // setNumOfHeartState(
  //   //   likeNumbers?.find((occur) => occur?.likeType === "heart")?.occurrence
  //   // );
  //   setNumOfCuteCatFeverCoffeeIconState(
  //     likeNumbers?.find((occur) => occur?.likeType === "cuteCatFeverCoffeeIcon")
  //       ?.occurrence
  //   );
  //   setNumOfCuteCowSurprisedIconState(
  //     likeNumbers?.find((occur) => occur?.likeType === "cuteCowSurprisedIcon")
  //       ?.occurrence
  //   );
  //   setNumOfCuteRabbitHoldingCarrotIconState(
  //     likeNumbers?.find(
  //       (occur) => occur?.likeType === "cuteRabbitHoldingCarrotIcon"
  //     )?.occurrence
  //   );
  //   setNumOfCuteSadCatSittingIconState(
  //     likeNumbers?.find((occur) => occur?.likeType === "cuteSadCatSittingIcon")
  //       ?.occurrence
  //   );
  // }, []);

  return currentUser ? (
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
                      updatePostLike1Action({
                        likeID: getPostState[0].like._id,
                        likeType: "heart",
                      })
                    );
                  }}
                >
                  {({ isHovered, isFocused, isPressed }) => {
                    return (
                      <>
                        {!isLike1UpdatedBool &&
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
                              <LottieHeart
                                isLike1UpdatedBool={isLike1UpdatedBool}
                              />
                            </Circle>
                            <Center
                              _text={{
                                color: theme.colors.extraOrage[400],
                                fontWeight: "bold",
                              }}
                              mr={1}
                            >
                              {getPostLikeState && getPostLikeState.heart}
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
                              {getPostLikeState && getPostLikeState.heart}
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
                      updatePostLike2Action({
                        likeID: getPostState[0].like._id,
                        likeType: "cuteCatFeverCoffeeIcon",
                      })
                    );
                  }}
                >
                  {({ isHovered, isFocused, isPressed }) => {
                    return (
                      <>
                        {!isLike2UpdatedBool &&
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
                              <LottieSteam
                                isLike2UpdatedBool={isLike2UpdatedBool}
                              />
                            </Circle>
                            <Center
                              _text={{
                                color: theme.colors.extraOrage[400],
                                fontWeight: "bold",
                              }}
                              mr={1}
                            >
                              {getPostLikeState &&
                                getPostLikeState.cuteCatFeverCoffeeIcon}
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
                              {getPostLikeState &&
                                getPostLikeState.cuteCatFeverCoffeeIcon}
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
                      updatePostLike3Action({
                        likeID: getPostState[0].like._id,
                        likeType: "cuteCowSurprisedIcon",
                      })
                    );
                  }}
                >
                  {({ isHovered, isFocused, isPressed }) => {
                    return (
                      <>
                        {!isLike3UpdatedBool &&
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
                              <LottieQuestion
                                isLike3UpdatedBool={isLike3UpdatedBool}
                              />
                            </Circle>
                            <Center
                              _text={{
                                color: theme.colors.extraOrage[400],
                                fontWeight: "bold",
                              }}
                              mr={1}
                            >
                              {getPostLikeState &&
                                getPostLikeState.cuteCowSurprisedIcon}
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
                              {getPostLikeState &&
                                getPostLikeState.cuteCowSurprisedIcon}
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
                      updatePostLike4Action({
                        likeID: getPostState[0].like._id,
                        likeType: "cuteRabbitHoldingCarrotIcon",
                      })
                    );
                  }}
                >
                  {({ isHovered, isFocused, isPressed }) => {
                    return (
                      <>
                        {!isLike4UpdatedBool &&
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
                              <LottieSparkle
                                isLike4UpdatedBool={isLike4UpdatedBool}
                              />
                            </Circle>
                            <Center
                              _text={{
                                color: theme.colors.extraOrage[400],
                                fontWeight: "bold",
                              }}
                              mr={1}
                            >
                              {getPostLikeState &&
                                getPostLikeState.cuteRabbitHoldingCarrotIcon}
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
                              {getPostLikeState &&
                                getPostLikeState.cuteRabbitHoldingCarrotIcon}
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
                      updatePostLike5Action({
                        likeID: getPostState[0].like._id,
                        likeType: "cuteSadCatSittingIcon",
                      })
                    );
                  }}
                >
                  {({ isHovered, isFocused, isPressed }) => {
                    return (
                      <>
                        {!isLike5UpdatedBool &&
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
                              <LottieRain
                                isLike5UpdatedBool={isLike5UpdatedBool}
                              />
                            </Circle>
                            <Center
                              _text={{
                                color: theme.colors.extraOrage[400],
                                fontWeight: "bold",
                              }}
                              mr={1}
                            >
                              {getPostLikeState &&
                                getPostLikeState.cuteSadCatSittingIcon}
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
                              {getPostLikeState &&
                                getPostLikeState.cuteSadCatSittingIcon}
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
  ) : (
    <></>
  );
});

export default PostImageLikeSection;
