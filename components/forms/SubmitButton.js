import React from "react";
import { useFormikContext } from "formik";
import { StyleSheet, Animated } from "react-native";

import AppButton from "../AppButton";
import colours from "../../config/colours";

function SubmitButton({ title }) {
  const { handleSubmit, values, errors } = useFormikContext();

  const handlePress = () => {
    console.log("SubmitButton pressed");
    handleSubmit();
  };

  return (
    <Animated.View style={styles.buttonContainer}>
      <AppButton title={title} onPress={handlePress} style={styles.button} />
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    overflow: "hidden",
    borderRadius: 25,
  },
  button: {
    backgroundColor: colours.lightPink,
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 25,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
});

export default SubmitButton;
