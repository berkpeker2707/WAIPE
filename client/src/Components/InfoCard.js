import React from "react";
import { Text, Box } from "native-base";

const InfoCard = (props) => {
  const { infoText } = props;

  return (
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
  );
};
export default InfoCard;
