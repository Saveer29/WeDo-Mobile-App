import React from "react";
import { StyleSheet } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { FontAwesome, Entypo } from "@expo/vector-icons";

import colours from "../config/colours";
import FeedNavigator from "./FeedNavigator";
import CreateEventButton from "./CreateEventButton";
import ProfileNavigation from "./ProfileNavigation";
import { CreateScreen, CalenderScreen, SearchScreen } from "../screens";

const Tab = createBottomTabNavigator();

function AppNavigator() {
  const tabBarOptions = {
    tabBarStyle: { ...styles.tabBar },
    tabBarActiveTintColor: colours.pink,
    tabBarInactiveTintColor: colours.silver,
    tabBarInactiveBackgroundColor: colours.white,
    tabBarActiveBackgroundColor: colours.white,
  };

  const tabOption = (iconName) => ({
    headerShown: false,
    tabBarShowLabel: false,
    tabBarIcon: ({ color }) => (
      <FontAwesome
        name={iconName}
        color={color}
        size={30}
        style={styles.tabBarIcon}
      />
    ),
  });

  const tabOption1 = (iconName) => ({
    headerShown: false,
    tabBarShowLabel: false,
    tabBarIcon: ({ color }) => (
      <Entypo
        name={iconName}
        color={color}
        size={30}
        style={styles.tabBarIcon}
      />
    ),
  });

  const createTabOptions = ({ navigation }) => ({
    headerShown: false,
    tabBarShowLabel: false,
    tabBarButton: () => (
      <CreateEventButton onPress={() => navigation.navigate("create")} />
    ),
  });

  return (
    <Tab.Navigator screenOptions={tabBarOptions}>
      <Tab.Screen
        name="feed"
        component={FeedNavigator}
        options={tabOption1("home")}
      />
      <Tab.Screen
        name="search"
        component={SearchScreen}
        options={tabOption("search")}
      />
      <Tab.Screen
        name="create"
        component={CreateScreen}
        options={createTabOptions}
      />
      <Tab.Screen
        name="calendar"
        component={CalenderScreen}
        options={tabOption("calendar-o")}
      />
      <Tab.Screen
        name="profile"
        component={ProfileNavigation}
        options={tabOption("user")}
      />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: colours.white,
  },
  tabBarIcon: {},
});

export default AppNavigator;
