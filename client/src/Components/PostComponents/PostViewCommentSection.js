import React, { useEffect, useState } from "react";
import {
  Text,
  HStack,
  Stack,
  Circle,
  Icon,
  Center,
  Pressable,
  Avatar,
} from "native-base";

import uuid from "react-native-uuid";

import ReportIcon from "../Icons/ReportIcon";
import DeleteIcon from "../Icons/DeleteIcon";
import { useDispatch } from "react-redux";
import { deleteCommentAction } from "../../Redux/Slices/commentSlice";

export default function PostViewCommentSection(props) {
  const { navigation, theme, getCommentState, currentUserID } = props;

  const dispatch = useDispatch();

  const [onLongPressState, setOnLongPressState] = useState(() => false);
  const [selectedItemID, setSelectedItemID] = useState(() => null);
  const [selectedItemOwnerID, setSelectedItemOwnerID] = useState(() => null);

  //check if screen is changed and reset booleans
  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      setOnLongPressState(() => false);
    });

    // return the function to unsubscribe from the event so it gets removed on unmount
    return () => {
      //clean up function
      unsubscribe;
    };
  }, []);

  return (
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
                key={uuid.v4()}
                bg={theme.colors.sage[400]}
                safeAreaBottom
                safeAreaLeft
                safeAreaRight
              >
                <Pressable
                  onLongPress={() => {
                    onLongPressState
                      ? (setOnLongPressState(() => false),
                        setSelectedItemID(() => null),
                        setSelectedItemOwnerID(() => null))
                      : (setOnLongPressState(() => true),
                        setSelectedItemOwnerID(
                          () => getCommentStateInfo.ownerID._id
                        ),
                        setSelectedItemID(() => getCommentStateInfo._id));
                  }}
                  onPress={() => setOnLongPressState(() => false)}
                >
                  {({ isHovered, isFocused, isPressed }) => {
                    return (
                      <>
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
                                uri: getCommentStateInfo?.ownerID?.picture
                                  ? getCommentStateInfo?.ownerID?.picture
                                  : null,
                              }}
                            >
                              {getCommentStateInfo?.ownerID?.firstname[0]}
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

                        {/* Report and Delete Starts */}
                        <Pressable
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
                          onLongPress={() => {
                            onLongPressState
                              ? setOnLongPressState(() => false)
                              : setOnLongPressState(() => true);
                          }}
                          onPress={() => setOnLongPressState(() => false)}
                        >
                          {({ isHovered, isFocused, isPressed }) => {
                            return (
                              <HStack
                                // borderWidth="1"
                                // borderRadius="lg"
                                // borderColor={theme.colors.sage[300]}
                                // p="2"
                                // bg={theme.colors.sage[300]}
                                style={{
                                  transform: [{ scale: isPressed ? 0.96 : 1 }],
                                  opacity:
                                    selectedItemID ===
                                      getCommentStateInfo._id &&
                                    onLongPressState
                                      ? 1
                                      : 0,
                                  zIndex:
                                    selectedItemID ===
                                      getCommentStateInfo._id &&
                                    onLongPressState
                                      ? 1
                                      : -1,
                                }}
                              >
                                <Pressable
                                  m="1"
                                  onPress={() =>
                                    console.log("Pressed report button")
                                  }
                                >
                                  {({ isHovered, isFocused, isPressed }) => {
                                    return (
                                      <Circle
                                        size="30px"
                                        bg={theme.colors.forestGreen[400]}
                                        style={{
                                          transform: [
                                            { scale: isPressed ? 0.96 : 1 },
                                          ],
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

                                {selectedItemOwnerID &&
                                currentUserID &&
                                selectedItemOwnerID === currentUserID ? (
                                  <Pressable
                                    m="1"
                                    onPress={() => {
                                      dispatch(
                                        deleteCommentAction({
                                          parentCommentID:
                                            getCommentState[0]._id,
                                          childCommentID:
                                            getCommentState[0].comment[
                                              getCommentStateIndex
                                            ]._id,
                                        })
                                      );
                                      setOnLongPressState(() => false);
                                    }}
                                  >
                                    {({ isHovered, isFocused, isPressed }) => {
                                      return (
                                        <Circle
                                          size="30px"
                                          bg={theme.colors.forestGreen[400]}
                                          style={{
                                            transform: [
                                              { scale: isPressed ? 0.96 : 1 },
                                            ],
                                          }}
                                        >
                                          <Icon
                                            as={
                                              <DeleteIcon
                                                color={theme.colors.sage[300]}
                                              />
                                            }
                                          />
                                        </Circle>
                                      );
                                    }}
                                  </Pressable>
                                ) : (
                                  <></>
                                )}
                              </HStack>
                            );
                          }}
                        </Pressable>
                        {/* Report and Delete Ends */}

                        <HStack
                          ml={8}
                          pt={1}
                          pb={1}
                          bg={theme.colors.sage[300]}
                          borderWidth="1"
                          borderRadius="xs"
                          borderColor={theme.colors.sage[300]}
                          style={{
                            transform: [{ scale: isPressed ? 0.96 : 1 }],
                            opacity:
                              selectedItemID === getCommentStateInfo._id &&
                              onLongPressState
                                ? 0.4
                                : 1,
                            zIndex:
                              selectedItemID === getCommentStateInfo._id &&
                              onLongPressState
                                ? -1
                                : 1,
                          }}
                        >
                          <Text color={theme.colors.forestGreen[400]}>
                            {getCommentStateInfo.commentText}
                          </Text>
                        </HStack>
                      </>
                    );
                  }}
                </Pressable>
              </Stack>
            );
          }
        )}
    </Stack>
  );
}
