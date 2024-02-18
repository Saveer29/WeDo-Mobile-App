import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import UserInfoScreen from "../screens/RegisterScreens/UserInfoScreen";
import EmailPasswordScreen from "../screens/RegisterScreens/EmailPasswordScreen";
import ConfirmationScreen from "../screens/RegisterScreens/ConfirmationScreen";
import TwoFactorScreen from "../screens/RegisterScreens/TwoFactorScreen";
import FirstTimeSetupScreen from "../screens/RegisterScreens/FirstTimeSetupScreen";

const Stack = createStackNavigator();

const RegistrationNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="UserInfoScreen">
      <Stack.Screen
        name="UserInfoScreen"
        component={UserInfoScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="EmailPasswordScreen"
        component={EmailPasswordScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ConfirmationScreen"
        component={ConfirmationScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="TwoFactorScreen"
        component={TwoFactorScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="loginScreen"
        component={ConfirmationScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="FirstTimeSetupScreen"
        component={FirstTimeSetupScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default RegistrationNavigator;
