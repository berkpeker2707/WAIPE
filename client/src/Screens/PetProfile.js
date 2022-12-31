import React, { useEffect } from "react";
import { HStack, Image } from "native-base";
import {
  selectGetPet,
  selectPetLoading,
  getPetAction,
  selectPetUpdated,
} from "../Redux/Slices/petSlice";
import { useSelector, useDispatch } from "react-redux";
import PressableButton from "../Components/PressableButton";
import ProfilePage from "../Components/ProfilePage";

const PetProfile = ({ navigation, route }) => {
  const { petId } = route.params;
  const dispatch = useDispatch();

  const pet = useSelector(selectGetPet);
  const petLoading = useSelector(selectPetLoading);
  const isUpdate = useSelector(selectPetUpdated);

  console.log(pet._id);

  useEffect(() => {
    dispatch(getPetAction(petId));
  }, [dispatch, petId, isUpdate]);

  return (
    <ProfilePage
      navigation={navigation}
      loading={petLoading}
      name={`${pet?.name}`}
      pictureUrl={pet?.picture}
      infoText={`${pet?.species}, ${pet?.age}${"\n"}${
        pet?.interestedIn
      }${"\n"}${pet?.biography}`}
      editPage={"EditPetProfile"}
    >
      <HStack flex="1" flexWrap="wrap" justifyContent="space-between">
        {pet?.petPost?.map((post, index) => {
          return (
            <PressableButton
              key={index}
              onPress={() => navigation.navigate("Post", { post: post })}
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
              />
            </PressableButton>
          );
        })}
      </HStack>
    </ProfilePage>
  );
};

export default PetProfile;
