import React, { useEffect } from "react";
import { SimpleLineIcons } from "@expo/vector-icons";
import PetCard from "../Components/PetCard";
import { Icon, HStack, IconButton } from "native-base";
import {
  selectUserUpdated,
  getCurrentUserAction,
  selectCurrentUser,
  selectUserLoading,
} from "../Redux/Slices/userSlice";
import { useSelector, useDispatch } from "react-redux";
import ProfilePage from "../Components/ProfilePage";

const MainProfileScreen = ({ navigation }) => {
  const dispatch = useDispatch();

  const currentUser = useSelector(selectCurrentUser);
  const userLoading = useSelector(selectUserLoading);
  const isUpdate = useSelector(selectUserUpdated);

  useEffect(() => {
    dispatch(getCurrentUserAction());
  }, [dispatch, currentUser?._id, isUpdate]);

  return (
    <ProfilePage
      navigation={navigation}
      loading={userLoading}
      name={`${currentUser?.firstname} ${currentUser?.lastname}`}
      pictureUrl={currentUser?.picture}
      infoText={`${currentUser?.locations?.country}, ${
        currentUser?.locations?.city
      }${"\n"}${currentUser?.biography}`}
      editPage={"EditMainProfile"}
    >
      <HStack pl="1" flex="1" flexWrap="wrap" justifyContent="space-between">
        {currentUser?.pets?.map((pet, index) => {
          return (
            <PetCard
              key={index}
              name={pet.name}
              image={pet.picture}
              petId={pet._id}
              navigation={navigation}
            />
          );
        })}
        <IconButton
          borderRadius="70"
          variant="ghost"
          colorScheme="warning"
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
      </HStack>
    </ProfilePage>
  );
};

export default MainProfileScreen;
