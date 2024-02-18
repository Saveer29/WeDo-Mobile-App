import React, { useContext, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";

import { AccountContext } from "./Account";
import AppNavigator from "../navigation/AppNavigator";
import navigationTheme from "../navigation/navigationTheme";
import AuthNavigator from "../navigation/AuthNavigator";

const Status = () => {
  const { getSession, setStatus, status } = useContext(AccountContext);

  useEffect(() => {
    getSession().then((session) => {
      setStatus(true);
    });
  }, []);

  return (
    <NavigationContainer theme={navigationTheme}>
      {status ? <AppNavigator /> : <AuthNavigator />}
    </NavigationContainer>
  );
};
export default Status;
