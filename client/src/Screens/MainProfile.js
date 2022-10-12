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
  Button,
  Icon,
  ScrollView,
  HStack,
  VStack,
} from "native-base";
import {
  getUser,
  selectCurrentUser,
  selectUserLoading,
} from "../Redux/Slices/userSlice";
import { useSelector, useDispatch } from "react-redux";

const MainProfileScreen = ({ token }) => {
  const dispatch = useDispatch();

  const currentUser = useSelector(selectCurrentUser);
  const userLoading = useSelector(selectUserLoading);
  const [pets, setPets] = useState();

  const petsMatrix = () => {
    const petsOfUser = currentUser.pets;
    let rows = [];
    let col = [];

    petsOfUser.forEach((pet, index) => {
      col.push(pet);
      if ((index + 1) % 3 === 0) {
        rows.push(col);
        col = [];
      }
    });

    if (col.length) {
      console.log(col);
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
  }, [dispatch]);

  console.log(pets);
  return (
    <View style={style.container}>
      <Center flex={1} px="3">
        {userLoading ? (
          <Spinner color={"mustard.400"} size="lg" />
        ) : (
          <>
            <SettingsButton />
            <NameAndNickname
              name={`${currentUser.firstname} ${currentUser.lastname}`}
              nickname={"@Nickname"}
            />
            <ProfileAvatar
              image={
                "https://images.unsplash.com/photo-1510771463146-e89e6e86560e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=627&q=80"
              }
              letter={`${currentUser.firstname[0]}${currentUser.lastname[0]}`}
            />
            <InfoCard
              infoText={`City, Country${"\n"}${currentUser.biography}`}
            />
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
                            >
                              {pet !== "end" ? (
                                <PetCard name={pet.name} image={pets.picture} />
                              ) : (
                                <Button
                                  borderRadius="70"
                                  variant="ghost"
                                  colorScheme="warning"
                                  alignSelf="center"
                                  width={100}
                                  height={100}
                                  leftIcon={
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

const style = {
  container: {
    flex: 1,
    backgroundColor: "#cbd18f",
    alignItems: "center",
    justifyContent: "center",
  },
};

export default MainProfileScreen;
