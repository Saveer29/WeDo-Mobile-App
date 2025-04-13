import React, { useState, useContext, useEffect } from "react";
import { View, StyleSheet, ActivityIndicator, Text, KeyboardAvoidingView, Platform } from "react-native";
import UserPool from "../../Auth/UserPool";
import usersApi from "../../api/users";
import { AccountContext } from "../../Auth/Account";
import Screen from "../../components/Screen";
import { BackButton } from "../../components/forms/index";

function ConfirmationScreen({ route, navigation }) {
  const { authenticate } = useContext(AccountContext);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const { email, firstName, lastName, password } = route.params; 

    const registerUser = async () => {
      try {
        const signUpResponse = await new Promise((resolve, reject) => {
          UserPool.signUp(email, password, [], null, (err, data) => {
            if (err) {
              reject(err);
              return;
            }
            resolve(data);
          });
        });

        console.log('signUpResponse:', signUpResponse);


        if (!signUpResponse.userConfirmed) {
          console.log('User is not confirmed, redirecting to TwoFactorScreen.');
          navigation.navigate("TwoFactorScreen", {
            email,
       
          });
          return; 
        }


     
        try {
          await authenticate(email, password);
          console.log('User authenticated, session established.');
        } catch (authErr) {
          console.error('Authentication error:', authErr);
          throw authErr;
        }

        const addUserResult = await usersApi.addUser({
          id: signUpResponse.userSub, 
          email,
          firstName,
          lastName,
          phoneNumber: "0221234567",
          aboutMe: "Edit your profile to add an something about yourself",
          profileImageUri: "../assets/icon.png"
        });

        if (!addUserResult.ok) {
          throw new Error('Failed to add user to database');
        }

       
        navigation.navigate("TwoFactorScreen", {
          email,
        });
      } catch (error) { // 'catch' should follow 'try' directly
        console.error('Registration Error:', error);
        setError(error.message || 'An error occurred during registration.');
        setIsLoading(false);
      }
    };
    registerUser();
  }, [navigation, route.params, authenticate]);

  return (
    <Screen>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 20}
      >
        <BackButton />
        <View style={styles.container}>
          {isLoading ? (
            <ActivityIndicator size="large" color="#0000ff" />
          ) : error ? (
            <Text style={styles.errorText}>{error}</Text>
          ) : null}
        </View>
      </KeyboardAvoidingView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    padding: 10, 
    justifyContent: "center",
    backgroundColor: "#f8f4f4",
    paddingTop: 20
  },
  input: {
    borderBottomWidth: 0,
    borderBottomColor: "#000",
    fontSize: 18,
    fontWeight: "bold",
    color: "#000",
    marginBottom: 15,
  },
  errorText: { 
    color: "red", 
    textAlign: "center",
    fontSize: 16,
    fontWeight: "600",
  },
});

export default ConfirmationScreen;
