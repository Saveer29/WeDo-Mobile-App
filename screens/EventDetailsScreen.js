import React, { useState, useEffect } from "react";
import { View, StyleSheet, Image, Text } from "react-native";

import { AppText, AppButton, EventInfo, Screen } from "../components";
import colours from "../config/colours";
import eventsApi from "../api/events";
import usersApi from "../api/users";
import asyncStorage from "../Auth/asyncStorage";
import authStorage from "../Auth/authStorage";
import { defaultImage } from "../config/defaultImage";

function EventDetailsScreen({ route }) {
  const event = route.params;
  const [attending, setAttending] = useState(false);
  const [host, setHost] = useState({});

  const eventDate = new Date(`${event.date}T${event.time}`);

  const dateFormatOptions = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  const timeFormatOptions = {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  };

  const date = eventDate.toLocaleString([], dateFormatOptions);
  const time = eventDate.toLocaleString([], timeFormatOptions);

  useEffect(() => {
    try {
      const checkIfAttending = async () => {
        const userId = await authStorage.getUserId();
        if (event.attendees.includes(userId)) setAttending(true);
        const host = await usersApi.getUserById(event.host);
        setHost(host[0]);
      };

      checkIfAttending();
    } catch (err) {
      console.error("event details useEffect: ", err);
    }
  }, []);

  const handleJoinButton = async () => {
    try {
      setAttending(true);
      const data = await eventsApi.joinEvent(event);
      await asyncStorage.updateEvents(data);
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  };

  const handleLeaveButton = async () => {
    try {
      setAttending(false);
      const data = await eventsApi.leaveEvent(event);
      await asyncStorage.updateEvents(data);
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  };
  return (
    <Screen style={styles.container}>
      <Image
        style={styles.image}
        source={{
          uri: event.imageUriList[0],
        }}
      />
      <View style={styles.detailsContainer}>
        <AppText style={styles.title}>{event.title}</AppText>
        <AppText style={styles.date}>{date}</AppText>
        <AppText style={styles.time}>{time}</AppText>

        <Text style={styles.desc}>{event.description}</Text>

        <View style={styles.hostContainer}>
          <EventInfo
            image={
              host && host.profileImageUri
                ? host.profileImageUri[0]
                : defaultImage
            }
            title={
              host ? host.firstName + " " + host.lastName : "Saveer Govindu"
            }
            subtitle={"4.9 Rating"}
          />
        </View>
      </View>
      <View style={styles.joinEventContainer}>
        {attending ? (
          <AppButton
            title="Leave Event"
            onPress={handleLeaveButton}
            colour={colours.purple}
            style={styles.JoinEventButton}
          />
        ) : (
          <AppButton
            title="Join Event"
            onPress={handleJoinButton}
            colour={colours.purple}
            style={styles.JoinEventButton}
          />
        )}
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  detailsContainer: { padding: 20 },
  image: { width: "100%", height: 300 },
  hostContainer: { marginVertical: 10 },
  date: {
    color: colours.blue,
    fontSize: 20,
    fontWeight: "bold",
  },
  time: {
    color: colours.blue,
    fontSize: 18,
    fontWeight: "bold",
    marginTop: -1,
  },
  JoinEventButton: {
    backgroundColor: colours.purple,
    width: "90%",
  },
  joinEventContainer: {
    alignItems: "center",
    justifyContent: "flex-start",
    flex: 1,
    width: "100%",
  },
  title: { fontSize: 24, fontWeight: "500" },

  desc: {
    color: "black",
    height: 75,
    marginTop: 10,
  },
});

export default EventDetailsScreen;
