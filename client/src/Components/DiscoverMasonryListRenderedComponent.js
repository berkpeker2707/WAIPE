import React, { useMemo } from "react";
import MasonryList from "@react-native-seoul/masonry-list";
import { Image, Pressable, View } from "native-base";

const DiscoverMasonryListRenderedComponent = (props) => {
  const { item, i, navigation } = props;

  const randomBool = useMemo(() => Math.random() < 0.5, []);
  return (
    <Pressable
      onPress={() => {
        item.email
          ? navigation.navigate("UserProfileScreen", {
              userID: item?._id,
            })
          : navigation.navigate("Post", {
              post: item,
            });
      }}
    >
      <View key={item._id} style={[{ marginTop: 12, flex: 1 }]}>
        {item && item.picture ? (
          <Image
            source={{ uri: item.picture }}
            style={{
              height: randomBool ? 150 : 280,
              alignSelf: "stretch",
              marginLeft: i % 2 === 0 ? 0 : 12,
            }}
            resizeMode="cover"
            alt="alt"
          />
        ) : (
          <Image
            source={require("../../assets/icon.png")}
            style={{
              height: randomBool ? 150 : 280,
              alignSelf: "stretch",
              marginLeft: i % 2 === 0 ? 0 : 12,
            }}
            resizeMode="cover"
            alt="alt"
          />
        )}
      </View>
    </Pressable>
  );
};

export default DiscoverMasonryListRenderedComponent;
