import React, { useEffect } from "react";
import { SimpleLineIcons } from "@expo/vector-icons";
import PetCard from "../Components/PetCard";
import { Icon, HStack, IconButton, useTheme } from "native-base";
import {
  selectCurrentUser,
  selectUserLoading,
  selectUserUpdated,
  getCurrentUserAction,
} from "../Redux/Slices/userSlice";
import { useSelector, useDispatch } from "react-redux";
import ProfilePage from "../Components/ProfilePage";

const UserProfileScreen = ({ navigation, route }) => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const { userID } = route.params;
  console.log(userID);

  const currentUser = useSelector(selectCurrentUser);
  const userLoading = useSelector(selectUserLoading);
  const isUpdate = useSelector(selectUserUpdated);

  const infoText = {
    country: currentUser?.locations?.country
      ? currentUser?.locations?.country
      : "",
    city: currentUser?.locations?.city ? currentUser?.locations?.city : "",
    biography: currentUser?.biography ? currentUser?.biography : "",
  };

  useEffect(() => {
    dispatch(getCurrentUserAction());

    return () => {
      //clean up function
    };
  }, [dispatch, currentUser?._id, isUpdate]);

  return (
    <ProfilePage
      navigation={navigation}
      loading={userLoading}
      name={`${currentUser?.firstname} ${currentUser?.lastname}`}
      pictureUrl={currentUser?.picture}
      infoText={
        (infoText && infoText.country) || infoText.city || infoText.biography
          ? `${infoText.country}, ${infoText.city}${"\n"}${infoText.biography}`
          : "Empty like my heart..."
      }
      editPage={"EditMainProfile"}
    >
      <HStack pl="1" flex="1" flexWrap="wrap">
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
          m="4px"
          icon={
            <Icon
              as={SimpleLineIcons}
              name="plus"
              size="5xl"
              color={theme.colors.trueGray[50]}
            />
          }
        />
      </HStack>
    </ProfilePage>
  );
};

export default UserProfileScreen;
