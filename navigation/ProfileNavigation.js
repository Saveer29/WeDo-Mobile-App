import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import ProfileScreen from "../screens/ProfileScreen";
import EditProfileScreen from "../screens/EditProfileScreen";
import SettingsScreen from "../screens/SettingsScreen";
import EventDetailsScreen from "../screens/EventDetailsScreen";

const Stack = createNativeStackNavigator();

function ProfileNavigation(props) {
  return (
    <Stack.Navigator mode="modal">
      <Stack.Screen
        name="Profile"
        component={ProfileScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen name="Edit Profile" component={EditProfileScreen} />
      <Stack.Screen name="Settings" component={SettingsScreen} />
      <Stack.Screen name="Event Details" component={EventDetailsScreen} />
    </Stack.Navigator>
  );
}

export default ProfileNavigation;
