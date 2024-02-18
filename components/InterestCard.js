import React from "react";
import {
  View,
  StyleSheet,
  Image,
  TouchableWithoutFeedback,
  shadow,
} from "react-native";
import colours from "../config/colours";
import AppText from "./AppText";
import { FontAwesome, MaterialCommunityIcons } from "@expo/vector-icons";

const InterestCard = ({ value = 0, onPress }) => {
  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <View style={styles.card}>
        <FontAwesome
          style={styles.icon}
          name={interests[value - 1].icon}
          size={35}
          color={colours.purple}
        />
        <AppText style={styles.title}>{interests[value - 1].label}</AppText>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  card: {
    top: 24,
    left: 16,
    width: 160,
    height: 128,
    borderRadius: 16,
    backgroundColor: "#fff",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
    margin: 10,
  },

  title: {
    textAlign: "center",
    verticalAlign: "middle",
    top: 76,
  },

  icon: {
    position: "absolute",
    top: 28,
  },
});
export default InterestCard;

const interests = [
  { label: "Sport", value: 1, icon: "soccer-ball-o" },
  { label: "Social", value: 2, icon: "group" },
  { label: "Entertainment", value: 3, icon: "tv" },
  { label: "Education", value: 4, icon: "book" },
  { label: "Gaming", value: 5, icon: "gamepad" },
];
