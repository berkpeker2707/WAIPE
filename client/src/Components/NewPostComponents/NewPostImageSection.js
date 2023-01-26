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

import uuid from "react-native-uuid";
import LikeHeartIcon from "../Icons/LikeHeartIcon";
import AddCommentIcon from "../Icons/AddCommentIcon";
import SendMessageIcon from "../Icons/SendMessageIcon";
import CuteCatFeverCoffeeIcon from "../Icons/CuteCatFeverCoffeeIcon";
import CuteCowSurprisedIcon from "../Icons/CuteCowSurprisedIcon";
import CuteRabbitHoldingCarrotIcon from "../Icons/CuteRabbitHoldingCarrotIcon";
import CuteSadCatSittingIcon from "../Icons/CuteSadCatSittingIcon";

import ReportIcon from "../Icons/ReportIcon";
import BookmarkIcon from "../Icons/BookmarkIcon";

import { useDispatch, useSelector } from "react-redux";

import {
  archivePostAction,
  getPostAction,
  selectGetPost,
  selectPostUpdated,
} from "../../Redux/Slices/postSlice";

import {
  getCommentAction,
  selectCommentUpdated,
  selectGetComment,
  updateCommentAction,
} from "../../Redux/Slices/commentSlice";
import {
  selectLikeUpdated,
  selectUpdatePostLike,
  updatePostLikeAction,
} from "../../Redux/Slices/likeSlice";
import * as ImagePicker from "expo-image-picker";

const palet = require("../../../assets/paletWhite.png");

export default function NewPostImageSection(props) {
  const { navigation, theme } = props;

  const [imageResult, setImageResult] = useState(() => null);
  const [imageSource, setImageSource] = useState(() => palet);
  const [imageSourceEdited, setImageSourceEdited] = useState(() => false);

  const dispatch = useDispatch();

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    setImageResult(() =>
      ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      })
    );

    if (imageResult && !imageResult.canceled) {
      setImageSourceEdited(() => true);

      console.log(imageResult.uri);
      //   dispatch(pictureUploadAction(imageResult));
      //   navigation.navigate("MainProfile");
    }
  };

  useEffect(() => {
    return () => {
      setImageSource(() => imageSourceEdited && imageResult && imageResult.uri);

      //clean up function
    };
  }, [imageResult]);

  //   useEffect(() => {
  //     // return the function to unsubscribe from the event so it gets removed on unmount
  //     return () => {
  //       //clean up function
  //     };
  //   }, []);

  return imageSource ? (
    <Box safeAreaTop ml={7} mr={7}>
      <Box style={theme.postShadow}>
        <Box
          maxW="100%"
          rounded="3xl"
          overflow="hidden"
          borderColor={theme.colors.forestGreen[400]}
          borderWidth="3.5"
        >
          <AspectRatio w="100%" ratio={1 / 1}>
            <Image
              size="100%"
              source={imageSource}
              //   source={imageSourceEdited ? { uri: imageSource } : imageSource}
              alt="image"
            />
          </AspectRatio>

          <Pressable onPress={pickImage}>
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
                    as={<AddCommentIcon color={theme.colors.sage[400]} />}
                  />
                </Circle>
              );
            }}
          </Pressable>
        </Box>
      </Box>
    </Box>
  ) : (
    <ScrollView bg={theme.colors.sage[400]}>
      <Stack safeArea>
        <Text>Loading...</Text>
      </Stack>
    </ScrollView>
  );
}
