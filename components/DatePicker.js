import React from "react";
import { View, StyleSheet } from "react-native";

import colours from "../config/colours";
import AppText from "./AppText";

function DatePicker({ placeholder, width = "100%" }) {
  return (
    <View style={[styles.container, { width }]}>
      <AppText style={styles.text}>{placeholder}</AppText>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colours.light,
    borderRadius: 25,
    flexDirection: "row",
    padding: 15,
    marginVertical: 10,
  },
  text: {
    flex: 1,
  },
});

export default DatePicker;
