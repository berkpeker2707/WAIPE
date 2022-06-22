import React, { useState } from "react";
import { MaterialIcons } from "@expo/vector-icons";
import {
  Input,
  NativeBaseProvider,
  extendTheme,
  Center,
  Stack,
  Heading,
  VStack,
  Button,
  Box,
  Icon,
  Flex,
  Divider,
  Text,
} from "native-base";

const LoginScreen = () => {
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
      google: {
        400: "#de5246",
      },
    },
  });

  const [show, setShow] = useState(false);

  const VisibilityIcon = () => {
    return (
      <Icon
        as={<MaterialIcons name={show ? "visibility" : "visibility-off"} />}
        size={5}
        mr="3"
        color="muted.400"
        onPress={() => setShow(!show)}
      />
    );
  };

  return (
    <NativeBaseProvider theme={theme}>
      <Center flex={1} px="3">
        <VStack space={5} w="300">
          <VStack space={6} alignItems="center">
            <Heading size="md" color="extraOrage.400">
              Log in to Waipe
            </Heading>
            <Stack direction="column" w="300">
              <Stack direction="column" space={5} alignItems="center">
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
                  placeholder="Password"
                  w="100%"
                  type={show ? "text" : "password"}
                  InputRightElement={<VisibilityIcon />}
                  _focus={style.input}
                />
              </Stack>
              <Flex direction="row-reverse">
                <Button
                  size="sm"
                  variant="link"
                  _text={{ color: "forestGreen.400" }}
                >
                  Forgot password?
                </Button>
              </Flex>
            </Stack>
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
              Sign in
            </Button>
            <Flex direction="row" mb="5" mt="3" alignItems="center">
              <Divider bg="sage.300" w="10%" />
              <Text fontSize="md" color="sage.300" mr="2" ml="2">
                OR
              </Text>
              <Divider bg="sage.300" w="10%" />
            </Flex>
            <Button
              w="100%"
              size="md"
              borderRadius="50"
              bg="forestGreen.400"
              mb="2"
              colorScheme="green"
              justifyContent="flex-start"
              _text={{ fontSize: "md" }}
            >
              Login with Google
            </Button>
            <Divider mb="2" mt="5" bg="sage.300" w="100%" />
            <Heading my="3" size="md" color="forestGreen.400">
              New to Waipe?
            </Heading>
            <Button
              w="100%"
              size="md"
              borderRadius="50"
              bg="extraOrage.400"
              mb="2"
              colorScheme="warning"
              justifyContent="flex-start"
              _text={{ fontSize: "md" }}
            >
              Sign up for App Name
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

export default LoginScreen;
