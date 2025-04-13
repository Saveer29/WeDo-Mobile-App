import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  View,
  ScrollView,
  RefreshControl,
} from "react-native";

import { ListItemSeparator, Screen, Card, MediumCard } from "../components";
import colours from "../config/colours";
import asyncStorage from "../Auth/asyncStorage";
import authStorage from "../Auth/authStorage";
import usersApi from "../api/users";
import eventsApi from "../api/events";
import LoadingScreen from "./LoadingScreen";

function HomeScreen({ navigation }) {
  const [userInfo, setUserInfo] = useState(null);
  const [refreshing, setRefreshing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [events, setEvents] = useState([]);

  const getEvents = async () => {
    const eventsData = await asyncStorage.getEvents();
    setEvents(JSON.parse(eventsData));
  };

  const filterEvents = (events, tag) => {
    return events.filter((event) => event.tags.includes(tag));
  };

  const getUserInfo = async () => {
    try {
      const userInfoString = await authStorage.getUserInfo();
      const parsedUserInfo = JSON.parse(userInfoString);
      setUserInfo(parsedUserInfo);
    } catch (error) {
      console.error("Error getting user info: ", error);
    }
  };

  const handleRefresh = async () => {
    setRefreshing(true);
    try {
      await asyncStorage.updateEvents();
      await getEvents();
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
    setRefreshing(false);
  };

  useEffect(() => {
    setIsLoading(true);
    const fetchData = async () => {
      const userId = await authStorage.getUserId();
      const result = await usersApi.getUserById(userId);
      authStorage.storeUserInfo(JSON.stringify(result[0]));

      const { data } = await eventsApi.getEvents(userId);
      await asyncStorage.storeEvents(JSON.stringify(data));

      await getEvents();
      await getUserInfo();
    };

    fetchData();
    setTimeout(() => {
      setIsLoading(false);
    }, 3000);
  }, []);

  const getDate = (event) => {
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

    return `${date}, ${time}`;
  };

  const filterEventsByInterests = (events, userInterests) =>
    events.length && userInterests.length
      ? events.filter((event) =>
          event.tags.some((tag) => userInterests.includes(tag))
        )
      : [];

  const interestedEvents = filterEventsByInterests(
    events,
    userInfo?.interests || []
  );

  return (
    <Screen style={styles.container}>
      {isLoading ? (
        <LoadingScreen />
      ) : (
        <ScrollView
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              tintColor={colours.pink}
              onRefresh={handleRefresh}
            />
          }
        >
          {/* {getEventsApi.error && (
          <>
            <AppText>Couldn't retrieve the listings</AppText>
            <AppButton title="retry" onPress={LoadEvents} />
          </>
        )} */}
          {/* <FontAwesome
          style={styles.bellIcon}
          name="bell"
          size={30}
          color={colours.pink}
        /> */}
          <View style={styles.lists}>
            <Text style={styles.heading}>For You</Text>
            <FlatList
              showsHorizontalScrollIndicator={false}
              data={events}
              horizontal={true}
              keyExtractor={(event) => event.id.toString()}
              renderItem={({ item }) => (
                <Card
                  title={item.title}
                  subTitle={getDate(item)}
                  image={item.imageUriList}
                  onPress={() => navigation.navigate("Event Details", item)}
                />
              )}
              ItemSeparatorComponent={<ListItemSeparator />}
            />

            <Text style={styles.heading}>Discover</Text>
            <FlatList
              showsHorizontalScrollIndicator={false}
              data={interestedEvents.length ? interestedEvents : events}
              horizontal={true}
              keyExtractor={(event) => event.id.toString()}
              renderItem={({ item }) => (
                <Card
                  title={item.title}
                  subTitle={getDate(item)}
                  image={item.imageUriList}
                  onPress={() => navigation.navigate("Event Details", item)}
                />
              )}
              ItemSeparatorComponent={<ListItemSeparator />}
            />
            <Text style={styles.heading}>Entertainment</Text>
            <FlatList
              showsHorizontalScrollIndicator={false}
              data={filterEvents(events, "Entertainment")}
              horizontal={true}
              keyExtractor={(event) => event.id.toString()}
              renderItem={({ item }) => (
                <Card
                  title={item.title}
                  subTitle={getDate(item)}
                  image={item.imageUriList}
                  onPress={() => navigation.navigate("Event Details", item)}
                />
              )}
              ItemSeparatorComponent={<ListItemSeparator />}
            />
            <Text style={styles.heading}>Social</Text>
            <FlatList
              showsHorizontalScrollIndicator={false}
              data={filterEvents(events, "Social")}
              horizontal={true}
              keyExtractor={(event) => event.id.toString()}
              renderItem={({ item }) => (
                <Card
                  title={item.title}
                  subTitle={getDate(item)}
                  image={item.imageUriList}
                  onPress={() => navigation.navigate("Event Details", item)}
                />
              )}
              ItemSeparatorComponent={<ListItemSeparator />}
            />
          </View>
        </ScrollView>
      )}
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colours.white,
    padding: 20,
  },
  bellIcon: {
    position: "absolute",
    marginBottom: 10,
    left: 20,
  },
  heading: {
    fontSize: 24,
    marginBottom: 10,
    fontWeight: "bold",
  },
});

export default HomeScreen;
