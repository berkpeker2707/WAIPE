import React, { useEffect, useState } from "react";
import {
  ScrollView,
  Text,
  useSafeArea,
  VStack,
  Input,
  Icon,
  useTheme,
} from "native-base";
import { useDispatch, useSelector } from "react-redux";
import {
  selectGetAllPosts,
  getAllPostsAction,
} from "../Redux/Slices/postSlice";
import { selectAllUsers, getAllUsersAction } from "../Redux/Slices/userSlice";
import SearchBarIcon from "../Components/Icons/SearchBarIcon";
import DiscoverMasonryListComponent from "../Components/DiscoverMasonryListComponent";

const DiscoverScreen = ({ navigation, route }) => {
  const theme = useTheme();

  const dispatch = useDispatch();

  const allPosts = useSelector(selectGetAllPosts);
  const allUsers = useSelector(selectAllUsers);

  useEffect(() => {
    dispatch(getAllPostsAction());

    return () => {
      //clean up function
    };
  }, [dispatch]);
  useEffect(() => {
    dispatch(getAllUsersAction());

    return () => {
      //clean up function
    };
  }, [dispatch]);

  //search section starts
  const [searchText, setSearchText] = useState("");
  const [data, setData] = useState(() => allPosts);

  // handle change event of search input
  const handleChange = (value) => {
    setSearchText(value);
    if (searchText.includes("@")) {
      // by user name search starts
      var searchedBool = allUsers.map((filteredDataParent) => {
        return filteredDataParent.firstname
          .toLowerCase()
          .includes(searchText.replace("@", "").toLowerCase().trim());
      });

      var lowercasedValue = value.toString().toLowerCase().trim();
      if (lowercasedValue === "") {
        setData(allPosts);
      } else {
        setData(filterUserData(searchedBool));
      }
      // by user name search ends
    } else {
      // by pet name search starts
      var searchedBool = allPosts.map((filteredDataParent) => {
        return (
          filteredDataParent.petID.name
            .toLowerCase()
            .includes(searchText.toLowerCase()) ||
          // or check pet description
          filteredDataParent.petID.biography
            .toLowerCase()
            .includes(searchText.toLowerCase())
        );
      });

      var lowercasedValue = value.toString().toLowerCase().trim();
      if (lowercasedValue === "") {
        setData(allPosts);
      } else {
        setData(filterPostData(searchedBool));
      }
      // by pet name search ends
    }
  };

  const onSubmitEditingFunc = (value) => {
    setSearchText(value);
    if (searchText.includes("@")) {
      // by user name search starts
      var searchedBool = allUsers.map((filteredDataParent) => {
        return filteredDataParent.firstname
          .toLowerCase()
          .includes(searchText.replace("@", "").toLowerCase().trim());
      });

      var lowercasedValue = value.toString().toLowerCase().trim();
      if (lowercasedValue === "") {
        setData(allPosts);
      } else {
        setData(filterUserData(searchedBool));
      }
      // by user name search ends
    } else {
      // by pet name search starts
      var searchedBool = allPosts.map((filteredDataParent) => {
        return (
          filteredDataParent.petID.name
            .toLowerCase()
            .includes(searchText.toLowerCase()) ||
          // or check pet description
          filteredDataParent.petID.biography
            .toLowerCase()
            .includes(searchText.toLowerCase())
        );
      });

      var lowercasedValue = value.toString().toLowerCase().trim();
      if (lowercasedValue === "") {
        setData(allPosts);
      } else {
        setData(filterPostData(searchedBool));
      }
      // by pet name search ends
    }
  };

  // filter posts by search text starts
  const filterPostData = (searchedBool) => {
    var filteredData = allPosts
      .map((mamped) => {
        return mamped;
      })
      .filter((filt, filtIN) => {
        return filt && searchedBool[filtIN] === true;
      });

    return filteredData;
  };
  // filter posts by search text ends

  // filter posts by search text starts
  const filterUserData = (searchedBool) => {
    var filteredData = allUsers
      .map((mamped) => {
        return mamped;
      })
      .filter((filt, filtIN) => {
        return filt && searchedBool[filtIN] === true;
      });

    return filteredData;
  };
  // filter posts by search text ends
  //search section ends

  const safeAreaProps = useSafeArea({
    safeArea: true,
    pt: 2,
  });

  return allUsers && allPosts ? (
    <ScrollView {...safeAreaProps} bg={theme.colors.sage[400]}>
      <VStack w="100%" space={5} alignSelf="center">
        <Input
          placeholder="Type pet name or type '@' to search user"
          variant="filled"
          width="100%"
          borderRadius="10"
          borderColor={"#f3f3f3"}
          py="3"
          px="3"
          InputLeftElement={<Icon as={<SearchBarIcon />} />}
          bgColor="#f3f3f3"
          _focus={{
            bg: theme.colors.forestGreen[400],
            borderColor: theme.colors.forestGreen[400],
          }}
          onChangeText={handleChange}
          value={searchText}
          onSubmitEditing={onSubmitEditingFunc}
        />
      </VStack>
      {data && data.length && data.length > 0 ? (
        <DiscoverMasonryListComponent data={data} navigation={navigation} />
      ) : (
        <Text>No records found to display!</Text>
      )}
    </ScrollView>
  ) : (
    <Text>Loading...</Text>
  );
};

export default DiscoverScreen;
