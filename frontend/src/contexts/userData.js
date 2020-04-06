import React from 'react';
import { AsyncStorage } from 'react-native';

export const UserData = async () => {
  const token = await AsyncStorage.getItem('access_token');
  const tokenSecret = await AsyncStorage.getItem('access_secret');

  const userInfo = await AsyncStorage.getItem('userMeta');

  const user = JSON.parse(userInfo);

  const userContext = { token, tokenSecret, user };

  return userContext;
};
