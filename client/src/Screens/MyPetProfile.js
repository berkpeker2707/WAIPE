import React, { useEffect, memo } from "react";
import { HStack, Image, ScrollView, useDisclose, useTheme } from "native-base";
import {
  selectGetPet,
  selectPetLoading,
  getPetAction,
  selectPetUpdated,
} from "../Redux/Slices/petSlice";
import { useSelector, useDispatch } from "react-redux";
import PressableButton from "../Components/PressableButton";
import ProfilePage from "../Components/ProfilePage";
import {
  getCurrentUserAction,
  selectCurrentUser,
  selectUserUpdated,
} from "../Redux/Slices/userSlice";
import SettingsButton from "../Components/SettingsButton";
import FollowButton from "../Components/FollowButton";
import MenuButton from "../Components/MenuButton";
import { postPetReportAction } from "../Redux/Slices/reportSlice";
import ReportActionsheet from "../Components/ReportActionsheet";

const MyPetProfile = memo(({ navigation, route }) => {
  const { petId } = route.params;
  const dispatch = useDispatch();
  const theme = useTheme();

  const pet = useSelector(selectGetPet);
  const petLoading = useSelector(selectPetLoading);
  const petIsUpdate = useSelector(selectPetUpdated);
  const userIsUpdate = useSelector(selectUserUpdated);
  const currentUser = useSelector(selectCurrentUser);
  const { isOpen, onOpen, onClose } = useDisclose();

  const handleReport = (reportSubject, pet) => {
    dispatch(
      postPetReportAction({
        reportSubject: reportSubject,
        petID: pet._id,
        ownerID: pet.ownerID._id,
        reporter: currentUser._id,
      })
    );
    onClose();
  };

  useEffect(() => {
    dispatch(getPetAction(petId));
    dispatch(getCurrentUserAction());

    return () => {
      //clean up function
    };
  }, [dispatch, petId, petIsUpdate, userIsUpdate]);

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
        post={pet}
      />
      <ProfilePage
        navigation={navigation}
        loading={petLoading}
        name={`${pet?.name}`}
        pictureUrl={pet?.picture}
        infoText={`${pet?.species}, ${pet?.age}${"\n"}${
          pet?.interestedIn
        }${"\n"}${pet?.biography}`}
        editPage={"EditPetProfile"}
        isCurrentUser={pet?.ownerID?._id === currentUser._id}
        user={pet?.ownerID}
        leftTopElement={
          pet?.ownerID?._id === currentUser._id ? (
            <></>
          ) : (
            <MenuButton
              profileType="pet"
              id={petId}
              navigation={navigation}
              openReport={onOpen}
            />
          )
        }
        rightTopElement={
          pet?.ownerID?._id === currentUser._id ? (
            <SettingsButton onPress={() => navigation.navigate("Settings")} />
          ) : (
            <FollowButton currentUser={currentUser} petID={petId} />
          )
        }
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
    </ScrollView>
  );
});

export default MyPetProfile;
