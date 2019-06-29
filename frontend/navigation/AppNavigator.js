import React from 'react';
import {
  createAppContainer,
  createSwitchNavigator,
  createStackNavigator,
} from 'react-navigation';
import createBottomTabNavigator from './MainTabNavigator';
import AlbumDetail from '#screens/AlbumDetail/';
import UserCollections from '#screens/UserCollections';
import MasterReleaseResult from '#views/SearchResults/MasterReleaseResult';
import SignInScreen from '../auth/Login/components/SignInScreen';
import ReleaseList from '#screens/ReleaseList';
import AuthLoadingScreen from '../auth/Login/components/AuthLoadingScreen';
const AuthStack = createStackNavigator({ SignIn: SignInScreen });

const DiscogsOauthFlow = createAppContainer(
  createSwitchNavigator(
    {
      AuthLoading: AuthLoadingScreen,
      App: createBottomTabNavigator,
      AlbumDetail: AlbumDetail,
      UserCollection: UserCollections,
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
