import React, { useState } from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import AppText from "./AppText";

function ItemPicker({ label, onPress }) {
  return (
    <TouchableOpacity onPress={onPress}>
      <AppText style={styles.text}>{label}</AppText>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  text: { padding: 20 },
});

export default ItemPicker;
