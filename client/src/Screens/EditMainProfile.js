import React from "react";
import { View } from "react-native";
import { Formik } from "formik";
import {
  Center,
  Spinner,
  Button,
  TextArea,
  Input,
  extendTheme,
  VStack,
  NativeBaseProvider,
  HStack,
} from "native-base";
import {
  updateUserAction,
  pictureUploadAction,
  pictureDeleteAction,
  selectCurrentUser,
  selectUserLoading,
} from "../Redux/Slices/userSlice";
import { useSelector, useDispatch } from "react-redux";
import ProfileAvatar from "../Components/ProfileAvatar";
import * as ImagePicker from "expo-image-picker";

const EditMainProfileScreen = ({ navigation }) => {
  const dispatch = useDispatch();

  const currentUser = useSelector(selectCurrentUser);
  const userLoading = useSelector(selectUserLoading);

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      dispatch(pictureUploadAction(result));
      navigation.navigate("MainProfile");
    }
  };

  return (
    <View style={style.container}>
      <NativeBaseProvider theme={theme}>
        <Center flex={1} px="3">
          {userLoading ? (
            <Spinner color={"mustard.400"} size="lg" />
          ) : (
            <Formik
              initialValues={{
                firstname: `${currentUser?.firstname}`,
                lastname: `${currentUser?.lastname}`,
                nickname: "",
                locations: {
                  country: `${currentUser?.locations?.country}`,
                  city: `${currentUser?.locations?.city}`,
                },
                biography: `${currentUser?.biography}`,
              }}
              onSubmit={(values) => {
                dispatch(updateUserAction(values));
                navigation.navigate("MainProfile");
              }}
            >
              {({ handleChange, handleBlur, handleSubmit, values }) => (
                <VStack space={7}>
                  <VStack>
                    <ProfileAvatar
                      image={currentUser.picture}
                      letter={`${currentUser?.firstname[0]}${currentUser?.lastname[0]}`}
                      onPress={() => {
                        dispatch(pictureDeleteAction(currentUser?.picture));
                        navigation.navigate("MainProfile");
                      }}
                      icon="trash"
                      isCurrentUser={true}
                    />
                    <Button size="md" variant="ghost" onPress={pickImage}>
                      Change Profile Picture
                    </Button>
                  </VStack>
                  <VStack space={3} w="90%">
                    <HStack
                      space={3}
                      alignItems="center"
                      justifyContent="space-between"
                    >
                      <Input
                        bg="white"
                        _focus={style.input}
                        w="48%"
                        borderColor="extraOrage.400"
                        variant="rounded"
                        placeholder="Firstname"
                        onChangeText={handleChange("firstname")}
                        onBlur={handleBlur("firstname")}
                        value={values.firstname}
                      />
                      <Input
                        bg="white"
                        _focus={style.input}
                        w="48%"
                        borderColor="extraOrage.400"
                        variant="rounded"
                        placeholder="Lastname"
                        onChangeText={handleChange("lastname")}
                        onBlur={handleBlur("lastname")}
                        value={values.lastname}
                      />
                    </HStack>
                    <HStack
                      space={3}
                      alignItems="center"
                      justifyContent="space-between"
                    >
                      <Input
                        bg="white"
                        _focus={style.input}
                        w="48%"
                        borderColor="extraOrage.400"
                        variant="rounded"
                        placeholder="Country"
                        onChangeText={handleChange("locations.country")}
                        onBlur={handleBlur("locations.country")}
                        value={values.locations.country}
                      />
                      <Input
                        bg="white"
                        _focus={style.input}
                        w="48%"
                        borderColor="extraOrage.400"
                        variant="rounded"
                        placeholder="City"
                        onChangeText={handleChange("locations.city")}
                        onBlur={handleBlur("locations.city")}
                        value={values.locations.city}
                      />
                    </HStack>
                    <TextArea
                      bg="white"
                      _focus={style.input}
                      borderRadius={20}
                      borderColor="extraOrage.400"
                      h={20}
                      placeholder="Biography"
                      onChangeText={handleChange("biography")}
                      onBlur={handleBlur("biography")}
                      value={values.biography}
                    />
                  </VStack>
                  <VStack>
                    <Button
                      isLoading={userLoading}
                      w="50%"
                      size="md"
                      borderRadius="50"
                      bg="extraOrage.400"
                      colorScheme="warning"
                      _text={{ fontSize: "md" }}
                      alignSelf="center"
                      onPress={handleSubmit}
                    >
                      Save
                    </Button>
                    <Button
                      size="sm"
                      variant="link"
                      _text={{ color: "forestGreen.400" }}
                      onPress={() => navigation.navigate("MainProfile")}
                    >
                      Cancel
                    </Button>
                  </VStack>
                </VStack>
              )}
            </Formik>
          )}
        </Center>
      </NativeBaseProvider>
    </View>
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
  },
});

const style = {
  input: { bg: "white", borderColor: "forestGreen.400" },
  container: {
    flex: 1,
    backgroundColor: "#cbd18f",
    alignItems: "center",
    justifyContent: "center",
  },
};

export default EditMainProfileScreen;
