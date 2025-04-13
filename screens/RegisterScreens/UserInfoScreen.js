import React, { useState } from "react";
import {
  View,
  StyleSheet,
  ActivityIndicator,
  Text,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import {
  AppForm,
  AppFormField,
  SubmitButton,
  BackButton,
} from "../../components/forms/index";
import Screen from "../../components/Screen";
import colours from "../../config/colours";

function UserInfoScreen({ navigation }) {
  const [isLoading, setIsLoading] = useState(false);

  const handleNext = (values) => {
    console.log("handleNext called with values:", values);
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      console.log("Navigating from UserInfoScreen with values:", values);
      navigation.navigate("EmailPasswordScreen", { values });
    }, 2000);
  };

  return (
    <Screen>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 20}
      >
        <BackButton />
        <View style={styles.container}>
          <Text style={styles.titleText}>
            Let's start with some easy questions about you.
          </Text>
          {isLoading ? (
            <ActivityIndicator size="large" color={colours.pink} />
          ) : (
            <AppForm
              initialValues={{ firstName: "", lastName: "" }}
              onSubmit={handleNext}
            >
              <View style={styles.fieldContainer}>
                <Text style={styles.instruction}>Enter your first name:</Text>
                <AppFormField
                  style={styles.input}
                  icon="account"
                  placeholder="Firstname"
                  name="firstName"
                />
              </View>
              <View style={styles.fieldContainer}>
                <Text style={styles.instruction}>Enter your last name:</Text>
                <AppFormField
                  style={styles.input}
                  icon="account"
                  placeholder="Lastname"
                  name="lastName"
                />
              </View>
              <SubmitButton title="Next" />
            </AppForm>
          )}
        </View>
      </KeyboardAvoidingView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 10, paddingTop: 40 },
  instruction: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  input: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 15,
  },
  fieldContainer: {
    marginBottom: 20,
  },
  instruction: {
    fontSize: 16,
    marginBottom: 5,
    color: "#888",
  },
  titleText: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 80,
    textAlign: "center",
  },
});

export default UserInfoScreen;
