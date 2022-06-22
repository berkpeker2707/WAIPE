import React from "react";
import {
  Input,
  NativeBaseProvider,
  extendTheme,
  Center,
  Stack,
  Heading,
  VStack,
  Checkbox,
  Text,
  Button,
  Box,
} from "native-base";

const RegisterScreen = () => {
  const theme = extendTheme({
    colors: {
      mustard: {
        400: "#e3b448",
      },
      extraOrage: {
        400: "#E38E48",
      },
      sage: {
        300: "#F8FFE3",
        400: "#cbd18f",
      },
      forestGreen: {
        400: "#3a6b35",
      },
    },
  });
  return (
    <NativeBaseProvider theme={theme}>
      <Center flex={1} px="3">
        <VStack space={5} w="300">
          <VStack space={6} alignItems="center">
            <Heading size="md" color="extraOrage.400">
              Sign up to Waipe
            </Heading>
            <Stack direction="column" space={5} alignItems="center">
              <Stack direction="row" alignItems="center">
                <Input
                  bg="white"
                  borderColor="extraOrage.400"
                  variant="rounded"
                  placeholder="Firstname"
                  w="47%"
                  colorScheme="warning"
                  _focus={style.input}
                />
                <Stack w="6%"></Stack>
                <Input
                  bg="white"
                  borderColor="extraOrage.400"
                  variant="rounded"
                  placeholder="Lastname"
                  w="47%"
                  _focus={style.input}
                />
              </Stack>
              <Input
                bg="white"
                borderColor="extraOrage.400"
                variant="rounded"
                placeholder="Email"
                w="100%"
                _focus={style.input}
              />
              <Input
                bg="white"
                borderColor="extraOrage.400"
                variant="rounded"
                placeholder="Phone"
                w="100%"
                _focus={style.input}
              />

              <Input
                bg="white"
                borderColor="extraOrage.400"
                variant="rounded"
                placeholder="Password"
                w="100%"
                type="password"
                _focus={style.input}
              />
              <Input
                bg="white"
                borderColor="extraOrage.400"
                variant="rounded"
                placeholder="Confirm Password"
                w="100%"
                type="password"
                _focus={style.input}
              />
            </Stack>
          </VStack>
          <VStack space={2} ml="8">
            <Checkbox
              value="term"
              size="sm"
              colorScheme="green"
              borderColor="extraOrage.400"
              borderWidth="1"
              borderRadius="7"
              _checked={style.checkbox}
            >
              <Text color="white" fontSize="xs">
                Term of Use, Privacy Policy
              </Text>
            </Checkbox>
            <Checkbox
              value="age"
              size="sm"
              colorScheme="green"
              borderColor="extraOrage.400"
              borderWidth="1"
              borderRadius="7"
              _checked={style.checkbox}
            >
              <Text color="white" fontSize="xs">
                +18
              </Text>
            </Checkbox>
          </VStack>
          <Box alignItems="center">
            <Button
              w="50%"
              size="md"
              borderRadius="50"
              bg="extraOrage.400"
              mb="2"
              colorScheme="warning"
              _text={{ fontSize: "md" }}
            >
              Sign up
            </Button>
            <Button
              size="sm"
              variant="link"
              _text={{ color: "forestGreen.400" }}
            >
              Cancel
            </Button>
          </Box>
        </VStack>
      </Center>
    </NativeBaseProvider>
  );
};

const style = {
  input: { bg: "white", borderColor: "forestGreen.400" },
  checkbox: { borderColor: "forestGreen.400", bg: "forestGreen.400" },
};

export default RegisterScreen;
