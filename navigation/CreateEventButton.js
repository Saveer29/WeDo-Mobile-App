import React from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import colours from "../config/colours";
import { useIsFocused } from "@react-navigation/native";

function CreateEventButton({ onPress }) {
  const isFocused = useIsFocused();

  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.container}>
        <MaterialCommunityIcons
          name="plus-circle"
          color={isFocused ? colours.pink : colours.lightPink}
          size={55}
        />
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    borderRadius: 25,
    bottom: 15,
    height: 60,
    overflow: "hidden",
    justifyContent: "center",
    width: 60,
  },
});

export default CreateEventButton;
