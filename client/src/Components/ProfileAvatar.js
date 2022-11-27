import React from "react";
import { SimpleLineIcons } from "@expo/vector-icons";
import { Avatar, Box, Button, Icon, ZStack } from "native-base";

const ProfileAvatar = (props) => {
  const { image, letter, onPress } = props;

  return (
    <Box mb={4} w={230} h={230}>
      <ZStack>
        <Avatar
          bg="purple.600"
          alignSelf="center"
          w={230}
          h={230}
          shadow={1}
          _text={{ fontSize: 70 }}
          source={{
            uri: image ? image : null,
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
          onPress={onPress}
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
