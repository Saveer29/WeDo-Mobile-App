import React, { useState } from "react";
import {
  KeyboardAvoidingView,
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  Platform,
  ScrollView,
} from "react-native";
import * as Yup from "yup";
import ImageInput from "../components/ImageInput";

import { AppText, ActivityIndicator, Screen } from "../components";
import AppMultiSelect from "../components/AppMultiSelect";
import colours from "../config/colours";
import { defaultImage } from "../config/defaultImage";
import usersApi from "../api/users";
import { AppForm, AppFormField, SubmitButton } from "../components/forms";
import authStorage from "../Auth/authStorage";

const validationSchema = Yup.object().shape({
  firstName: Yup.string().required("First Name is required"),
  lastName: Yup.string().required("Last Name is required"),
  aboutMe: Yup.string(),
});

const interests = [
  { label: "Sport", value: 1 },
  { label: "Social", value: 2 },
  { label: "Entertainment", value: 3 },
  { label: "Education", value: 4 },
  { label: "Gaming", value: 5 },
];

function EditProfileScreen({ route, navigation }) {
  const {
    userInfo: {
      firstName,
      lastName,
      aboutMe,
      profileImageUri,
      interests: userInterests,
    },
  } = route.params;

  const [imageUri, setImageUri] = useState(profileImageUri[0]);
  const [loading, setLoading] = useState(false);
  const [selectedItems, setSelectedItems] = useState(userInterests);

  const handleSelectItem = (item) => {
    if (
      selectedItems.some((selectedItem) => selectedItem.value === item.value)
    ) {
      setSelectedItems(
        selectedItems.filter((selected) => selected.value !== item.value)
      );
    } else {
      setSelectedItems([...selectedItems, item]);
    }
  };

  const handleProfilePicture = (newUri) => {
    console.log("Profile picture pressed");
    setImageUri(newUri); 
  };

  const handleSubmit = async (values) => {
    try {
      setLoading(true);
      const updatedUserInfo = {
        ...values,
        images: [imageUri],
        interests: selectedItems,
      };
      const result = await usersApi.updateUser(updatedUserInfo);
      if (!result.error) {
        await authStorage.updateUserInfo();
        console.log("User info updated successfully");
        navigation.goBack();
      } else {
        setLoading(false);
        console.error("Update User Info handleSubmit error: ", result.problem);
      }
    } catch (err) {
      console.error("handleSubmit error: ", err);
    }
  };

  return (
    <Screen style={styles.container}>
      <ScrollView>
        <KeyboardAvoidingView
          style={styles.keyboardView}
          behavior="padding"
          keyboardVerticalOffset={Platform.select({ ios: 0, android: 500 })}
        >
          <ActivityIndicator visible={loading} />
          <View style={styles.profileImageContainer}>
            <TouchableOpacity style={styles.profileButton} onPress={() => {}}>
              <Image
                style={styles.profileImage}
                source={imageUri ? { uri: imageUri } : { uri: defaultImage }}
              />
            </TouchableOpacity>

            <ImageInput
              imageUri={imageUri}
              onChangeImage={handleProfilePicture}
              profile={true}
            />
          </View>
          <AppForm
            initialValues={{
              firstName,
              lastName,
              aboutMe,
              images: [imageUri],
              interests,
            }}
            onSubmit={handleSubmit}
            validationSchema={validationSchema}
          >
            <AppText style={styles.fieldHeader}>First Name</AppText>
            <AppFormField
              style={styles.input}
              autoCapitalize="none"
              autoCorrect={false}
              maxLength={20}
              name="firstName"
              placeholder="Firstname"
            />

            <AppText style={styles.fieldHeader}>Last Name</AppText>
            <AppFormField
              style={styles.input}
              autoCapitalize="none"
              autoCorrect={false}
              maxLength={20}
              name="lastName"
              placeholder="Lastname"
            />
            <AppText style={styles.fieldHeader}>Interests</AppText>
            <AppMultiSelect
              items={interests}
              name="interests"
              placeholder="Interests"
              width="85%"
              onSelectItem={handleSelectItem}
              selectedItems={selectedItems}
            />

            <AppText style={styles.fieldHeader}>About Me</AppText>
            <AppFormField
              style={[styles.input, styles.multilineInput]}
              autoCapitalize="none"
              autoCorrect={false}
              maxLength={255} 
              multiline 
              name="aboutMe"
              numberOfLines={4} 
              placeholder="About me.."
            />
            <SubmitButton title="Update" />
          </AppForm>
        </KeyboardAvoidingView>
      </ScrollView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: "white", 
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
    // borderWidth: 1,
    // borderColor: "grey",
    // padding: 10,
    // marginBottom: 20, // space between fields
    // borderRadius: 5, // rounded corners
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

export default EditProfileScreen;
