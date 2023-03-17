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

import { useDispatch } from "react-redux";

import {
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
  const {
    navigation,
    theme,
    getPostState,
    getPostLikeState,
    currentUser,
    isLike1UpdatedBool,
    isLike2UpdatedBool,
    isLike3UpdatedBool,
    isLike4UpdatedBool,
    isLike5UpdatedBool,
  } = props;

  useEffect(() => {
    setLikeState(() => [getPostLikeState]);
    setLike1State(() => isLike1UpdatedBool);
    setLike2State(() => isLike2UpdatedBool);
    setLike3State(() => isLike3UpdatedBool);
    setLike4State(() => isLike4UpdatedBool);
    setLike5State(() => isLike5UpdatedBool);
  }, [getPostLikeState, isLike1UpdatedBool, isLike2UpdatedBool, isLike3UpdatedBool, isLike4UpdatedBool, isLike5UpdatedBool]);

  const [likeState, setLikeState] = useState();
  const [like1State, setLike1State] = useState();
  const [like2State, setLike2State] = useState();
  const [like3State, setLike3State] = useState();
  const [like4State, setLike4State] = useState();
  const [like5State, setLike5State] = useState();

  const dispatch = useDispatch();

  return currentUser ? (
    <Stack alignItems="center" p="3">
      <HStack space={12} justifyContent="space-between">
        <HStack alignItems="center">
          {likeState &&
            likeState.map((likeStateInfo, likeStateIndex) => {
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
                          {likeStateInfo &&
                          likeStateInfo["heart"] &&
                          likeStateInfo["heart"].some((likeobj) => {
                            return likeobj.ownerID === currentUser._id;
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
                                <LottieHeart isLike1UpdatedBool={like1State} />
                              </Circle>
                              <Center
                                _text={{
                                  color: theme.colors.extraOrage[400],
                                  fontWeight: "bold",
                                }}
                                mr={1}
                              >
                                {likeStateInfo["heart"] &&
                                  likeStateInfo["heart"].length}
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
                                {likeStateInfo["heart"] &&
                                  likeStateInfo["heart"].length}
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
                          {likeStateInfo &&
                          likeStateInfo["cuteCatFeverCoffeeIcon"] &&
                          likeStateInfo["cuteCatFeverCoffeeIcon"].some(
                            (likeobj) => {
                              return likeobj.ownerID === currentUser._id;
                            }
                          ) ? (
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
                                <LottieSteam isLike2UpdatedBool={like2State} />
                              </Circle>
                              <Center
                                _text={{
                                  color: theme.colors.extraOrage[400],
                                  fontWeight: "bold",
                                }}
                                mr={1}
                              >
                                {likeStateInfo["cuteCatFeverCoffeeIcon"] &&
                                  likeStateInfo["cuteCatFeverCoffeeIcon"]
                                    .length}
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
                                {likeStateInfo["cuteCatFeverCoffeeIcon"] &&
                                  likeStateInfo["cuteCatFeverCoffeeIcon"]
                                    .length}
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
                          {likeStateInfo &&
                          likeStateInfo["cuteCowSurprisedIcon"] &&
                          likeStateInfo["cuteCowSurprisedIcon"].some(
                            (likeobj) => {
                              return likeobj.ownerID === currentUser._id;
                            }
                          ) ? (
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
                                  isLike3UpdatedBool={like3State}
                                />
                              </Circle>
                              <Center
                                _text={{
                                  color: theme.colors.extraOrage[400],
                                  fontWeight: "bold",
                                }}
                                mr={1}
                              >
                                {likeStateInfo["cuteCowSurprisedIcon"] &&
                                  likeStateInfo["cuteCowSurprisedIcon"].length}
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
                                {likeStateInfo["cuteCowSurprisedIcon"] &&
                                  likeStateInfo["cuteCowSurprisedIcon"].length}
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
                          {likeStateInfo &&
                          likeStateInfo["cuteRabbitHoldingCarrotIcon"] &&
                          likeStateInfo["cuteRabbitHoldingCarrotIcon"].some(
                            (likeobj) => {
                              return likeobj.ownerID === currentUser._id;
                            }
                          ) ? (
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
                                  isLike4UpdatedBool={like4State}
                                />
                              </Circle>
                              <Center
                                _text={{
                                  color: theme.colors.extraOrage[400],
                                  fontWeight: "bold",
                                }}
                                mr={1}
                              >
                                {likeStateInfo["cuteRabbitHoldingCarrotIcon"] &&
                                  likeStateInfo["cuteRabbitHoldingCarrotIcon"]
                                    .length}
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
                                {likeStateInfo["cuteRabbitHoldingCarrotIcon"] &&
                                  likeStateInfo["cuteRabbitHoldingCarrotIcon"]
                                    .length}
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
                          {likeStateInfo &&
                          likeStateInfo["cuteSadCatSittingIcon"] &&
                          likeStateInfo["cuteSadCatSittingIcon"].some(
                            (likeobj) => {
                              return likeobj.ownerID === currentUser._id;
                            }
                          ) ? (
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
                                <LottieRain isLike5UpdatedBool={like5State} />
                              </Circle>
                              <Center
                                _text={{
                                  color: theme.colors.extraOrage[400],
                                  fontWeight: "bold",
                                }}
                                mr={1}
                              >
                                {likeStateInfo["cuteSadCatSittingIcon"] &&
                                  likeStateInfo["cuteSadCatSittingIcon"].length}
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
                                {likeStateInfo["cuteSadCatSittingIcon"] &&
                                  likeStateInfo["cuteSadCatSittingIcon"].length}
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
