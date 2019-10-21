import React from 'react';
import { createBottomTabNavigator } from 'react-navigation-tabs';

import { createStackNavigator } from 'react-navigation-stack';

import {
  Wantlist,
  UserProfile,
  DiscogsSearch,
  UserCollections,
} from '#screens';

import {
  CollectionFocused,
  CollectionRested,
  WantlistFocused,
  WantlistRested,
  ProfileFocused,
  ProfileRested,
  SearchFocused,
  SearchRested,
} from './TabBarIcons';

const Collection = createStackNavigator({
  UserCollections,
});

Collection.navigationOptions = {
  tabBarOptions: {
    showLabel: false,

    style: {
      backgroundColor: '#121212',
    },
  },
  tabBarIcon: ({ focused }) =>
    focused ? <CollectionFocused /> : <CollectionRested />,
};

const UserWantlist = createStackNavigator({
  Wantlist,
});

UserWantlist.navigationOptions = {
  tabBarOptions: {
    showLabel: false,

    style: {
      backgroundColor: '#121212',
    },
  },
  tabBarIcon: ({ focused }) =>
    focused ? <WantlistFocused /> : <WantlistRested />,
};

const Profile = createStackNavigator({
  UserProfile,
});

Profile.navigationOptions = {
  tabBarOptions: {
    showLabel: false,

    style: {
      backgroundColor: '#121212',
    },
  },
  tabBarIcon: ({ focused }) =>
    focused ? <ProfileFocused /> : <ProfileRested />,
};

const SearchAlbums = createStackNavigator({
  DiscogsSearch,
});

SearchAlbums.navigationOptions = {
  tabBarOptions: {
    showLabel: false,

    style: {
      backgroundColor: '#121212',
    },
  },
  tabBarIcon: ({ focused }) => (focused ? <SearchFocused /> : <SearchRested />),
};

export default createBottomTabNavigator({
  Collection,
  UserWantlist,
  Profile,
  SearchAlbums,
});
