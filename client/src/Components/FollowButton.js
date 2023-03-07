import React from "react";
import { Feather } from "@expo/vector-icons";
import { Box, Icon, IconButton } from "native-base";
import { useDispatch, useSelector } from "react-redux";
import { followPetAction, selectUserUpdated } from "../Redux/Slices/userSlice";

const FollowButton = (props) => {
  const { currentUser, petID } = props;
  const dispatch = useDispatch();

  const userIsUpdate = useSelector(selectUserUpdated);

  return (
    <Box w={360} mt={5}>
      <IconButton
        onPress={() => {
          dispatch(followPetAction(petID));
        }}
        borderRadius="25"
        alignSelf="flex-end"
        variant="ghost"
        colorScheme="warning"
        w={10}
        h={10}
        icon={
          currentUser?.followedPets?.includes(petID) ? (
            <Icon
              as={Feather}
              name="user-minus"
              size="xl"
              color="coolGray.500"
            />
          ) : (
            <Icon
              as={Feather}
              name="user-plus"
              size="xl"
              color="coolGray.500"
            />
          )
        }
      />
    </Box>
  );
};

export default FollowButton;
