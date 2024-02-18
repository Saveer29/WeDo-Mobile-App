import React from "react";
import {
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import colours from "../config/colours";
import AppText from "./AppText";
import defaultImage from "../assets/icon.png";

const windowWidth = Dimensions.get("window").width;

function CalenderCard({ title, subTitle, image, onPress }) {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={[styles.card, { width: (windowWidth * 2) / 3 - 5, height: windowWidth / 2 - 10 }]}> 
        <Image
          style={[styles.image, { height: windowWidth / 2 - 10 }]} 
          source={
            image && Array.isArray(image) && image[0]
              ? { uri: image[0] }
              : defaultImage
          }
        />
        <View style={styles.overlay} />
        <View style={styles.textContainer}>
          <AppText style={styles.title}>{title}</AppText>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    marginBottom: 15,
    borderRadius: 10,
    backgroundColor: colours.white,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  image: {
    width: "100%",
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.2)",
  },
  textContainer: {
    position: "absolute",
    bottom: 10,
    left: 10,
    right: 10,
    backgroundColor: "transparent",
    padding: 5,
    borderRadius: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: colours.white,
  },
  subTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: colours.light,
  },
});

export default CalenderCard;
