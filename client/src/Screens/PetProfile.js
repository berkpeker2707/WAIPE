import React, { useEffect, useMemo, useState } from "react";
import { StyleSheet } from "react-native";
import { Text, Center } from "native-base";
import {
  selectGetPet,
  selectPetLoading,
  getPetAction,
} from "../Redux/Slices/petSlice";
import { useSelector, useDispatch } from "react-redux";

const PetProfile = ({ navigation, route }) => {
  const { petId } = route.params;
  const dispatch = useDispatch();

  const pet = useSelector(selectGetPet);
  const petLoading = useSelector(selectPetLoading);
  console.log(pet);
  console.log(petLoading);

  useEffect(() => {
    dispatch(getPetAction(petId));
  }, [dispatch, pet?._id]);

  return (
    <Center flex={1} px="3">
      <Text>Pet profile</Text>
    </Center>
  );
};

const styles = StyleSheet.create({});

export default PetProfile;
