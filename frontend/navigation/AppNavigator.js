import React from 'react';
import {
  createAppContainer,
  createSwitchNavigator,
  createStackNavigator,
} from 'react-navigation';
import createBottomTabNavigator from './MainTabNavigator';
import AlbumDetail from '#screens/AlbumDetail';
import SignInScreen from '../auth/Login/components/SignInScreen';
import AuthLoadingScreen from '../auth/Login/components/AuthLoadingScreen';
const AuthStack = createStackNavigator({ SignIn: SignInScreen });

const DiscogsOauthFlow = createAppContainer(
  createSwitchNavigator(
    {
      AuthLoading: AuthLoadingScreen,
      App: createBottomTabNavigator,
      AlbumDetail: AlbumDetail,
      Auth: AuthStack,
    },
    {
      initialRouteName: 'AuthLoading',
    }
  )
);

const prefix = Expo.Linking.makeUrl('/');

const Vinylizr = props => (
  <DiscogsOauthFlow uriPrefix={prefix} screenProps={props} />
);

export default Vinylizr;
