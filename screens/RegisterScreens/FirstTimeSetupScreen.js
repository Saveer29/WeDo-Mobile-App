import React, { useState, useContext } from "react";
import {
  KeyboardAvoidingView,
  View,
  StyleSheet,
  Image,
  Platform,
} from "react-native";
import * as Yup from "yup";
import ImageInput from "../../components/ImageInput";

import AppText from "../../components/AppText";
import colours from "../../config/colours";
import Screen from "../../components/Screen";
import usersApi from "../../api/users";
import { AppForm, AppFormField, SubmitButton } from "../../components/forms";
import { defaultImage } from "../../config/defaultImage";
import { AccountContext } from "../../Auth/Account";

function FirstTimeSetupScreen({ route }) {
  const registrationData = route.params.registrationData;

  const [imageUri, setImageUri] = useState(defaultImage);
  const {  authenticate } = useContext(AccountContext);

  const handleProfilePicture = (newUri) => {
    setImageUri(newUri); // Update the local state with the new image URI
  };

  const validationSchema = Yup.object().shape({
    aboutMe: Yup.string().required().label("About Me"),
  });

  const handleSubmit = async (values) => {
    const fullUserData = {
      ...registrationData,
      aboutMe: values.aboutMe,
      profileImageUri: defaultImage, // Use selected image or default
    };

    try {
      console.log(imageUri);
      const result = await usersApi.addUser(fullUserData);
      console.log(result);
      await authenticate(registrationData.email, registrationData.password);
    } catch (err) {
      console.error("User creation or login error: ", err);
    }
  };

  const addUser = async () => {
    try {
      const addUserResult = await usersApi.addUser(registrationData);
      console.log("addUser: ", addUser);
    } catch (err) {
      console.error("addUser Error: ", err);
    }
  };

  return (
    <Screen style={styles.container}>
      <KeyboardAvoidingView
        style={styles.keyboardView}
        behavior="padding"
        keyboardVerticalOffset={Platform.select({ ios: 0, android: 500 })}
      >
        <View style={styles.profileImageContainer}>
          <ImageInput
            imageUri={imageUri}
            onChangeImage={handleProfilePicture}
            profile={true}
          />
        </View>
        <AppForm
          initialValues={{
            aboutMe: "",
            images: [imageUri],
          }}
          onSubmit={handleSubmit}
          validationSchema={validationSchema}
        >
          <AppText style={styles.fieldHeader}>About Me</AppText>
          <AppFormField
            style={[styles.input, styles.multilineInput]} // apply the multiline style
            autoCapitalize="none"
            autoCorrect={false}
            maxLength={255} // you might want to allow more characters for "About Me"
            multiline // set multiline property to true
            name="aboutMe"
            numberOfLines={4} // set the number of lines (this is for display, not a limit)
            placeholder="Tell us about yourself..."
          />
          <SubmitButton title="Submit" />
        </AppForm>
      </KeyboardAvoidingView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: "white", // or another color that suits your design
  },
  keyboardView: {
    flex: 1,
  },
  profileImageContainer: {
    alignItems: "center",
    marginBottom: 20,
  },
  input: {
    fontSize: 18, // larger font size
    borderColor: "grey",
    padding: 10,
    marginBottom: 20, // space between fields
    borderRadius: 5, // rounded corners
  },
  multilineInput: {
    height: 100, // specify a height for the multiline input
    textAlignVertical: "top", // align text to the top on Android
  },
  fieldHeader: {
    fontSize: 20, // larger font size for headers
    fontWeight: "bold",
    marginBottom: 5, // space between header and input field
    color: colours.purple, // or another color that suits your design
  },
});

export default FirstTimeSetupScreen;
