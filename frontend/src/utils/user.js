import { AsyncStorage } from 'react-native';

const token = async () => {
  const accToken = await AsyncStorage.getItem('access_token');
  return accToken;
};
const tokenSecret = async () => {
  const accSecret = await AsyncStorage.getItem('access_secret');
  return accSecret;
};
const user = async () => {
  const userData = await AsyncStorage.getItem('userMeta');
  return userData;
};

export { token, tokenSecret, user };
