import React, { useState, useContext } from "react";
import { View, StyleSheet, Text, TouchableOpacity, Switch } from "react-native";

import colours from "../config/colours";
import AppText from "../components/AppText";
import { AccountContext } from "../Auth/Account";

function SettingsScreen({ navigation }) {
  const navigate = navigation;
  const { logout, setStatus } = useContext(AccountContext);
  const [pushNotificationsEnabled, setPushNotificationsEnabled] =
    useState(false);
  const [dataSaverEnabled, setDataSaverEnabled] = useState(false);

  const togglePushNotifications = () =>
    setPushNotificationsEnabled((previousState) => !previousState);

  const toggleDataSaver = () =>
    setDataSaverEnabled((previousState) => !previousState);
  const handleLogout = () => {
    logout();
  };

  return (
    <View style={styles.container}>
      <View style={styles.settings}>
        <Text style={styles.settingsHeader}>Notifications</Text>
        <View style={styles.settingsRow}>
          <Text style={styles.settingsText}>Allow Push Notifications</Text>
          <Switch
            trackColor={{ false: "#e5e5e5", true: colours.pink }}
            thumbColor={pushNotificationsEnabled ? "#FFF" : "#FFF"}
            ios_backgroundColor="#d3d3d3"
            onValueChange={togglePushNotifications}
            value={pushNotificationsEnabled}
          />
        </View>
        <Text style={styles.settingsHeader}>Data Usage</Text>
        <View style={styles.settingsRow}>
          <Text style={styles.settingsText}>Data Saver</Text>
          <Switch
            trackColor={{ false: "#e5e5e5", true: colours.pink }}
            thumbColor={dataSaverEnabled ? "#FFF" : "#FFF"}
            ios_backgroundColor="#d3d3d3"
            onValueChange={toggleDataSaver}
            value={dataSaverEnabled}
          />
        </View>
      </View>
      <View style={styles.logoutContainer}>
        <LogoutButton text="Logout" onPress={handleLogout} color="#fff" />
      </View>
    </View>
  );
}

const LogoutButton = ({ text, color = colours.purple, onPress }) => {
  return (
    <TouchableOpacity style={styles.LogoutButton} onPress={onPress}>
      <AppText style={{ fontSize: 18, color: color }}>{text}</AppText>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    flexDirection: "column",
    width: "100%",
  },
  settingsRow: {
    flexDirection: "row",
    padding: 20,
  },
  settingsHeader: {
    fontSize: 26,
    fontWeight: "bold",
    marginTop: 10,
  },
  settingsText: {
    fontSize: 20,
    flex: 1,
  },
  logoutContainer: {
    padding: 10,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    top: 550,
    position: "absolute",
  },
  LogoutButton: {
    borderColor: "#FFF",
    backgroundColor: colours.purple,
    borderRadius: 10,
    borderWidth: 0,
    flexDirection: "row",
    height: 45,
    justifyContent: "space-evenly",
    paddingVertical: 10,
    width: 300,
  },
});

export default SettingsScreen;
