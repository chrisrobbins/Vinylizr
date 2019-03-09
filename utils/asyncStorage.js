import { AsyncStorage } from "react-native";

AsyncStorage.multiGet(["oauth_token", "oauth_secret"]).then(values => {
  console.log("VALUES", values);
  export const user_token = values[0][1];
  export const user_secret = values[1][1];
});
