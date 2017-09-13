import React, { Component } from 'react';

import { TabBarIOS } from 'react-native';

import DiscogsSearch from '../screens/DiscogsSearch';
import UserProfile from '../screens/UserProfile';
import UserCollections from '../screens/UserCollections';
import WantList from '../screens/WantList';



class Nav extends Component {
  static title = '<TabBarIOS>';
  static description = 'Tab-based navigation.';
  static displayName = 'Vinylizr';

  state = {
    selectedTab: 'UserCollections',
  };


  render() {
    return (
      <TabBarIOS
        unselectedItemTintColor="green"
        barTintColor="#1A1A1A">
        <TabBarIOS.Item
          title=""
          renderAsOriginal
          icon={require('../img/collectionIcon.png')}
          selectedIcon={require('../img/collection_select.png')}
          selected={this.state.selectedTab}
          onPress={() => {
            this.setState({
              selectedTab: 'UserCollections',
            });
          }}>
          <UserCollections />
        </TabBarIOS.Item>
        <TabBarIOS.Item
          title=""
          renderAsOriginal
          icon={require('../img/wantlistIcon.png')}
          selectedIcon={require('../img/wantlistIcon_select.png')}
          selected={this.state.selectedTab === 'wantList'}
          onPress={() => {
            this.setState({
              selectedTab: 'wantList',
            });
          }}>
          <WantList />
        </TabBarIOS.Item>
        <TabBarIOS.Item
          title=""
          renderAsOriginal
          icon={require('../img/profile.png')}
          selectedIcon={require('../img/profile_select.png')}
          selected={this.state.selectedTab === 'profile'}
          onPress={() => {
            this.setState({
              selectedTab: 'profile',
            });
          }}>
          <UserProfile />
        </TabBarIOS.Item>
        <TabBarIOS.Item
          title=""
          icon={require('../img/search.png')}
          selectedIcon={require('../img/search_select.png')}
          renderAsOriginal
          selected={this.state.selectedTab === 'search'}
          onPress={() => {
            this.setState({
              selectedTab: 'search'
            });
          }}>
          <DiscogsSearch />
        </TabBarIOS.Item>
      </TabBarIOS>
    );
  }
}


export default Nav;
