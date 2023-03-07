import React, { memo } from "react";
import {
  Center,
  Spinner,
  VStack,
  Box,
  ScrollView,
  Stack,
  useSafeArea,
  useTheme,
  Heading,
  Button,
} from "native-base";
import SettingsButton from "../Components/SettingsButton";
import ProfileAvatar from "../Components/ProfileAvatar";
import InfoCard from "../Components/InfoCard";

const ProfilePage = memo((props) => {
  const theme = useTheme();

  const {
    navigation,
    loading,
    name,
    pictureUrl,
    infoText,
    children,
    editPage,
    isCurrentUser,
    user,
  } = props;

  const safeAreaProps = useSafeArea({
    safeArea: true,
    pt: 2,
  });

  return loading ? (
    <ScrollView
      bg={theme.colors.sage[400]}
      {...safeAreaProps}
      contentContainerStyle={{ flexGrow: 1, justifyContent: "center" }}
    >
      <Spinner color={"mustard.400"} size="lg" />
    </ScrollView>
  ) : (
    <Stack
      safeAreaTop
      alignItems="center"
      justifyContent="center"
      bg={theme.colors.sage[400]}
    >
      {isCurrentUser ? (
        <SettingsButton onPress={() => navigation.navigate("Settings")} />
      ) : (
        <></>
      )}

      <VStack space={4}>
        <Center>
          <Heading>{name}</Heading>
          {user ? (
            <Button
              onPress={() =>
                navigation.navigate("UserProfileScreen", {
                  userID: user._id,
                })
              }
              variant="link"
            >
              {`${user?.firstname} ${user?.lastname}`}
            </Button>
          ) : (
            <></>
          )}
        </Center>
        <ProfileAvatar
          image={pictureUrl}
          letter={`${name[0]}`}
          onPress={() => navigation.navigate(editPage)}
          icon="pencil"
          isCurrentUser={isCurrentUser}
        />
        <InfoCard infoText={infoText} />
      </VStack>
      <Box w={330} h="40%">
        <ScrollView w={330} h="80">
          {children}
        </ScrollView>
      </Box>
    </Stack>
  );
});

export default ProfilePage;
