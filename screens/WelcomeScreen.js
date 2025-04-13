import React from "react";
import { View, StyleSheet, Image, Text } from "react-native";
import AppButton from "../components/AppButton";
import colours from "../config/colours";
import logo from "../assets/WeDo-White.png";

function WelcomeScreen({ navigation }) {

  const imageScale = 0.7; 

  return (
    <>
      <View style={styles.logoBackground}>
        <View style={styles.logoContainer}>
        <Image source={logo} style={[styles.logo, { transform: [{ scale: imageScale }] }]} /> 
          <Text style={styles.welcomeText}>WeDo</Text>
        </View>

      </View>



      <View style={styles.buttonsContainer}>
        <AppButton
          title="Login"
          colour="lightPink"
          onPress={() => navigation.navigate("login")}
        />
        <AppButton
          title="Register"
          colour="pink"
          onPress={() => navigation.navigate("register")}
        />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  buttonsContainer: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    marginBottom: 20,
    padding: 10,
  },
  logoBackground: {
    backgroundColor: colours.lightPink,
    height: 650,
    width: "100%",
    borderBottomEndRadius: 25,
    borderBottomStartRadius: 25,
    alignItems: "center",

  },

  logo: {
    width: 300, 
    height: 320, 
  },
  welcomeText: {
    fontSize: 60, 
    fontWeight: 'bold',
    marginTop: -50, 
    color: 'white', 
  },
  logoContainer: {
    position: 'absolute', 
    top: 180, 
    alignItems: 'center', 
  },
});

export default WelcomeScreen;
