import client from "./client";
import { uploadImages } from "../Auth/UploadFile";
import authStorage from "../Auth/authStorage";

const endpoint = "/event";

const addEvent = async (event, onUploadProgress) => {
  try {
    const userId = await authStorage.getUserId();
    const imageUriList = await uploadImages(event);

    const data = {
      tags: [event.category.label],
      date: event.date,
      title: event.title,
      description: event.description,
      time: event.time,
      imageUriList,
      capacity: event.capacity,
    };

    return client.post(endpoint + "/" + userId, data);
  } catch (err) {
    console.error("addEvent Error: ", err);
  }
};

const getEvents = async () => client.get(endpoint + "s");

const getEventByiD = (id) => client.get(endpoint + `s/${id}`);

const getEventBySearch = (searchTerm) => {
  console.log(
    `Sending GET request to ${endpoint} with search term: ${searchTerm}`
  );
  return client
    .get(endpoint + "s", { params: { search: searchTerm } })

    .then((response) => {
      return response;
    })
    .catch((error) => {
      console.error(`API request to ${endpoint} failed:`, error);
      throw error;
    });
};

const getEventsForDay = (date) => {
  const requestUrl = `${endpoint}s/date/${date}`;
  console.log("Request URL:", requestUrl);
  return client
    .get(requestUrl)
    .then((response) => {
      console.log("Response status code:", response.status);
      if (response.ok) {
        const eventData = response.data;
        console.log("Fetched events successfully:", eventData);
        return response;
      } else {
        console.error("Failed to fetch events:", response.statusText);
        if (response.status === 404) {
          console.log("Request URL for 404:", requestUrl);
        }
        throw new Error(response.statusText);
      }
    })
    .catch((error) => {
      console.error("Error fetching events:", error);
      throw error;
    });
};

const getEventsByTag = (tag) => {
  const requestUrl = `${endpoint}s/${tag}`;
  console.log("Request URL:", requestUrl);
  return client
    .get(requestUrl)
    .then((response) => {
      console.log("Response status code:", response.status);
      if (response.ok) {
        const eventData = response.data;
        console.log("Fetched events successfully:", eventData);
        return response;
      } else {
        console.error("Failed to fetch events:", response.statusText);
        if (response.status === 404) {
          console.log("Request URL for 404:", requestUrl);
        }
        throw new Error(response.statusText);
      }
    })
    .catch((error) => {
      console.error("Error fetching events:", error);
      throw error;
    });
};

const joinEvent = async ({ id: eventId }) => {
  const userId = await authStorage.getUserId();

  const res = await client.put("/join/" + userId + "/" + eventId);
  return res;
};

const leaveEvent = async ({ id: eventId }) => {
  const userId = await authStorage.getUserId();

  const res = await client.put("/leave/" + userId + "/" + eventId);
  return res;
};

export default {
  addEvent,
  getEvents,
  getEventBySearch,
  joinEvent,
  leaveEvent,
  getEventsForDay,
  getEventsByTag,
  getEventByiD,
};
