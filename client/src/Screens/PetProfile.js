import React, { useEffect, useMemo, useState } from "react";
import { StyleSheet, View } from "react-native";
import {
  Center,
  Spinner,
  VStack,
  HStack,
  Box,
  ScrollView,
  Image,
} from "native-base";
import {
  selectGetPet,
  selectPetLoading,
  getPetAction,
  getPost,
} from "../Redux/Slices/petSlice";
import { useSelector, useDispatch } from "react-redux";
import SettingsButton from "../Components/SettingsButton";
import NameAndNickname from "../Components/NameAndNickname";
import ProfileAvatar from "../Components/ProfileAvatar";
import InfoCard from "../Components/InfoCard";
import PressableButton from "../Components/PressableButton";

const PetProfile = ({ navigation, route }) => {
  const { petId } = route.params;
  const dispatch = useDispatch();

  const pet = useSelector(selectGetPet);
  const petLoading = useSelector(selectPetLoading);

  console.log(pet.petPost[0]);

  useEffect(() => {
    dispatch(getPetAction(petId));
  }, [dispatch, pet?._id]);

  return (
    <View style={style.container}>
      <Center flex={1} px="3">
        {petLoading ? (
          <Spinner color={"mustard.400"} size="lg" />
        ) : (
          <>
            <SettingsButton onPress={() => navigation.navigate("Settings")} />
            <VStack space={4}>
              <NameAndNickname name={`${pet?.name}`} nickname={"@Nickname"} />
              <ProfileAvatar
                image={pet?.picture}
                letter={`${pet?.name}`}
                onPress={() => console.log("edit pet profile")}
                icon="pencil"
              />
              <InfoCard
                infoText={`${pet?.species}, ${pet?.age}${"\n"}${
                  pet?.interestedIn
                }${"\n"}${pet?.biography}`}
              />
            </VStack>
            <Box w={330} h="40%">
              <ScrollView w={330} h="80">
                <HStack flex="1" flexWrap="wrap" justifyContent="space-between">
                  {pet?.petPost?.map((post, index) => {
                    return (
                      <PressableButton
                        onPress={() =>
                          navigation.navigate("Post", { post: post })
                        }
                      >
                        <Image
                          source={{
                            uri: `${post.picture}`,
                          }}
                          alt="Alternate Text"
                          size="xl"
                          w={160}
                          mr={(index + 1) % 2 === 0 ? "0" : "1"}
                          ml={(index + 1) % 2 !== 0 ? "0" : "1"}
                          mt="1"
                          mb="1"
                          borderRadius="xl"
                          key={index}
                        />
                      </PressableButton>
                    );
                  })}
                </HStack>
              </ScrollView>
            </Box>
          </>
        )}
      </Center>
    </View>
  );
};

const styles = StyleSheet.create({});

const style = {
  container: {
    flex: 1,
    backgroundColor: "#cbd18f",
    alignItems: "center",
    justifyContent: "center",
  },
};

export default PetProfile;
