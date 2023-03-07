import React, { useEffect } from "react";
import { SimpleLineIcons } from "@expo/vector-icons";
import PetCard from "../Components/PetCard";
import {
  Icon,
  HStack,
  IconButton,
  useTheme,
  useSafeArea,
  ScrollView,
} from "native-base";
import {
  selectCurrentUser,
  selectUserLoading,
  selectUserUpdated,
  getCurrentUserAction,
} from "../Redux/Slices/userSlice";
import { useSelector, useDispatch } from "react-redux";
import ProfilePage from "../Components/ProfilePage";

const MainProfileScreen = ({ navigation }) => {
  const theme = useTheme();
  const dispatch = useDispatch();

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

  const safeAreaProps = useSafeArea({
    safeArea: true,
    pt: 2,
  });
  return (
    <ScrollView
      bg={theme.colors.sage[400]}
      contentContainerStyle={{
        flexGrow: 1,
      }}
    >
      <ProfilePage
        navigation={navigation}
        loading={userLoading}
        name={`${currentUser?.firstname} ${currentUser?.lastname}`}
        pictureUrl={currentUser?.picture}
        infoText={
          (infoText && infoText.country) || infoText.city || infoText.biography
            ? `${infoText.country}, ${infoText.city}${"\n"}${
                infoText.biography
              }`
            : "Empty like my heart..."
        }
        editPage={"EditMainProfile"}
        isCurrentUser={true}
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
    </ScrollView>
  );
};

export default MainProfileScreen;
