'use strict';

var React = require('react');
var ReactNative = require('react-native');
var {
  TabBarIOS,
  Text,
  View,
} = ReactNative;

import DeezerSearch from './screens/DeezerSearch';
import UserProfile from './screens/UserProfile';
import UserCollections from './screens/UserCollections';
import WantList from './screens/WantList';



class Nav extends React.Component {
  static title = '<TabBarIOS>';
  static description = 'Tab-based navigation.';
  static displayName = 'Vinylizr';

  state = {
    selectedTab: 'UserCollections',
    notifCount: 0,
    presses: 0,
  };


  render() {
    return (
      <TabBarIOS
        unselectedItemTintColor="yellow"
        barTintColor="#1A1A1A">
        <TabBarIOS.Item
          renderAsOriginal
          icon={require('./img/collectionIcon.png')}
          selectedIcon={require('./img/collection_select.png')}
          selected={this.state.selectedTab === 'UserCollections'}
          onPress={() => {
            this.setState({
              selectedTab: 'UserCollections',
            });
          }}>
          <UserCollections />
        </TabBarIOS.Item>
        <TabBarIOS.Item
          renderAsOriginal
          icon={require('./img/wantlistIcon.png')}
          selectedIcon={require('./img/wantlistIcon_select.png')}
          selected={this.state.selectedTab === 'wantList'}
          onPress={() => {
            this.setState({
              selectedTab: 'wantList',
            });
          }}>
          <WantList />
        </TabBarIOS.Item>
        <TabBarIOS.Item
          renderAsOriginal
          icon={require('./img/profile.png')}
          selectedIcon={require('./img/profile_select.png')}
          selected={this.state.selectedTab === 'profile'}
          onPress={() => {
            this.setState({
              selectedTab: 'profile',
            });
          }}>
          <UserProfile />
        </TabBarIOS.Item>
        <TabBarIOS.Item
          icon={require('./img/search.png')}
          selectedIcon={require('./img/search_select.png')}
          renderAsOriginal
          selected={this.state.selectedTab === 'search'}
          onPress={() => {
            this.setState({
              selectedTab: 'search',
              presses: this.state.presses + 1
            });
          }}>
          <DeezerSearch />
        </TabBarIOS.Item>
      </TabBarIOS>
    );
  }
}


module.exports = Nav;
