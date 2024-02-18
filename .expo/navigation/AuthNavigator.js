import React from "react";
import { View, StyleSheet } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import WelcomeScreen from "../screens/WelcomeScreen";
import LoginScreen from "../screens/loginScreen";
import RegisterScreen from "../navigation/RegistrationNavigator";
import RegistrationNavigator from "../navigation/RegistrationNavigator";

const Stack = createNativeStackNavigator();

function AuthNavigator(props) {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="welcome"
        component={WelcomeScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="login"
        component={LoginScreen}
        options={headerOptions}
      />
      <Stack.Screen
        name="register"
        component={RegistrationNavigator}
        options={headerOptions}
      />
    </Stack.Navigator>
  );
}

const headerOptions = {
  headerTransparent: true,
  headerTintColor: "white",
  headerTitleStyle: {
    fontWeight: "bold",
  },
};

export default AuthNavigator;
