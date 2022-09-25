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
} from "native-base";
import { useSelector, useDispatch } from "react-redux";
import { getAllPosts } from "../Redux/Slices/postSlice";
import MasonryList from "@react-native-seoul/masonry-list";

//check this one later//
//source: https://www.npmjs.com/package/@react-native-seoul/masonry-list

const DiscoverScreen = ({ navigation, route }) => {
  const dispatch = useDispatch();
  const [allPostState, setAllPostState] = useState(route.params.allPost);

  useEffect(() => {
    dispatch(getAllPosts());
  }, [dispatch]);

  console.log(allPostState);
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

  const PhotoCard = ({ item, style }) => {
    const randomBool = useMemo(() => Math.random() < 0.5, []);
    return (
      <View key={item.id} style={[{ marginTop: 12, flex: 1 }, style]}>
        <Image
          source={{ uri: item.postImage }}
          style={{
            height: randomBool ? 150 : 280,
            alignSelf: "stretch",
          }}
          resizeMode="cover"
          alt="alt"
        />
      </View>
    );
  };

  const renderItem = ({ item, i }) => {
    return (
      <PhotoCard item={item} style={{ marginLeft: i % 2 === 0 ? 0 : 12 }} />
    );
  };

  return (
    <ScrollView {...safeAreaProps}>
      <MasonryList
        style={{ alignSelf: "stretch" }}
        data={allPostState}
        numColumns={2}
        showsVerticalScrollIndicator={false}
        renderItem={renderItem}
        onRefresh={() => refetch({ first: ITEM_CNT })}
        onEndReachedThreshold={0.1}
        onEndReached={() => loadNext(ITEM_CNT)}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({});

export default DiscoverScreen;
