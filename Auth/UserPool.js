import { CognitoUserPool,verifyCurrentUserAttributeSubmit } from "amazon-cognito-identity-js";
const poolData = {
  UserPoolId: "ap-southeast-2_7HytL98Mq",
  ClientId: "764rall1185iqeh01kkceut3h5",
};

export default new CognitoUserPool(poolData);
