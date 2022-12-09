import React, { useEffect, useState } from "react";
import { View } from "react-native";
import { SimpleLineIcons } from "@expo/vector-icons";
import ProfileAvatar from "../Components/ProfileAvatar";
import NameAndNickname from "../Components/NameAndNickname";
import SettingsButton from "../Components/SettingsButton";
import InfoCard from "../Components/InfoCard";
import PetCard from "../Components/PetCard";
import {
  Center,
  Spinner,
  Box,
  Icon,
  ScrollView,
  HStack,
  VStack,
  IconButton,
  extendTheme,
} from "native-base";
import {
  getUser,
  selectCurrentUser,
  selectUserLoading,
} from "../Redux/Slices/userSlice";
import { useSelector, useDispatch } from "react-redux";

const MainProfileScreen = ({ token, navigation }) => {
  const dispatch = useDispatch();

  const currentUser = useSelector(selectCurrentUser);
  const userLoading = useSelector(selectUserLoading);
  const [pets, setPets] = useState([["end"]]);

  const petsMatrix = () => {
    const petsOfUser = currentUser?.pets;
    let rows = [];
    let col = [];

    petsOfUser?.forEach((pet, index) => {
      col.push(pet);
      if ((index + 1) % 3 === 0) {
        rows.push(col);
        col = [];
      }
    });

    if (col.length) {
      if (col.length % 3 !== 0) {
        col.push("end");
      }
      rows.push(col);
    } else {
      rows.push(["end"]);
    }

    return rows;
  };

  useEffect(() => {
    dispatch(getUser(token));
    setPets(petsMatrix());
  }, [dispatch, currentUser?._id]);

  return (
    <View style={style.container}>
      <Center flex={1} px="3">
        {userLoading ? (
          <Spinner color={"mustard.400"} size="lg" />
        ) : (
          <>
            <SettingsButton onPress={() => navigation.navigate("Settings")} />
            <VStack space={4}>
              <NameAndNickname
                name={`${currentUser?.firstname} ${currentUser?.lastname}`}
                nickname={"@Nickname"}
              />
              <ProfileAvatar
                image={currentUser?.picture}
                letter={`${currentUser?.firstname[0]}${currentUser?.lastname[0]}`}
                onPress={() => navigation.navigate("EditMainProfile")}
                icon="pencil"
              />
              <InfoCard
                infoText={`${currentUser?.locations?.country}, ${
                  currentUser?.locations?.city
                }${"\n"}${currentUser?.biography}`}
              />
            </VStack>
            <Box w={330} h="40%">
              <ScrollView w={330} h="80">
                {pets?.map((petRow, index) => {
                  return (
                    <HStack
                      space={3}
                      flex="1"
                      key={index}
                      justifyContent="flex-start"
                    >
                      {petRow?.map((pet, petIndex) => {
                        return (
                          <VStack space={2} key={petIndex}>
                            <Box
                              w={102}
                              alignItems="center"
                              justifyContent="center"
                              mb={4}
                            >
                              {pet !== "end" ? (
                                <PetCard name={pet.name} image={pet.picture} />
                              ) : (
                                <IconButton
                                  borderRadius="70"
                                  variant="ghost"
                                  colorScheme="warning"
                                  alignSelf="center"
                                  width={100}
                                  height={100}
                                  icon={
                                    <Icon
                                      as={SimpleLineIcons}
                                      name="plus"
                                      size="5xl"
                                      color="trueGray.50"
                                    />
                                  }
                                />
                              )}
                            </Box>
                          </VStack>
                        );
                      })}
                    </HStack>
                  );
                })}
              </ScrollView>
            </Box>
          </>
        )}
      </Center>
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
    google: {
      400: "#de5246",
    },
  },
});

const style = {
  container: {
    flex: 1,
    backgroundColor: "#cbd18f",
    alignItems: "center",
    justifyContent: "center",
  },
};

export default MainProfileScreen;
