import React, { useEffect } from "react";
import { ActivityIndicator, View, StyleSheet } from "react-native";

import asyncStorage from "../Auth/asyncStorage";
import authStorage from "../Auth/authStorage";
import usersApi from "../api/users";
import eventsApi from "../api/events";
import colours from "../config/colours";

function LoadingScreen() {
  return (
    <View style={styles.container}>
      <ActivityIndicator
        style={styles.loading}
        size="large"
        color={colours.pink}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  animation: {
    width: 150,
  },
  container: {
    alignItems: "center",
    flex: 1,
    justifyContent: "center",
  },
});

export default LoadingScreen;
