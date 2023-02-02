import React, { useEffect } from "react";
import PetCard from "../Components/PetCard";
import { HStack } from "native-base";
import {
  selectUserLoading,
  selectUserUpdated,
  selectUser,
  getUserAction,
} from "../Redux/Slices/userSlice";
import { useSelector, useDispatch } from "react-redux";
import ProfilePage from "../Components/ProfilePage";

const UserProfileScreen = ({ navigation, route }) => {
  const dispatch = useDispatch();
  const userID = route.params.userID;

  const user = useSelector(selectUser);

  const userLoading = useSelector(selectUserLoading);
  const isUpdate = useSelector(selectUserUpdated);

  const infoText = {
    country: user?.locations?.country ? user?.locations?.country : "",
    city: user?.locations?.city ? user?.locations?.city : "",
    biography: user?.biography ? user?.biography : "",
  };

  useEffect(() => {
    dispatch(getUserAction(userID));

    return () => {
      //clean up function
    };
  }, [dispatch, user?._id, isUpdate]);

  return (
    <ProfilePage
      navigation={navigation}
      loading={userLoading}
      name={`${user?.firstname} ${user?.lastname}`}
      pictureUrl={user?.picture}
      infoText={
        (infoText && infoText.country) || infoText.city || infoText.biography
          ? `${infoText.country}, ${infoText.city}${"\n"}${infoText.biography}`
          : "Empty like my heart..."
      }
      editPage={"EditMainProfile"}
      isCurrentUser={false}
    >
      <HStack pl="1" flex="1" flexWrap="wrap">
        {user?.pets?.map((pet, index) => {
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
      </HStack>
    </ProfilePage>
  );
};

export default UserProfileScreen;
