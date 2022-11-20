import React, { useEffect, useMemo, useState } from "react";
import { View, StyleSheet } from "react-native";
import {
  ScrollView,
  useSafeArea,
  Box,
  AspectRatio,
  Image,
  Text,
  HStack,
  Stack,
} from "native-base";

const SearchScreen = ({ navigation, route }) => {
  const safeAreaProps = useSafeArea({
    safeAreaTop: true,
    pt: 2,
  });

  return <ScrollView {...safeAreaProps}></ScrollView>;
};

const styles = StyleSheet.create({});

export default SearchScreen;
