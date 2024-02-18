import client from "./client";
const endpoint = "/user";
import authStorage from "../Auth/authStorage";
import { uploadImages } from "../Auth/UploadFile";

const getUsers = async () => client.get(endpoint);

const addUser = async (userInfo) => {
  data = {
    id: userInfo.userSub,
    email: userInfo.email,
    firstName: userInfo.firstName,
    lastName: userInfo.lastName,
    phoneNumber: userInfo.phoneNumber ? userInfo.phoneNumber : "0221234567",
    aboutMe: userInfo.aboutMe
      ? userInfo.aboutMe
      : "Edit your profile to add an something about yourself",
    profileImageUri: userInfo.uri ? userInfo.uri : "../assets/icon.png",
  };
  client.post(endpoint, data);
};

const getUserById = async (userId) => {
  const userEndpoint = `${endpoint}/${userId}`;
  try {
    const response = await client.get(userEndpoint);
    return response.data;
  } catch (error) {
    console.error("API Error:", error);
    return { error: true, message: "API request failed" };
  }
};

const verifyUser = (userInfo) => client.post(endpoint, userInfo);

const updateUser = async (userInfo) => {
  const userId = await authStorage.getUserId();
  const profileImageUri = await uploadImages(userInfo);

  userData = { ...userInfo, profileImageUri };

  const userEndpoint = `${endpoint}/${userId}`;
  console.log(`Attempting to update user with ID ${userId}:`, userInfo);

  try {
    const response = await client.put(userEndpoint, userData);

    if (response.ok) {
      console.log("User updated successfully:", response.data);
      return response.data;
    } else {
      console.error("Failed to update user:", response.problem);
      return { error: true, message: response.problem };
    }
  } catch (error) {
    console.error("API Error:", error);
    return { error: true, message: "API request failed due to an exception" };
  }
};

export default {
  addUser,
  getUsers,
  getUserById,
  verifyUser,
  updateUser,
};
