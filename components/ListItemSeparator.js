import React from "react";
import { View, StyleSheet } from "react-native";
import colours from "../config/colours";

function ListItemSeparator() {
  return <View style={styles.separator} />;
}

const styles = StyleSheet.create({
  separator: { height: "100%", width: 5, backgroundColor: colours.white },
});

export default ListItemSeparator;
