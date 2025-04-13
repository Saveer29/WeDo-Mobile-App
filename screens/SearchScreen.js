import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  TextInput,
  Platform,
} from "react-native";
import { Icon } from "react-native-elements";
import { useNavigation } from "@react-navigation/native";

import eventsApi from "../api/events";
import useApi from "../hooks/useApi";
import CardListView from "../components/CardListView";
import Screen from "../components/Screen";
import CategoryButtons from "../components/CategoryButtons";
import colours from "../config/colours";



const SearchScreen = () => {
  const [searchText, setSearchText] = useState("");
  const [searchInitiated, setSearchInitiated] = useState(false);
  const navigation = useNavigation();
  const {
    data: events,
    request: searchEvents,
    error,
    loading,
  } = useApi(eventsApi.getEventBySearch);

  const handleSearch = (text) => {
    const trimmedText = text.trim();
    if (trimmedText.length > 0) {
      setSearchText(trimmedText);
      searchEvents(trimmedText);
      setSearchInitiated(true);
    } else {
      setSearchInitiated(false);
      filteredEvents = [];
    }
  };

  let filteredEvents =
    events && Array.isArray(events)
      ? events.filter(
          (event) =>
            event.title &&
            typeof event.title === "string" &&
            event.title.toLowerCase().includes(searchText.toLowerCase())
        )
      : [];

  return (
    <Screen style={styles.container} useScrollView={false}>
      <View style={styles.searchBarContainer}>
        <Icon
          name="search"
          size={20}
          color={colours.dark}
          style={styles.icon}
        />
        <TextInput
          style={Platform.OS === "ios" ? styles.inputIOS : styles.inputAndroid}
          placeholder="Search..."
          onChangeText={(text) => handleSearch(text)}
          clearButtonMode="always"
          returnKeyType="search"
        />
      </View>

      {loading ? (
        <ActivityIndicator
          style={styles.loading}
          size="large"
          color={colours.pink}
        />
      ) : error ? (
        <Text style={styles.errorText}>
          An error occurred. Please try again later.
        </Text>
      ) : (
        <View style={styles.resultsContainer}>
          {filteredEvents.length > 0 ? (
            <CardListView data={filteredEvents} navigation={navigation} />
          ) : (
            <>
              {searchInitiated && searchText.length > 0 ? (
                <View style={styles.noResultsContainer}>
                  <Text>Not what you're looking for?</Text>
                  <CategoryButtons />
                </View>
              ) : (
                <View style={styles.noResultsContainer}>
                  <Text>Looking for something?</Text>
                </View>
              )}
            </>
          )}
        </View>
      )}
    </Screen>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colours.white,
    padding: 20,
  },
  searchBarContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f0f0f0",
    borderRadius: Platform.OS === "ios" ? 10 : 3,
    paddingHorizontal: 10,
    marginVertical: 10,
  },
  icon: {
    marginRight: 10,
  },
  inputIOS: {
    flex: 1,
    padding: 10,
    borderRadius: 10,
    backgroundColor: "#f0f0f0",
  },
  inputAndroid: {
    flex: 1,
    padding: 10,
    backgroundColor: "#f0f0f0",
  },
  loading: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    color: colours.pink,
  },
  errorText: {
    textAlign: "center",
    fontSize: 18,
    color: "red",
  },
  resultsContainer: {
    flex: 1,
    width: "100%",
  },
  noResultsContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
  },
});

export default SearchScreen;
