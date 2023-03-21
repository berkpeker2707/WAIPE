import React, { useMemo } from "react";
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
        {(item && item.picture.includes(".mp4")) ||
        item.picture.includes(".avi") ||
        item.picture.includes(".mov") ? (
          <Image
            source={{
              uri: item.picture
                ? item.picture
                    .replace(/.mp4/g, ".jpg")
                    .replace(/.avi/g, ".jpg")
                    .replace(/.mov/g, ".jpg")
                : null,
            }}
            style={{
              height: randomBool ? 150 : 280,
              alignSelf: "stretch",
              marginLeft: i % 2 === 0 ? 0 : 12,
            }}
            resizeMode="cover"
            alt="image"
          />
        ) : (
          <Image
            source={{ uri: item.picture ? item.picture : null }}
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
