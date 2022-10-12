import React from "react";
import { SimpleLineIcons } from "@expo/vector-icons";
import { Avatar, Box, Button, Icon, ZStack } from "native-base";

const ProfileAvatar = (props) => {
  const { image, letter } = props;

  return (
    <Box mb={4} w={230} h={230}>
      <ZStack>
        <Avatar
          bg="purple.600"
          alignSelf="center"
          w={230}
          h={230}
          shadow={1}
          source={{
            uri: image,
          }}
        >
          {letter}
        </Avatar>
        <Button
          borderRadius="25"
          bg="white"
          ml={175}
          mt={175}
          w={10}
          h={10}
          colorScheme="warning"
          leftIcon={
            <Icon
              as={SimpleLineIcons}
              name="pencil"
              size="md"
              color="coolGray.500"
            />
          }
        />
      </ZStack>
    </Box>
  );
};

export default ProfileAvatar;
