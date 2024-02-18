import React, { useRef } from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import ImageInput from "./ImageInput";

function ImageInputList({
  imageUris = [],
  onRemoveImage,
  onAddImage,
  profile = null,
  onEditImage,
}) {
  const scrollView = useRef();

  return (
    <View>
      {profile ? (
        <View style={styles.container}>
          {imageUris.length ? (
            imageUris.map((uri) => (
              <View key={uri} style={styles.image}>
                <ImageInput
                  imageUri={uri}
                  key={uri}
                  onChangeImage={(uri) => onEditImage(uri)}
                  profile={true}
                />
              </View>
            ))
          ) : (
            <ImageInput onChangeImage={(uri) => onAddImage(uri)} />
          )}
        </View>
      ) : (
        <ScrollView
          ref={scrollView}
          horizontal
          onContentSizeChange={() => scrollView.current.scrollToEnd()}
        >
          <View style={styles.container}>
            {imageUris.map((uri) => (
              <View key={uri} style={styles.image}>
                <ImageInput
                  imageUri={uri}
                  key={uri}
                  onChangeImage={() => onRemoveImage(uri)}
                />
              </View>
            ))}
            <ImageInput onChangeImage={(uri) => onAddImage(uri)} />
          </View>
        </ScrollView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flexDirection: "row" },
  image: { marginRight: 10 },
});

export default ImageInputList;
