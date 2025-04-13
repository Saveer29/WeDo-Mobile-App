import React, { useState } from "react";
import { StyleSheet, KeyboardAvoidingView, ScrollView } from "react-native";
import * as Yup from "yup";
import { useNavigation } from "@react-navigation/native";

import Screen from "../components/Screen";
import {
  AppForm,
  AppFormField,
  AppFormPicker,
  SubmitButton,
} from "../components/forms";
import FormImagePicker from "../components/forms/FormImagePicker";
import eventsApi from "../api/events";
import { ActivityIndicator } from "../components";

const categories = [
  { label: "Sport", value: 1 },
  { label: "Social", value: 2 },
  { label: "Entertainment", value: 3 },
  { label: "Education", value: 4 },
  { label: "Gaming", value: 5 },
];

const validationSchema = Yup.object().shape({
  title: Yup.string().required().min(1).label("Title"),
  description: Yup.string().label("Description"),
  category: Yup.object().required().nullable().label("Category"),
  date: Yup.string(),
  time: Yup.string(),
  capacity: Yup.number().required().positive().integer().label("Capacity"),
  images: Yup.array().min(1, "Please Select at least 1 image"),
});

function CreateEventScreen() {
  const navigation = useNavigation();

  const [uploadVisible, setUploadVisible] = useState(false);

  const handleSubmit = async (values, { resetForm }) => {
    setUploadVisible(true);
    const result = await eventsApi.addEvent(values);

    setUploadVisible(false);
    alert("Successfully Created Event");
    resetForm();
  };

  return (
    <Screen style={styles.container}>
      <ActivityIndicator visible={uploadVisible} />
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior="padding"
        keyboardVerticalOffset={-150}
      >
        <ScrollView>
          <AppForm
            initialValues={{
              title: "",
              description: "",
              date: "",
              time: "",
              category: null,
              capacity: "",
              images: [],
            }}
            onSubmit={handleSubmit}
            validationSchema={validationSchema}
          >
            <FormImagePicker name="images" />
            <AppFormField
              autoCapitalize="none"
              autoCorrect={false}
              maxLength={50}
              name="title"
              placeholder="Title"
            />

            <AppFormPicker
              mode="time"
              name="time"
              placeholder="Time"
              width="50%"
            />
            <AppFormPicker
              mode="date"
              name="date"
              placeholder="Date"
              width="80%"
            />
            <AppFormPicker
              items={categories}
              name="category"
              placeholder="Category"
              width="65%"
            />
            <AppFormField
              keyboardType="numeric" // Ensure numeric input for capacity
              name="capacity"
              placeholder="Capacity"
              width="30%"
            />
            <AppFormField
              autoCapitalize="none"
              autoCorrect={false}
              maxLength={255}
              multiline
              name="description"
              numberOfLines={3}
              placeholder="Description"
            />
            <SubmitButton title="Create" />
          </AppForm>
        </ScrollView>
      </KeyboardAvoidingView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20 },
});

export default CreateEventScreen;
