import React, { useState, useEffect, useRef, useContext } from "react";
import * as Yup from "yup";
import {
  StyleSheet,
  ActivityIndicator,
  Text,
  KeyboardAvoidingView,
  Platform,
  Animated,
  View,
  Alert,
} from "react-native";

import {
  AppForm,
  AppFormField,
  SubmitButton,
  BackButton,
} from "../../components/forms/index";
import Screen from "../../components/Screen";
import { AccountContext } from "../../Auth/Account";
import colours from "../../config/colours";

const validationSchema = Yup.object().shape({
  email: Yup.string().required().email().label("Email"),
  password: Yup.string().required().min(4).label("Password"),
});

function EmailPasswordScreen({ navigation, route }) {
  const [isLoading, setIsLoading] = useState(false);
  const { values: userData } = route.params;
  const { authenticate, registerUser } = useContext(AccountContext);
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  }, [fadeAnim]);

  const handleRegister = async (values) => {
    try {
      setIsLoading(true);
      let registrationData = { ...userData, ...values };

      const { userConfirmed, userSub } = await registerUser(registrationData);

      if (!userConfirmed) {
        console.log("User is not confirmed, redirecting to TwoFactorScreen.");
        navigation.navigate("TwoFactorScreen", {
          ...registrationData,
          userSub,
        });
        return;
      }
    } catch (err) {
      setIsLoading(false);
      if (err.message === "An account with the given email already exists.") {
        Alert.alert("An account with the given email already exists.");
        return;
      }
      console.error("handleRegister Error: ", err);
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
        <Animated.View style={[styles.container, { opacity: fadeAnim }]}>
          <Text style={styles.titleText}>
            Almost there! Just a few more details.
          </Text>
          {isLoading ? (
            <ActivityIndicator size="large" color={colours.pink} />
          ) : (
            <AppForm
              initialValues={{ email: "", password: "" }}
              onSubmit={handleRegister}
              validationSchema={validationSchema}
            >
              <View style={styles.fieldContainer}>
                <Text style={styles.instruction}>Enter your email:</Text>
                <AppFormField
                  style={styles.input}
                  icon="email"
                  placeholder="Email"
                  name="email"
                  keyboardType="email-address"
                  textContentType="emailAddress"
                />
              </View>
              <View style={styles.fieldContainer}>
                <Text style={styles.instruction}>Enter your password:</Text>
                <AppFormField
                  style={styles.input}
                  icon="lock"
                  placeholder="Password"
                  name="password"
                  secureTextEntry
                  textContentType="password"
                />
              </View>
              <SubmitButton title="Register" />
            </AppForm>
          )}
        </Animated.View>
      </KeyboardAvoidingView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 10, paddingTop: 40 },
  titleText: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 100,
    textAlign: "center",
  },
  input: {
    borderBottomWidth: 0,
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 15,
  },
  instruction: {
    fontSize: 16,
    marginBottom: 5,
    color: "#888",
  },
  fieldContainer: {
    marginBottom: 20,
  },
});

export default EmailPasswordScreen;
