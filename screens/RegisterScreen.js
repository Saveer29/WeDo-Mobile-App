import React, { useContext } from "react";
import { StyleSheet, View, KeyboardAvoidingView, ScrollView } from "react-native";
import * as Yup from "yup";

import colours from "../config/colours";
import AppText from "../components/AppText";
import { AppForm, AppFormField, SubmitButton } from "../components/forms/index";
import UserPool from "../Auth/UserPool";
import usersApi from "../api/users";
import { AccountContext } from "../Auth/Account";

const validationSchema = Yup.object().shape({
  email: Yup.string().required().email().label("Email"),
  password: Yup.string().required().min(4).label("Password"),
});



function RegisterScreen() {
  const { authenticate } = useContext(AccountContext);
  const handleRegister = async ({ email, firstName, lastName, password }) => {
    UserPool.signUp(email, password, [], null, async (err, data) => {
      if (err) {
        console.error(err);
      }

      const result = await usersApi.addUser({
        id: data.email,
        email,
        firstName,
        lastName,
        phoneNumber: "0221234567",
        aboutMe: "Edit your profile to add an something about yourself",
        profileImageUri: "../assets/icon.png"
      });
      if (result.ok) handleLogin({ email, password });
    });
  };

  const handleLogin = async ({ email, password }) => {
    try {
      await authenticate(email, password);
    } catch (err) {
      console.error("Login Error: ", err);
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.container}>
          <AppText style={styles.heading}>Sign Up</AppText>

          <AppForm
            initialValues={{
              firstName: "",
              lastName: "",
              email: "",
              password: "",
              password1: "",
            }}
            onSubmit={handleRegister}
            validationSchema={validationSchema}
          >
            <AppFormField
              icon="account"
              placeholder="Firstname"
              autoCapitalize="none"
              autoCorrect={false}
              name="firstName"
            />
            <AppFormField
              icon="account"
              placeholder="Lastname"
              autoCapitalize="none"
              autoCorrect={false}
              name="lastName"
            />
            <AppFormField
              icon="email"
              placeholder="Email"
              autoCapitalize="none"
              autoCorrect={false}
              keyboardType="email-address"
              name="email"
              textContentType="emailAddress"
            />

            <AppFormField
              autoCapitalize="none"
              autoCorrect={false}
              icon="lock"
              placeholder="Password"
              name="password"
              textContentType="password"
              secureTextEntry
            />
            <AppFormField
              autoCapitalize="none"
              autoCorrect={false}
              icon="lock"
              name="password1"
              placeholder="Confirm Password"
              secureTextEntry
              textContentType="password"
            />

            <SubmitButton style={styles.loginButton} title="Sign Up" />
          </AppForm>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 10 },
  loginButton: { marginTop: 40 },
  logoBackground: {
    backgroundColor: colours.darkBlue,
    height: 275,
    width: "100%",
    borderBottomEndRadius: 25,
    borderBottomStartRadius: 25,
  },
  heading: {
    fontSize: 34,
    fontWeight: "bold",
    margin: 5,
    marginTop: 25,
  },
  otherSignIn: {
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
  otherSignInButton: {
    borderColor: colours.medium,
    borderRadius: 10,
    borderWidth: 1,
    flexDirection: "row",
    height: 45,
    justifyContent: "space-evenly",
    margin: 10,
    paddingVertical: 5,
    width: "45%",
  },
  text: { fontWeight: "bold", color: colours.blue },
  textContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 20,
  },
});

export default RegisterScreen;
