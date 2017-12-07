import React, { Component } from 'react';
import { Image } from 'react-native';


import DiscogsSearch from '../screens/DiscogsSearch';
import UserProfile from '../screens/UserProfile';
import UserCollections from '../screens/UserCollections';
import WantList from '../screens/WantList';
import AlbumDetail from '../screens/AlbumDetail';


import {
  TabNavigator,
} from 'react-navigation';

const TabBar = TabNavigator({
  Collection: {
    path: 'vinylizr/:collection',
    screen: UserCollections,
    navigationOptions: {
      header: null
    },
  },
  Wantlist: {
    path: 'vinylizr/:wantlist',
   screen: WantList
 },
  UserProfile: {
    path: 'vinylizr/:UserProfile',
    screen: UserProfile
  },
  DiscogsSearch: {
    path: 'vinylizr/:search',
    screen: DiscogsSearch
   }

},
  {
  tabBarOptions: {
    activeTintColor: '#e91e63',
    showLabel: false,
    style: {
      backgroundColor: '#1A1A1A'
    }
  },
});

export default TabBar;
