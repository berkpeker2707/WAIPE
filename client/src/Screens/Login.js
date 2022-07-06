import React, { useState } from "react";
import { View } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { useSelector, useDispatch } from "react-redux";
import { SSRProvider } from "@react-aria/ssr";
import {
  signin,
  selectAuthLoading,
  selectAuthError,
} from "../Redux/Slices/authSlice";
import { Formik } from "formik";
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
  FormControl,
} from "native-base";

const LoginScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const authLoading = useSelector(selectAuthLoading);
  const authError = useSelector(selectAuthError);

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
    <Formik
      initialValues={{ email: "", password: "" }}
      onSubmit={(values) => dispatch(signin(values))}
    >
      {({ handleChange, handleBlur, handleSubmit, values }) => (
        <View style={style.container}>
          <SSRProvider>
            <NativeBaseProvider theme={theme}>
              <Center flex={1} px="3">
                <VStack space={5} w="300">
                  <VStack space={6} alignItems="center">
                    <Heading size="md" color="extraOrage.400">
                      Log in to Waipe
                    </Heading>
                    <Stack direction="column" w="300">
                      <Stack direction="column" space={5} alignItems="center">
                        <FormControl
                          isInvalid={
                            authError === "User Not found." ? true : false
                          }
                        >
                          <Input
                            bg="white"
                            borderColor="extraOrage.400"
                            variant="rounded"
                            placeholder="Email"
                            w="100%"
                            _focus={style.input}
                            onChangeText={handleChange("email")}
                            onBlur={handleBlur("email")}
                            value={values.email}
                          />
                          <FormControl.ErrorMessage ml="3.5">
                            Sorry, we can't find an account with this email.
                          </FormControl.ErrorMessage>
                        </FormControl>
                        <FormControl
                          isInvalid={
                            authError === "Invalid Password!" ? true : false
                          }
                        >
                          <Input
                            bg="white"
                            borderColor="extraOrage.400"
                            variant="rounded"
                            placeholder="Password"
                            w="100%"
                            type={show ? "text" : "password"}
                            InputRightElement={<VisibilityIcon />}
                            _focus={style.input}
                            onChangeText={handleChange("password")}
                            onBlur={handleBlur("password")}
                            value={values.password}
                          />
                          <FormControl.ErrorMessage ml="3.5">
                            Incorrect password. Please try again.
                          </FormControl.ErrorMessage>
                        </FormControl>
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
                      isLoading={authLoading}
                      isDisabled={!(values.email && values.password)}
                      w="50%"
                      size="md"
                      borderRadius="50"
                      bg="extraOrage.400"
                      mb="2"
                      colorScheme="warning"
                      _text={{ fontSize: "md" }}
                      onPress={handleSubmit}
                      title="Submit"
                    >
                      Sign in
                    </Button>
                    <Flex direction="row" mb="5" mt="3" alignItems="center">
                      <Divider bg="sage.300" w="55" />
                      <Text fontSize="md" color="sage.300" mr="2" ml="2">
                        OR
                      </Text>
                      <Divider bg="sage.300" w="55" />
                    </Flex>
                    <Button
                      isLoading={false}
                      isLoadingText="Sign in"
                      spinnerPlacement="end"
                      w="100%"
                      size="md"
                      borderRadius="50"
                      bg="forestGreen.400"
                      mb="2"
                      colorScheme="green"
                      justifyContent="flex-start"
                      _text={{ fontSize: "md" }}
                      onPress={() => console.log("SO")}
                    >
                      Login with Google
                    </Button>
                    <Divider mb="2" mt="5" bg="sage.300" w="100%" />
                    <Heading my="3" size="md" color="forestGreen.400">
                      New to Waipe?
                    </Heading>
                    <Button
                      isLoading={false}
                      isLoadingText="Sign in"
                      spinnerPlacement="end"
                      w="100%"
                      size="md"
                      borderRadius="50"
                      bg="extraOrage.400"
                      mb="2"
                      colorScheme="warning"
                      justifyContent="flex-start"
                      _text={{ fontSize: "md" }}
                      onPress={() => navigation.navigate("Register")}
                    >
                      Sign up for App Name
                    </Button>
                  </Box>
                </VStack>
              </Center>
            </NativeBaseProvider>
          </SSRProvider>
        </View>
      )}
    </Formik>
  );
};

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

const style = {
  input: { bg: "white", borderColor: "forestGreen.400" },
  checkbox: { borderColor: "forestGreen.400", bg: "forestGreen.400" },
  container: {
    flex: 1,
    backgroundColor: "#cbd18f",
    alignItems: "center",
    justifyContent: "center",
  },
};

export default LoginScreen;
