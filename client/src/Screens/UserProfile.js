import React, { useEffect } from "react";
import PetCard from "../Components/PetCard";
import { HStack, ScrollView, useDisclose, useTheme } from "native-base";
import {
  selectUserLoading,
  selectUserUpdated,
  selectUser,
  getUserAction,
  selectCurrentUser,
} from "../Redux/Slices/userSlice";
import { useSelector, useDispatch } from "react-redux";
import ProfilePage from "../Components/ProfilePage";
import MenuButton from "../Components/MenuButton";
import { postUserReportAction } from "../Redux/Slices/reportSlice";
import ReportActionsheet from "../Components/ReportActionsheet";

const UserProfileScreen = ({ navigation, route }) => {
  const dispatch = useDispatch();
  const theme = useTheme();
  const userID = route.params.userID;

  const user = useSelector(selectUser);

  const userLoading = useSelector(selectUserLoading);
  const isUpdate = useSelector(selectUserUpdated);
  const currentUser = useSelector(selectCurrentUser);
  const { isOpen, onOpen, onClose } = useDisclose();

  const infoText = {
    country: user?.locations?.country ? user?.locations?.country : "",
    city: user?.locations?.city ? user?.locations?.city : "",
    biography: user?.biography ? user?.biography : "",
  };

  const handleReport = (reportSubject, userID) => {
    dispatch(
      postUserReportAction({
        reportSubject: reportSubject,
        userID: userID,
        reporter: currentUser._id,
      })
    );
    onClose();
  };

  useEffect(() => {
    dispatch(getUserAction(userID));

    return () => {
      //clean up function
    };
  }, [dispatch, user?._id, isUpdate]);

  return (
    <ScrollView
      bg={theme.colors.sage[400]}
      contentContainerStyle={{
        flexGrow: 1,
      }}
    >
      <ReportActionsheet
        isOpen={isOpen}
        onClose={onClose}
        handleReport={handleReport}
        post={userID}
      />
      <ProfilePage
        navigation={navigation}
        loading={userLoading}
        name={`${user?.firstname} ${user?.lastname}`}
        pictureUrl={user?.picture}
        infoText={
          (infoText && infoText.country) || infoText.city || infoText.biography
            ? `${infoText.country}, ${infoText.city}${"\n"}${
                infoText.biography
              }`
            : "Empty like my heart..."
        }
        editPage={"EditMainProfile"}
        isCurrentUser={false}
        leftTopElement={
          <MenuButton
            profileType="user"
            id={user?._id}
            navigation={navigation}
            openReport={onOpen}
          />
        }
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
    </ScrollView>
  );
};

export default UserProfileScreen;
