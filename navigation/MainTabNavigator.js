import React from "react";
import { Platform } from "react-native";
import {
  createStackNavigator,
  createBottomTabNavigator
} from "react-navigation";

import TabBarIcon from "../components/TabBarIcon";
import UserCollections from "../screens/UserCollections";
import WantList from "../screens/WantList";
import UserProfile from "../screens/UserProfile";
import DiscogsSearch from "../screens/DiscogsSearch";

const Collection = createStackNavigator({
  Home: UserCollections
});

Collection.navigationOptions = {
  tabBarLabel: "Collection",
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === "ios"
          ? `ios-information-circle${focused ? "" : "-outline"}`
          : "md-information-circle"
      }
    />
  )
};

const UserWantlist = createStackNavigator({
  Links: WantList
});

UserWantlist.navigationOptions = {
  tabBarLabel: "Wantlist",
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === "ios" ? "ios-link" : "md-link"}
    />
  )
};

const Profile = createStackNavigator({
  Settings: UserProfile
});

Profile.navigationOptions = {
  tabBarLabel: "Profile",
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === "ios" ? "ios-options" : "md-options"}
    />
  )
};

const SearchAlbums = createStackNavigator({
  Settings: DiscogsSearch
});

SearchAlbums.navigationOptions = {
  tabBarLabel: "Search",
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === "ios" ? "ios-options" : "md-options"}
    />
  )
};

export default createBottomTabNavigator({
  Collection,
  UserWantlist,
  Profile,
  SearchAlbums
});
