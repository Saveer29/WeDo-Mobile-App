import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  Image,
  TouchableOpacity,
  Pressable,
  FlatList,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { Tab, TabView } from "@rneui/themed";
import { useIsFocused } from "@react-navigation/native";

import asyncStorage from "../Auth/asyncStorage";
import authStorage from "../Auth/authStorage";
import eventsApi from "../api/events";
import InterestCard from "../components/InterestCard";
import colours from "../config/colours";
import AppText from "../components/AppText";
import MediumCard from "../components/MediumCard";
import useApi from "../hooks/useApi";
import { defaultImage } from "../config/defaultImage";

function ProfileScreen({ navigation }) {
  const [userInfo, setUserInfo] = useState(null);
  const [events, setEvents] = useState(null);
  const [index, setIndex] = useState(0);
  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) {
      const fetchData = async () => {
        await getEventsApi.request();
        await getUserInfo();
      };

      fetchData();
    }
  }, [isFocused]);

  const handleEditProfile = () => {
    console.log("Edit Profile button Clicked");
    navigation.navigate("Edit Profile", { userInfo });
  };

  const handleProfilePicture = () => {
    console.log("Profile Picture button Clicked");
  };

  const handleInterestButton = () => {
    console.log("Interest button pressed");
  };

  const getEventsApi = useApi(eventsApi.getEvents);

  const attendingEvents = events?.filter((event) =>
    event?.attendees?.includes(userInfo?.id)
  );
  const hostingEvents = events?.filter((event) => event?.host == userInfo?.id);

  const getUserInfo = async () => {
    try {
      const userInfoString = await authStorage.getUserInfo();
      setUserInfo(JSON.parse(userInfoString));
      const eventsString = await asyncStorage.getEvents();
      setEvents(JSON.parse(eventsString));
    } catch (error) {
      console.error("Error getting user info: ", error);
    }
  };

  return (
    <View>
      <View style={styles.logoBackground}>
        <Pressable onPress={() => navigation.navigate("Settings")}>
          <FontAwesome
            style={styles.cogIcon}
            name="cog"
            size={35}
            color={colours.white}
          />
        </Pressable>

        <View style={styles.container}>
          <View>
            <TouchableOpacity
              style={styles.profileButton}
              onPress={handleProfilePicture}
            >
              <Image
                style={styles.profileImage}
                source={
                  userInfo && userInfo.profileImageUri
                    ? { uri: userInfo.profileImageUri[0] }
                    : { uri: defaultImage }
                }
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <View style={styles.container}></View>
      <View style={styles.profile}>
        <View style={styles.name}>
          {userInfo ? (
            <Text style={styles.nameText}>
              {userInfo.firstName} {userInfo.lastName}
            </Text>
          ) : (
            <Text>Loading...</Text>
          )}
          <FontAwesome
            style={styles.checkIcon}
            name="check-circle"
            size={25}
            color={colours.lightPink}
          />
        </View>
      </View>

      <View style={styles.bioContainer}>
        <Text style={styles.bio}>
          {userInfo && userInfo.aboutMe
            ? userInfo.aboutMe
            : "Edit your Profile to tell everyone more about yourself"}
        </Text>
      </View>

      <View style={styles.container}>
        <EditProfileButton text="Edit Profile" onPress={handleEditProfile} />
      </View>

      <Tab
        value={index}
        onChange={(e) => {
          console.log("Tab index changed:", e);
          setIndex(e);
        }}
        indicatorStyle={{
          backgroundColor: colours.pink,
          height: 3,
        }}
        variant="default"
        style={styles.tabBar}
      >
        <Tab.Item
          title="Interests"
          titleStyle={{ fontSize: 18, color: "#000" }}
        />
        <Tab.Item
          title="Upcoming"
          titleStyle={{ fontSize: 18, color: "#000" }}
        />
        <Tab.Item
          title="Hosting"
          titleStyle={{ fontSize: 18, color: "#000" }}
        />
      </Tab>

      <TabView value={index} onChange={setIndex} animationType="spring">
        <TabView.Item style={{ width: "100%" }}>
          <View>
            <View style={styles.editContainer}>
              <Text style={styles.header2}>Interests</Text>
            </View>
            <View style={styles.interests}>
              {userInfo?.interests.map((interest) => (
                <InterestCard
                  key={interest.value} // Make sure to use a unique key
                  value={interest.value}
                  onPress={() => handleInterestButton(interest.value)}
                />
              ))}
            </View>
          </View>
        </TabView.Item>
        <TabView.Item style={{ width: "100%" }}>
          <View>
            <View style={styles.tabContainer}>
              <View>
                <Text style={styles.header2}>Upcoming</Text>
              </View>
              <View style={styles.list}>
                <FlatList
                  nestedScrollEnabled
                  data={attendingEvents}
                  keyExtractor={(event) => event.id}
                  style={{ marginLeft: 0, height: 1000 }}
                  renderItem={({ item }) => (
                    <MediumCard
                      title={item.title}
                      subTitle={item.date}
                      image={item.imageUriList}
                      onPress={() => navigation.navigate("Event Details", item)}
                    />
                  )}
                />
              </View>
            </View>
          </View>
        </TabView.Item>
        <TabView.Item style={{ width: "100%" }}>
          <View>
            <View style={styles.tabContainer}>
              <Text style={styles.header2}>Hosting</Text>
              <View style={styles.list}>
                <FlatList
                  nestedScrollEnabled
                  data={hostingEvents}
                  horizontal={false}
                  keyExtractor={(event) => event.id}
                  style={{ flexDirection: "column" }}
                  renderItem={({ item }) => (
                    <MediumCard
                      title={item.title}
                      subTitle={item.date}
                      image={item.imageUriList}
                      onPress={() => navigation.navigate("Event Details", item)}
                    />
                  )}
                />
              </View>
            </View>
          </View>
        </TabView.Item>
      </TabView>
    </View>
  );
}

const RatingsButton = ({ text, color = colours.lightPink, onPress }) => {
  return (
    <TouchableOpacity style={styles.RatingsButton} onPress={onPress}>
      <AppText style={{ fontSize: 18, color: "white", fontWeight: "bold" }}>
        {text}
      </AppText>
    </TouchableOpacity>
  );
};

const EditProfileButton = ({ text, color = colours.lightPink, onPress }) => {
  return (
    <TouchableOpacity style={styles.EditProfileButton} onPress={onPress}>
      <AppText style={{ fontSize: 18 }}>{text}</AppText>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: { padding: 10 },
  logoBackground: {
    backgroundColor: colours.lightPink,
    height: 200,
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
  interests: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 5,
  },
  text: { fontWeight: "bold", color: colours.lightPink },
  textContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 20,
  },
  header2: {
    left: 15,
    top: 30,
    paddingBottom: 12,
    fontWeight: "bold",
    fontSize: 32,
  },
  profile: {
    flexDirection: "row",
  },
  name: {
    flexDirection: "row",
    flex: 1,
    top: 48,
  },
  nameText: {
    fontWeight: "bold",
    color: colours.lightPink,
    left: 16,
    fontSize: 20,
    justifyContent: "flex-start",
  },
  cogIcon: {
    position: "absolute",
    top: 40,
    right: 20,
  },
  checkIcon: {
    justifyContent: "flex-end",
    flex: 1,
    paddingLeft: 24,
  },
  profileButton: {
    borderWidth: 1,
    width: 150,
    height: 150,
    backgroundColor: "#fff",
    borderRadius: 100,
    borderColor: "#fff",
    padding: "1%",
    margin: "1%",
    position: "absolute",
    top: 90,
    left: 5,
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 6,
    elevation: 5,
  },
  profileImage: {
    height: 150,
    width: 150,
    flex: 1,
    borderRadius: 150,
    borderWidth: 2,
    borderColor: "#fff",
  },
  RatingsButton: {
    borderColor: "#FFF",
    backgroundColor: colours.lightPink,
    borderRadius: 30,
    borderWidth: 0,
    flexDirection: "row",
    height: 45,
    justifyContent: "space-evenly",
    margin: 10,
    paddingVertical: 10,
    width: 70,
    position: "absolute",
    left: 180,
  },
  editContainer: {
    alignContent: "center",
    justifyContent: "center",
    marginBottom: 10,
    height: 50,
  },
  tabContainer: {
    alignContent: "center",
    justifyContent: "center",
    marginBottom: 10,
    height: 350,
    width: "100%",
  },
  EditProfileButton: {
    top: 40,
    borderColor: "#FFF",
    backgroundColor: "#F0EEEE",
    borderRadius: 10,
    borderWidth: 0,
    flexDirection: "row",
    height: 45,
    justifyContent: "space-evenly",
    margin: 10,
    paddingVertical: 10,
    width: "90%",
    textAlign: "center",
  },
  bioContainer: {
    alignContent: "center",
    justifyContent: "center",
    left: 16,
  },
  bio: {
    top: 50,
    width: "90%",
  },
  tabBar: {
    backgroundColor: "white",
    marginTop: 30,
  },
  list: {
    marginTop: 30,
    display: "flex",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: 1000,
  },
});

export default ProfileScreen;
