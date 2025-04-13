import React, { useContext, useState } from "react";
import {
  StyleSheet,
  TouchableOpacity,
  View,
  KeyboardAvoidingView,
  ScrollView,
  Text,
  Platform,
} from "react-native";
import * as Yup from "yup";

import { AccountContext } from "../Auth/Account";
import colours from "../config/colours";
import AppText from "../components/AppText";
import {
  AppForm,
  AppFormField,
  ErrorMessage,
  SubmitButton,
} from "../components/forms/index";

const validationSchema = Yup.object().shape({
  email: Yup.string().required().email().label("Email"),
  password: Yup.string().required().min(4).label("Password"),
});

function LoginScreen({ navigation }) {
  const [loginFailed, setLoginFailed] = useState(false);
  const { authenticate } = useContext(AccountContext);

  const handleLogin = async ({ email, password }) => {
    try {
      await authenticate(email, password);
    } catch (err) {
      console.error("Login Error: ", err);
      setLoginFailed(true);
    }
  };

  const handleSignUp = () => {
    navigation.navigate("register");
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView
        contentContainerStyle={{ flexGrow: 1, paddingBottom: 30 }}
        keyboardShouldPersistTaps="handled"
      >
        <View>
          <View style={styles.logoBackground}>
          <Text style={styles.logoText}>Welcome Back</Text> 


          </View>
          <View style={styles.container}>
            <AppText style={styles.heading}>Sign in</AppText>

            <AppForm
              initialValues={{ email: "", password: "" }}
              onSubmit={handleLogin}
              validationSchema={validationSchema}
            >
              <ErrorMessage
                error="Invalid email or password"
                visible={loginFailed}
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

              <SubmitButton style={styles.loginButton} title="Sign In" />
            </AppForm>

            <View style={styles.textContainer}>
              <AppText style={{ fontWeight: "bold" }}>
                Dont have an account?{" "}
              </AppText>
              <TouchableOpacity onPress={handleSignUp}>
                <AppText style={styles.text}>Sign Up</AppText>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 10 },
  loginButton: { marginTop: 40 },
  logoBackground: {
    backgroundColor: colours.lightPink,
    height: 350,
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
    marginTop: 40,
  },

  logoBackground: {
    backgroundColor: colours.lightPink,
    height: 350,
    width: "100%",
    borderBottomEndRadius: 25,
    borderBottomStartRadius: 25,
    justifyContent: 'center', // Center children vertically
    alignItems: 'center', // Center children horizontally
  },
  logoText: {
    fontSize: 30, // or another size that suits your design
    fontWeight: 'bold',
    color: 'white', // or another color that is visible against your background color
    textAlign: 'center', // center the text horizontally
  },
});


export default LoginScreen;
