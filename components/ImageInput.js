import React, { useEffect } from "react";
import {
  View,
  StyleSheet,
  Image,
  TouchableWithoutFeedback,
  Alert,
} from "react-native";
import colours from "../config/colours";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";

function ImageInput({ imageUri, onChangeImage, profile = null }) {
  const requestPermision = async () => {
    // let { status } = await Location.requestForegroundPermissionsAsync();
    // if (status !== "granted")
    //   return alert("Permission to access location was denied");

    const { granted } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!granted) requestPermision();
  };
  useEffect(() => {
    requestPermision();
  });
  const handlePress = () => {
    if (profile) selectImage();
    else {
      if (!imageUri) selectImage();
      else
        Alert.alert("Delete", "Are you sure you want to delete this image?", [
          { text: "Yes", onPress: () => onChangeImage(null) },
          { text: "No" },
        ]);
    }
  };
  const selectImage = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3], //Required or it throws an error
        quality: 0.5, //Specify the quality of compression, from 0 to 1. 0 means compress for small size, 1 means compress for maximum quality.
      });
      if (!result.canceled) onChangeImage(result.assets[0].uri);
    } catch (error) {
      console.error("error reading image: ", error);
    }
  };
  return (
    <TouchableWithoutFeedback onPress={handlePress}>
      <View style={styles.container}>
        {!imageUri && <MaterialCommunityIcons name="camera" size={40} />}
        {imageUri && <Image source={{ uri: imageUri }} style={styles.image} />}
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    backgroundColor: colours.light,
    borderRadius: 15,
    height: 100,
    justifyContent: "center",
    overflow: "hidden",
    width: 100,
  },
  image: { height: "100%", width: "100%" },
});

export default ImageInput;
