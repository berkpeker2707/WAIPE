import React, { useEffect, useMemo, useState } from "react";
import { View, StyleSheet } from "react-native";
import {
  ScrollView,
  Center,
  Text,
  Button,
  Image,
  Box,
  useSafeArea,
  Pressable,
  VStack,
  Input,
  Icon,
  useTheme,
  Divider,
} from "native-base";
import MasonryList from "@react-native-seoul/masonry-list";
import { useDispatch, useSelector } from "react-redux";
import {
  selectGetAllPosts,
  getAllPostsAction,
} from "../Redux/Slices/postSlice";
import SearchBarIcon from "../Components/Icons/SearchBarIcon";
import DiscoverMasonryListComponent from "../Components/DiscoverMasonryListComponent";

const DiscoverScreen = ({ navigation, route }) => {
  const theme = useTheme();

  const dispatch = useDispatch();

  const allPosts = useSelector(selectGetAllPosts);

  useEffect(() => {
    dispatch(getAllPostsAction());

    return () => {
      //clean up function
    };
  }, [dispatch]);

  //search section starts

  const [searchText, setSearchText] = useState("");
  const [data, setData] = useState(() => allPosts);

  // exclude column list from filter
  const excludeColumns = ["_id", "like"];

  // handle change event of search input
  const handleChange = (value) => {
    setSearchText(value);
    var searchedBool = allPosts.map((filteredDataParent) => {
      return filteredDataParent.petID.name
        .toLowerCase()
        .includes(searchText.toLowerCase());
    });

    var lowercasedValue = value.toString().toLowerCase().trim();
    if (lowercasedValue === "") {
      setData(allPosts);
    } else {
      setData(filterData(searchedBool));
    }
  };

  const onSubmitEditingD = (value) => {
    var searchedBool = allPosts.map((filteredDataParent) => {
      return filteredDataParent.petID.name
        .toLowerCase()
        .includes(searchText.toLowerCase());
    });

    var lowercasedValue = value.toString().toLowerCase().trim();
    if (lowercasedValue === "") {
      setData(allPosts);
    } else {
      setData(filterData(searchedBool));
    }
  };

  // filter records by search text
  const filterData = (searchedBool) => {
    var filteredData = allPosts
      .map((mamped) => {
        return mamped;
      })
      .filter((filt, filtIN) => {
        return filt && searchedBool[filtIN] === true;
      });

    return filteredData;
    // .filter((item) => {
    //   return Object.keys(item).some((key) =>
    //     excludeColumns.includes(key)
    //       ? false
    //       : item[key].toString().toLowerCase().includes(lowercasedValue)
    //   );
    // });

    // .map((d, i) => {
    //   return (
    //     //   <Text key={i} className="box" style={{ backgroundColor: d.color }}>
    //     //     <Text>Name: </Text>
    //     d.name
    //     //     <Divider />
    //     //   </Text>
    //   );
    // });
    // setData(filteredData);
    // console.log(filteredData);
  };

  //search section ends

  const safeAreaProps = useSafeArea({
    safeArea: true,
    pt: 2,
  });

  return allPosts ? (
    <ScrollView {...safeAreaProps}>
      <VStack w="100%" space={5} alignSelf="center">
        <Input
          placeholder="Search"
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
          onSubmitEditing={onSubmitEditingD}
        />
      </VStack>

      {data && data.length && data.length > 1 ? (
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
