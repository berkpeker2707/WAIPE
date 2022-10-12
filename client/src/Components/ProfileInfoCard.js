import React from "react";
import { SimpleLineIcons } from "@expo/vector-icons";
import ProfileAvatar from "./ProfileAvatar";
import { Text, Heading, Box, Button, Icon, Center } from "native-base";

const ProfileInfoCard = (props) => {
  const { name, nickname, image, infoText } = props;

  return (
    <Center flex={1} px="3">
      <Box w={360} h="10%" mt={10}>
        <Button
          borderRadius="25"
          alignSelf="flex-end"
          variant="ghost"
          colorScheme="warning"
          w={10}
          h={10}
          leftIcon={
            <Icon
              as={SimpleLineIcons}
              name="settings"
              size="xl"
              color="coolGray.500"
            />
          }
        />
      </Box>
      <Heading>{name}</Heading>
      <Text
        mb={4}
        _light={{ color: "muted.500" }}
        _dark={{ color: "muted.500" }}
      >
        {nickname}
      </Text>
      <ProfileAvatar image={image} letter={name[0]} />
      <Box
        bg="trueGray.50"
        rounded="xl"
        height="10%"
        w={330}
        h={83}
        padding="3"
        shadow={1}
        mb={5}
      >
        <Text>{infoText}</Text>
      </Box>
    </Center>
  );
};

export default ProfileInfoCard;
