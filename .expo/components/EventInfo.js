import React from "react";
import { View, StyleSheet, Image } from "react-native";
import AppText from "./AppText";
import colours from "../config/colours";

function EventInfo({ title, subtitle, image }) {
  return (
    <View style={styles.container}>
      {image && <Image style={styles.image} source={{ uri: image }} />}
      <View>
        <AppText style={styles.title}>{title}</AppText>
        <AppText style={styles.subtitle}>{subtitle}</AppText>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flexDirection: "row" },
  image: { width: 70, height: 70, borderRadius: 35, marginRight: 10 },
  subtitle: { color: colours.medium },
  title: { fontWeight: 500, marginBottom: 5 },
});

export default EventInfo;
