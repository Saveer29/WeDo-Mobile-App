import client from "./client";
const endpoint = "/auth"; // need to change

const login = (email, password) => client.post(endpoint, { email, password });

export default {
  login,
};
