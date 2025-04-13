import React, { useState, useContext } from "react";
import {
  View,
  StyleSheet,
  Text,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from "react-native";
import {
  AppForm,
  AppFormField,
  SubmitButton,
  BackButton,
} from "../../components/forms/index";
import Screen from "../../components/Screen";
import UserPool from "../../Auth/UserPool";
import usersApi from "../../api/users";
import { AccountContext } from "../../Auth/Account";

function TwoFactorScreen({ navigation, route }) {
  const registrationData = route.params;
  const { verifyAttribute, authenticate } = useContext(AccountContext);

  const addUser = async () => {
    try {
      const addUserResult = await usersApi.addUser(registrationData);
      console.log("addUser: ", addUser);
    } catch (err) {
      console.error("addUser Error: ", err);
    }
  };
  //needs a better function name
  const successActions = async () => {
    navigation.navigate("FirstTimeSetupScreen", { registrationData });
  };

  const handleVerify = async ({ code }) => {
    try {
      const result = await verifyAttribute(registrationData.email, code);
      console.log("Verification successful:", result);
      Alert.alert("Verification Successful", "Code is correct!", [
        {
          text: "OK",
          onPress: () => successActions(),
        },
      ]);
    } catch (err) {
      console.error("Verification failed:", err);
      Alert.alert("Verification Failed", "Incorrect code or other error.", [
        { text: "Try Again" },
      ]);
    }
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
          <Text style={styles.titleText}>Two-Factor Authentication</Text>
          <Text style={styles.instruction}>
            Enter the verification code sent to your email:
          </Text>
          <AppForm initialValues={{ code: "" }} onSubmit={handleVerify}>
            <AppFormField
              style={styles.input}
              icon="numeric"
              placeholder="Verification Code"
              name="code"
              keyboardType="number-pad"
              textContentType="oneTimeCode"
            />
            <SubmitButton title="Verify Code" />
          </AppForm>
        </View>
      </KeyboardAvoidingView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 10, paddingTop: 40 },
  titleText: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  instruction: {
    fontSize: 18,
    marginBottom: 10,
    textAlign: "center",
  },
  input: {
    borderBottomWidth: 0,
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 15,
  },
});

export default TwoFactorScreen;
