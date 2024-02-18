import React from "react";
import {
  View,
  StyleSheet,
  Image,
  TouchableWithoutFeedback,
  Platform,
} from "react-native";
import colours from "../config/colours";
import AppText from "./AppText";

function Card({ title, subTitle, image, onPress }) {
  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <View style={styles.card}>
        <View style={styles.imageContainer}>
          <Image
            style={styles.image}
            source={{
              uri: image[0],
            }}
          />
        </View>
        <View style={styles.detailsContainer}>
          <AppText style={styles.title}>{title}</AppText>
          <AppText style={styles.subTitle}>{subTitle}</AppText>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  card: {
    width: 300,
    borderRadius: 15,
    height: 300,
    overflow: "hidden",

    ...Platform.select({
      android: {
        elevation: 5, // Add elevation for Android
      },
      ios: {
        shadowColor: colours.dark,
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
      },
    }),
  },
  imageContainer: {
    backgroundColor: "white",
    borderRadius: 30,
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: 160,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
  },
  // overlay: {
  //   position: "absolute",
  //   top: 0,
  //   left: 0,
  //   right: 0,
  //   bottom: 0,
  //   backgroundColor: "rgba(0, 0, 0, 0.2)",
  // },
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
    fontSize: 18,
    fontWeight: "bold",
    color: colours.white,
  },
  subTitle: {
    fontSize: 16,
    color: colours.light,
  },
  detailsContainer: {
    paddingTop: 20,
    paddingLeft: 15,
  },
  title: {
    marginBottom: 7,
  },
  subTitle: {
    color: colours.medium,
    fontWeight: "bold",
  },
});

export default Card;
