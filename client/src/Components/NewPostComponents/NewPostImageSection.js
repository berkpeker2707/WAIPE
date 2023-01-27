import React, { useEffect, useMemo, useRef, useState } from "react";
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

  const [imageSource, setImageSource] = useState(() => null);
  const [imageSourceChanged, setImageSourceChanged] = useState(() => false);

  const dispatch = useDispatch();

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      var testVar = await result.uri;

      if (
        testVar &&
        [".jpg", ".jpeg", ".jpe", ".tiff", ".tif", ".png"].some((substring) =>
          testVar.includes(substring)
        )
      ) {
        setImageSource(() => testVar);

        setImageSourceChanged(() => true);
      }
      // await setImageSourceChanged(() => true);
      // dispatch(pictureUploadAction(result));
      // navigation.navigate("MainProfile");
    }
  };

  useEffect(() => {
    setImageSourceChanged(() => false);
    // }
    // }
  }, [imageSource, imageSourceChanged]); // <-- here put the parameter to listen

  //   useEffect(() => {
  //     // return the function to unsubscribe from the event so it gets removed on unmount
  //     return () => {
  //       //clean up function
  //     };
  //   }, []);

  // //check if screen is changed and reset booleans
  // useEffect(() => {
  //   const unsubscribe = navigation.addListener("focus", () => {
  //     setOnLongPressState(() => false);
  //     setCommentOpenState(() => false);
  //   });

  //   // return the function to unsubscribe from the event so it gets removed on unmount
  //   return () => {
  //     //clean up function
  //     unsubscribe;
  //   };
  // }, []);

  return !imageSourceChanged ? (
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
              source={imageSource ? { uri: imageSource } : palet}
              alt="image"
              key={uuid.v4()}
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
