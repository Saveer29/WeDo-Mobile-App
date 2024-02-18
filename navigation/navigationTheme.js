import { DefaultTheme } from "@react-navigation/native";
import colours from "../config/colours";

export default {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: colours.blue,
    background: colours.white,
  },
};
