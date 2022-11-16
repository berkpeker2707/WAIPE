import React from "react";
import PressableButton from "./PressableButton";
import { Text, Avatar, Pressable, Box } from "native-base";

const PetCard = (props) => {
  const { name, image } = props;

  return (
    <Box alignItems="center" justifyContent="center">
      <PressableButton onPress={() => console.log("I'm Pressed")}>
        <Avatar
          bg="purple.600"
          alignSelf="center"
          width={100}
          height={100}
          shadow={1}
          _text={{ fontSize: 40 }}
          source={{
            uri: image ? image : null,
          }}
        >
          {name[0]}
        </Avatar>
        <Text
          isTruncated
          style={{
            textAlign: "center",
          }}
          w={79}
          alignSelf="center"
          fontSize="xs"
        >
          {name}
        </Text>
      </PressableButton>
    </Box>
  );
};

export default PetCard;
