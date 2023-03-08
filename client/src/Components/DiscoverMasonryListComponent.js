import React from "react";
import MasonryList from "@react-native-seoul/masonry-list";
import DiscoverMasonryListRenderedComponent from "./DiscoverMasonryListRenderedComponent";

const DiscoverMasonryListComponent = (props) => {
  const { data, navigation } = props;
  return (
    <MasonryList
      style={{ alignSelf: "stretch" }}
      data={data}
      keyExtractor={(item) => item._id}
      numColumns={2}
      showsVerticalScrollIndicator={false}
      renderItem={({ item, i }) => (
        <DiscoverMasonryListRenderedComponent
          item={item}
          i={i}
          navigation={navigation}
        />
      )}

      // onRefresh={() => refetch({ first: ITEM_CNT })}
      // onEndReachedThreshold={0.1}
      // onEndReached={() => loadNext(ITEM_CNT)}
    />
  );
};

export default DiscoverMasonryListComponent;
