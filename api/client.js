import { create } from "apisauce";
import authStorage from "../Auth/authStorage";

//Might want to hide endpoint later on and store as a hidden param
const client = create({
  baseURL:
    "https://gbimd8upel.execute-api.ap-southeast-2.amazonaws.com/testing",
});

client.addAsyncRequestTransform(async (request) => {
  const authToken = await authStorage.getToken();
  if (!authToken) return;
  request.headers["x-auth-token"] = authToken;
});

export default client;

//
