import React from "react";

import { StackNavigator } from "react-navigation";

import TabBar from "./TabBar";
import AlbumDetail from "../screens/AlbumDetail";
import LoginForm from "./LoginForm";
import ReleaseList from "../screens/ReleaseList";

const MainNav = StackNavigator(
  {
    TabBar: {
      screen: TabBar,
      cardStyle: {
        backgroundColor: "#000000"
      }
    },
    AlbumDetail: { screen: AlbumDetail },
    LoginForm: { screen: LoginForm },
    ReleaseList: { screen: ReleaseList }
  },
  { HeaderMode: "screen" }
);

export default MainNav;
