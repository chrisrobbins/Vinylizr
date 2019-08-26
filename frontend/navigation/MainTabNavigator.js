import React from 'react';
import {
  createStackNavigator,
  createBottomTabNavigator,
} from 'react-navigation';

import UserCollections from '#screens/UserCollections';
import WantList from '#screens/WantList';
import UserProfile from '#screens/UserProfile';
import DiscogsSearch from '#screens/DiscogsSearch';
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
  WantList,
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
