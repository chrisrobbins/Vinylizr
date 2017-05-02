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


class Nav extends React.Component {
  static title = '<TabBarIOS>';
  static description = 'Tab-based navigation.';
  static displayName = 'Vinylizr';

  state = {
    selectedTab: 'redTab',
    notifCount: 0,
    presses: 0,
  };


  render() {
    return (
      <TabBarIOS
        unselectedItemTintColor="yellow"
        barTintColor="#1A1A1A">
        <TabBarIOS.Item
          icon={require('./img/collectionIcon.png')}
          selectedIcon={require('./img/collection_select.png')}
          selected={this.state.selectedTab === 'blueTab'}
          onPress={() => {
            this.setState({
              selectedTab: 'blueTab',
            });
          }}>
          <UserCollections />
        </TabBarIOS.Item>
        <TabBarIOS.Item
          renderAsOriginal
          icon={require('./img/wantlistIcon.png')}
          selectedIcon={require('./img/wantlistIcon_select.png')}
          selected={this.state.selectedTab === 'redTab'}
          onPress={() => {
            this.setState({
              selectedTab: 'redTab',
            });
          }}>
          <UserCollections />
        </TabBarIOS.Item>
        <TabBarIOS.Item
          renderAsOriginal
          icon={require('./img/collectionIcon.png')}
          selectedIcon={require('./img/collection_select.png')}
          selected={this.state.selectedTab === 'blueTab'}
          onPress={() => {
            this.setState({
              selectedTab: 'blueTab',
            });
          }}>
          <UserCollections />
        </TabBarIOS.Item>
        <TabBarIOS.Item
          icon={require('./img/search.png')}
          selectedIcon={require('./img/search_select.png')}
          renderAsOriginal
          selected={this.state.selectedTab === 'greenTab'}
          onPress={() => {
            this.setState({
              selectedTab: 'greenTab',
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
