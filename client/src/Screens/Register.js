import React, { useState } from "react";
import { View } from "react-native";
import { Formik } from "formik";
import { useSelector, useDispatch } from "react-redux";
import {
  signupAction,
  selectAuthLoading,
  selectAuthError,
} from "../Redux/Slices/authSlice";
import {
  Input,
  Center,
  Stack,
  Heading,
  VStack,
  Checkbox,
  Text,
  Button,
  Box,
  FormControl,
  AlertDialog,
  useTheme,
  ScrollView,
  useSafeArea,
} from "native-base";

const RegisterScreen = ({ navigation }) => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const authLoading = useSelector(selectAuthLoading);
  const authError = useSelector(selectAuthError);
  const [isOpen, setIsOpen] = useState(false);

  const Alert = () => {
    return (
      <AlertDialog isOpen={isOpen && !authLoading}>
        <AlertDialog.Content
          flex={0.25}
          alignItems="center"
          bg="white"
          width="100%"
        >
          <Text
            textAlign="center"
            color={theme.colors.muted[600]}
            fontSize="sm"
            mt="8"
            ml="8"
            mr="8"
          >
            An activation link has been sent to your email address. Please click
            on the link to activate your account.
          </Text>
          <Button
            colorScheme="danger"
            onPress={() => {
              setIsOpen(() => false), navigation.navigate("Login");
            }}
            w="60"
            m="6"
            borderRadius="50"
            bg={theme.colors.forestGreen[400]}
          >
            OK
          </Button>
        </AlertDialog.Content>
      </AlertDialog>
    );
  };

  const safeAreaProps = useSafeArea({
    safeArea: true,
    pt: 2,
  });

  return (
    <Formik
      initialValues={{
        firstname: "",
        lastname: "",
        email: "",
        phone: "",
        password: "",
        confirmPassword: "",
        termsOfUse: false,
        privacyPolicy: false,
        age: false,
      }}
      onSubmit={(values) => {
        dispatch(signupAction(values));
        setIsOpen(!isOpen);
      }}
    >
      {({ handleChange, handleBlur, handleSubmit, setFieldValue, values }) => (
        <ScrollView {...safeAreaProps} bg={theme.colors.sage[400]}>
          <Center flex={1} px="3">
            <VStack space={5} w="300">
              <VStack space={6} alignItems="center">
                <Heading size="md" color={theme.colors.extraOrage[400]}>
                  Sign up to Waipe
                </Heading>
                <Stack direction="column" space={5} alignItems="center">
                  <Stack direction="row" alignItems="center">
                    <Input
                      bg="white"
                      borderColor={theme.colors.extraOrage[400]}
                      variant="rounded"
                      placeholder="Firstname"
                      w="47%"
                      _focus={theme.input}
                      onChangeText={handleChange("firstname")}
                      onBlur={handleBlur("firstname")}
                      value={values.firstname}
                    />
                    <Stack w="6%"></Stack>
                    <Input
                      bg="white"
                      borderColor={theme.colors.extraOrage[400]}
                      variant="rounded"
                      placeholder="Lastname"
                      w="47%"
                      _focus={theme.input}
                      onChangeText={handleChange("lastname")}
                      onBlur={handleBlur("lastname")}
                      value={values.lastname}
                    />
                  </Stack>
                  <FormControl
                    isInvalid={
                      authError === "Email already exists." ? true : false
                    }
                  >
                    <Input
                      bg="white"
                      borderColor={theme.colors.extraOrage[400]}
                      variant="rounded"
                      placeholder="Email"
                      w="100%"
                      _focus={theme.input}
                      onChangeText={handleChange("email")}
                      onBlur={handleBlur("email")}
                      value={values.email}
                    />
                    <FormControl.ErrorMessage ml="3.5">
                      Email address already in use.
                    </FormControl.ErrorMessage>
                  </FormControl>
                  <FormControl
                    isInvalid={
                      authError === "Phone already exists." ? true : false
                    }
                  >
                    <Input
                      bg="white"
                      borderColor={theme.colors.extraOrage[400]}
                      variant="rounded"
                      placeholder="Phone"
                      w="100%"
                      keyboardType="numeric"
                      _focus={theme.input}
                      onChangeText={handleChange("phone")}
                      onBlur={handleBlur("phone")}
                      value={values.phone}
                    />
                    <FormControl.ErrorMessage ml="3.5">
                      Phone number already in use.
                    </FormControl.ErrorMessage>
                  </FormControl>

                  <Input
                    bg="white"
                    borderColor={theme.colors.extraOrage[400]}
                    variant="rounded"
                    placeholder="Password"
                    w="100%"
                    type="password"
                    _focus={theme.input}
                    onChangeText={handleChange("password")}
                    onBlur={handleBlur("password")}
                    value={values.password}
                  />
                  <FormControl
                    isInvalid={
                      values.password !== values.confirmPassword ? true : false
                    }
                  >
                    <Input
                      bg="white"
                      borderColor={theme.colors.extraOrage[400]}
                      variant="rounded"
                      placeholder="Confirm Password"
                      w="100%"
                      type="password"
                      _focus={theme.input}
                      onChangeText={handleChange("confirmPassword")}
                      onBlur={handleBlur("confirmPassword")}
                      value={values.confirmPassword}
                    />
                    <FormControl.ErrorMessage ml="3.5">
                      Passwords must match
                    </FormControl.ErrorMessage>
                  </FormControl>
                </Stack>
              </VStack>
              <VStack space={2} ml="8">
                <Checkbox
                  size="sm"
                  colorScheme="green"
                  borderColor={theme.colors.extraOrage[400]}
                  borderWidth="1"
                  borderRadius="7"
                  _checked={theme.checkbox}
                  onChange={(nextValue) =>
                    setFieldValue("termsOfUse", nextValue)
                  }
                  value={values.termsOfUse}
                >
                  <Text color={theme.colors.singletons["white"]} fontSize="xs">
                    Term of Use
                  </Text>
                </Checkbox>
                <Checkbox
                  size="sm"
                  colorScheme="green"
                  borderColor={theme.colors.extraOrage[400]}
                  borderWidth="1"
                  borderRadius="7"
                  _checked={theme.checkbox}
                  onChange={(nextValue) =>
                    setFieldValue("privacyPolicy", nextValue)
                  }
                  value={values.privacyPolicy}
                >
                  <Text color={theme.colors.singletons["white"]} fontSize="xs">
                    Privacy Policy
                  </Text>
                </Checkbox>
                <Checkbox
                  size="sm"
                  colorScheme="green"
                  borderColor={theme.colors.extraOrage[400]}
                  borderWidth="1"
                  borderRadius="7"
                  _checked={theme.checkbox}
                  onChange={(nextValue) => setFieldValue("age", nextValue)}
                  value={values.age}
                >
                  <Text color={theme.colors.singletons["white"]} fontSize="xs">
                    +18
                  </Text>
                </Checkbox>
              </VStack>
              <Box alignItems="center">
                <Button
                  isLoading={authLoading}
                  isDisabled={
                    !(
                      values.firstname &&
                      values.lastname &&
                      values.email &&
                      values.password &&
                      values.confirmPassword &&
                      values.termsOfUse &&
                      values.privacyPolicy &&
                      values.age
                    )
                  }
                  w="50%"
                  size="md"
                  borderRadius="50"
                  bg={theme.colors.extraOrage[400]}
                  mb="2"
                  colorScheme="warning"
                  _text={{ fontSize: "md" }}
                  onPress={handleSubmit}
                >
                  Sign up
                </Button>
                <Button
                  size="sm"
                  variant="link"
                  _text={{ color: theme.colors.forestGreen[400] }}
                  onPress={() => navigation.navigate("Login")}
                >
                  Cancel
                </Button>
              </Box>
            </VStack>
            <Alert></Alert>
          </Center>
        </ScrollView>
      )}
    </Formik>
  );
};

export default RegisterScreen;
