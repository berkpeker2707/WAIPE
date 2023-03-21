import React, { useEffect, useState, memo } from "react";
import {
  Box,
  VStack,
  Stack,
  Circle,
  Icon,
  Pressable,
  TextArea,
} from "native-base";

import AddCommentIcon from "../Icons/AddCommentIcon";
import SendMessageIcon from "../Icons/SendMessageIcon";

import { useDispatch } from "react-redux";

import { updateCommentAction } from "../../Redux/Slices/commentSlice";

const PostAddCommentSection = memo(function PostAddCommentSection(props) {
  const { navigation, theme, getCommentState } = props;

  const dispatch = useDispatch();

  const [commentTextState, setCommentTextState] = useState(() => "");

  const [commentOpenState, setCommentOpenState] = useState(() => false);

  //check if screen is changed and reset booleans
  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      setCommentOpenState(() => false);
      setCommentTextState(() => "");
    });

    // return the function to unsubscribe from the event so it gets removed on unmount
    return () => {
      //clean up function
      unsubscribe;
    };
  }, []);

  return (
    <>
      <Stack alignItems="center" p="3">
        <Box>
          <VStack alignItems="center">
            <Pressable
              onPress={() =>
                commentOpenState
                  ? setCommentOpenState(() => false)
                  : setCommentOpenState(() => true)
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
          <TextArea
            h={20}
            _focus={{
              bg: theme.colors.singletons["white"],
              borderColor: theme.colors.sage[300],
            }}
            placeholder="Add a comment..."
            value={commentTextState}
            onChangeText={(commentTextState) =>
              setCommentTextState(() => commentTextState)
            }
          />
          <Pressable
            onPress={() => {
              if (commentTextState) {
                dispatch(
                  updateCommentAction({
                    parentCommentID: getCommentState[0]._id,
                    commentText: commentTextState,
                  })
                );
                setCommentOpenState(() => false);
                setCommentTextState(() => "");
              }
            }}
          >
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
    </>
  );
});

export default PostAddCommentSection;
