import React from "react";
import { Heading, Text, Center } from "native-base";

const NameAndNickname = (props) => {
  const { name, nickname } = props;
  return (
    <Center>
      <Heading>{name}</Heading>
      <Text
        mb={4}
        _light={{ color: "muted.500" }}
        _dark={{ color: "muted.500" }}
      >
        {nickname}
      </Text>
    </Center>
  );
};

export default NameAndNickname;
