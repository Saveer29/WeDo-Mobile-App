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

function LargeCard({ title, subTitle, image, onPress }) {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={[styles.card, { width: windowWidth - 40 }]}>
        <Image
          style={styles.image}
          source={
            image && Array.isArray(image) && image[0]
              ? { uri: image[0] }
              : defaultImage
          }
        />
        <View style={styles.overlay} />
        <View style={styles.textContainer}>
          <AppText style={styles.title}>{title}</AppText>
          <AppText style={styles.subTitle}>{subTitle}</AppText>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    marginBottom: 20,
    borderRadius: 15,
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
    height: 400,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,

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
    bottom: 20,
    left: 20,
    right: 20,
    backgroundColor: "transparent",
    padding: 10,
    borderRadius: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: colours.white,
  },
  subTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: colours.light,
  },
});

export default LargeCard;
