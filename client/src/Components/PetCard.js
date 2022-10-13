import React from "react";
import { Text, Avatar, Pressable, Box } from "native-base";

const PetCard = (props) => {
  const { name, image } = props;

  return (
    <Box alignItems="center" justifyContent="center">
      <Pressable variant="ghost" onPress={() => console.log("I'm Pressed")}>
        {({ isPressed }) => {
          return (
            <Box
              style={{
                opacity: isPressed ? 0.7 : 1,
              }}
            >
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
            </Box>
          );
        }}
      </Pressable>
    </Box>
  );
};

export default PetCard;
