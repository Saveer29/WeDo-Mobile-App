import * as SecureStore from "expo-secure-store";

// import usersApi from "../api/users";

const keys = ["authToken", "userId", "userInfo"];

const storeToken = async (authToken) => {
  try {
    await SecureStore.setItemAsync(keys[0], authToken);
  } catch (err) {
    console.error("Error storing the auth token: ", err);
  }
};

const getToken = async () => {
  try {
    return await SecureStore.getItemAsync(keys[0]);
  } catch (error) {
    console.error("Error getting the auth token", error);
  }
};

const removeToken = async () => {
  try {
    await SecureStore.deleteItemAsync(keys[0]);
  } catch (error) {
    console.error("Error removing the auth token", error);
  }
};

const storeUserId = async (authUserId) => {
  try {
    await SecureStore.setItemAsync(keys[1], authUserId);
  } catch (err) {
    console.error("Error storing the UserId: ", err);
  }
};

const getUserId = async () => {
  try {
    return await SecureStore.getItemAsync(keys[1]);
  } catch (error) {
    console.error("Error getting the UserId", error);
  }
};

const removeUserId = async () => {
  try {
    await SecureStore.deleteItemAsync(keys[1]);
  } catch (error) {
    console.error("Error removing the UserId", error);
  }
};

const storeUserInfo = async (userInfo) => {
  try {
    await SecureStore.setItemAsync(keys[2], userInfo);
  } catch (err) {
    console.error("storeUserInfo error: ", err);
  }
};

const getUserInfo = async () => {
  try {
    return await SecureStore.getItemAsync(keys[2]);
  } catch (error) {
    console.error("Error getting user info: ", error);
  }
};

const removeUserInfo = async () => {
  try {
    await SecureStore.deleteItemAsync(keys[2]);
  } catch (error) {
    console.error("Error removing user info: ", error);
  }
};

// const updateUserInfo = async () => {
//   try {
//     const userId = await SecureStore.getItemAsync(keys[1]);
//     const result = await usersApi.getUserById(userId);
//     const userInfoString = JSON.stringify(result[0]);
//     storeUserInfo(userInfoString);
//   } catch (error) {
//     console.error("Error updating user info: ", error);
//   }
// };

export default {
  getToken,
  removeToken,
  storeToken,
  getUserId,
  removeUserId,
  storeUserId,
  storeUserInfo,
  getUserInfo,
  removeUserInfo,
  updateUserInfo,
};
