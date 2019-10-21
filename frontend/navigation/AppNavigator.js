import React from 'react';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import * as Expo from 'expo';
import createBottomTabNavigator from './MainTabNavigator';
import { AlbumDetail, ReleaseList, UserCollections } from '#screens';
import { AuthLoadingScreen, SignInScreen } from '../auth/Login/components';
const AuthStack = createStackNavigator({ SignIn: SignInScreen });

const DiscogsOauthFlow = createAppContainer(
  createSwitchNavigator(
    {
      AuthLoading: AuthLoadingScreen,
      App: createBottomTabNavigator,
      AlbumDetail,
      UserCollections,
      Auth: AuthStack,
      ReleaseList,
    },
    {
      initialRouteName: 'AuthLoading',
      paths: {
        App: '/App',
      },
    }
  )
);

const prefix = Expo.Linking.makeUrl('/');

const Vinylizr = props => (
  <DiscogsOauthFlow uriPrefix={prefix} screenProps={props} />
);

export default Vinylizr;
