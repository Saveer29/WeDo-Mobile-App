import React, { createContext, useState } from "react";
import { CognitoUser, AuthenticationDetails } from "amazon-cognito-identity-js";

const AWS = require("aws-sdk");

import Pool from "../Auth/UserPool";
import authStorage from "../Auth/authStorage";

const AccountContext = createContext();

function Account(props) {
  const [status, setStatus] = useState(false);

  const getSession = async () => {
    return await new Promise((resolve, reject) => {
      const user = Pool.getCurrentUser();

      if (user) {
        user.getSession((err, session) => {
          if (err) {
            reject();
          } else {
            setStatus(true);
            resolve(session);
          }
        });
      } else {
        reject();
      }
    });
  };

  const authenticate = async (Username, Password) => {
    try {
      const res = await new Promise((resolve, reject) => {
        const user = new CognitoUser({ Username, Pool });

        const authDetails = new AuthenticationDetails({
          Username,
          Password,
        });

        user.authenticateUser(authDetails, {
          onSuccess: async ({ accessToken }) => {
            const {
              jwtToken,
              payload: { sub },
            } = accessToken;
            authStorage.storeUserId(sub);
            authStorage.storeToken(jwtToken);
            setStatus(true);
          },
          onFailure: (err) => {
            reject(err);
          },
          newPasswordRequired: (data) => {
            resolve(data);
          },
        });
      });
      return res;
    } catch (err) {
      console.error("authenticate error: ", err);
      throw err;
    }
  };

  const logout = () => {
    const user = Pool.getCurrentUser();
    if (user) {
      user.signOut();
      authStorage.removeToken();
      authStorage.removeUserId();
      authStorage.removeUserInfo();
    }
    setStatus(false);
  };

  const registerUser = async ({ email, password }) => {
    try {
      const signUpResponse = await new Promise((resolve, reject) => {
        Pool.signUp(email, password, [], null, (err, data) => {
          if (err) {
            reject(err);
            return;
          }
          resolve(data);
        });
      });
      return signUpResponse;
    } catch (error) {
      console.error("registerUser Error:", error);
      throw error;
    }
  };

  const verifyAttribute = async (email, code) => {
    AWS.config.update({ region: "ap-southeast-2" });
    const cognitoIdentityServiceProvider =
      new AWS.CognitoIdentityServiceProvider();

    const params = {
      ClientId: "764rall1185iqeh01kkceut3h5", // Your Cognito User Pool App Client ID
      ConfirmationCode: code,
      Username: email,
    };

    return new Promise((resolve, reject) => {
      cognitoIdentityServiceProvider.confirmSignUp(params, (err, data) => {
        if (err) {
          console.error("Error confirming user:", err);
          reject("Failed to confirm user: " + err.message);
        } else {
          console.log("User confirmed successfully", data);
          resolve(data);
        }
      });
    });
  };

  return (
    <AccountContext.Provider
      value={{
        authenticate,
        getSession,
        logout,
        setStatus,
        status,
        verifyAttribute,
        registerUser,
      }}
    >
      {props.children}
    </AccountContext.Provider>
  );
}

export { Account, AccountContext };
