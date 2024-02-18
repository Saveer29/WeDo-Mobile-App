import AsyncStorage from "@react-native-async-storage/async-storage";

import eventsApi from "../api/events";
const keys = ["events"];

const storeEvents = async (events) => {
  try {
    await AsyncStorage.setItem(keys[0], events);
  } catch (err) {
    console.error("storeEvents error: ", err);
  }
};

const getEvents = async () => {
  try {
    const res = await AsyncStorage.getItem(keys[0]);
    return res;
  } catch (error) {
    console.error("Error getting events info: ", error);
  }
};

const updateEvents = async () => {
  try {
    const { data } = await eventsApi.getEvents();
    await AsyncStorage.setItem(keys[0], JSON.stringify(data));
  } catch (error) {
    console.error("Error updateEvents: ", error);
  }
};

async function clearAllData() {
  try {
    await AsyncStorage.clear();
  } catch (error) {
    console.log("Error clearing data: ", error);
  }
}

export default {
  storeEvents,
  getEvents,
  updateEvents,
};
