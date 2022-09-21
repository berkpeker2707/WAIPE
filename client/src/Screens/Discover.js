import React, { useEffect, useState } from "react";
import { View, StyleSheet } from "react-native";
import {
  NativeBaseProvider,
  ScrollView,
  Center,
  Text,
  Button,
  Image,
  Box,
  useSafeArea,
  NativeBaseConfigProvider,
  extendTheme,
} from "native-base";
import { useSelector, useDispatch } from "react-redux";
import { getAllPosts } from "../Redux/Slices/postSlice";
import MasonryList from "@react-native-seoul/masonry-list";

const DiscoverScreen = ({ navigation }) => {
  const dispatch = useDispatch();

  const allPost = useSelector((state) => state.post.allPost);

  useEffect(() => {
    dispatch(getAllPosts());
  }, [dispatch]);

  // console.log(allPost);
  // useEffect(() => {
  //   fetch("http://localhost:8000/notes")
  //     .then((res) => res.json())
  //     .then((data) => setNotes(data));
  // }, []);

  // const handleDelete = async (id) => {
  //   await fetch("http://localhost:8000/notes/" + id, {
  //     method: "DELETE",
  //   });
  //   const newNotes = notes.filter((note) => note.id != id);
  //   setNotes(newNotes);
  // };
  const safeAreaProps = useSafeArea({
    safeAreaTop: true,
    pt: 2,
  });

  return (
    <ScrollView>
      <Box
        flex={1}
        bg="#fff"
        alignItems="center"
        justifyContent="center"
        {...safeAreaProps}
      >
        <Center>
          <Text>I RENDER</Text>
          {allPost?.map((data, index) => (
            <Image
              key={index}
              source={{
                uri: data.postImage,
              }}
              alt="Alternate Text"
              size="xl"
            />
          ))}
        </Center>
      </Box>
    </ScrollView>
  );
};

const theme = extendTheme({
  colors: {
    mustard: {
      400: "#e3b448",
    },
    extraOrage: {
      400: "#E38E48",
    },
    sage: {
      300: "#F8FFE3",
      400: "#cbd18f",
    },
    forestGreen: {
      400: "#3a6b35",
    },
    google: {
      400: "#de5246",
    },
  },
});

const styles = StyleSheet.create({});

export default DiscoverScreen;
