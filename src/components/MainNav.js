import React from 'react';

import {
    StackNavigator,
} from 'react-navigation';

import TabBar from './TabBar';
import AlbumDetail from '../screens/AlbumDetail'



const MainNav = StackNavigator({
    TabBar: { screen: TabBar },
    AlbumDetail: { screen: AlbumDetail },
},
{ HeaderMode: 'screen' }
);

export default MainNav;
