'use strict';

var React = require('react');
var ReactNative = require('react-native');
var {
  StyleSheet,
  TabBarIOS,
  Text,
  View,
} = ReactNative;

class Nav extends React.Component {
  static title = '<TabBarIOS>';
  static description = 'Tab-based navigation.';
  static displayName = 'Nav';

  state = {
    selectedTab: '#F42E4A'
  };

  render() {
    return (
      <View>
      <TabBarIOS
        unselectedItemTintColor="#777777"
        tintColor="#F42E4A"
        barTintColor="#1A1A1A">
        <TabBarIOS.Item
          icon={require('../../img/collectionIcon.png')}
          selectedIcon={require('../../img/collection_select.png')}
          selected={false}
          onPress={() => {
            this.setState({
              selectedTab: '#777777',
            });
          }}
        />
        <TabBarIOS.Item
          icon={require('../../img/wantlistIcon.png')}
          selectedIcon={require('../../img/wantlistIcon_select.png')}

          badge={this.state.notifCount > 0 ? this.state.notifCount : undefined}
          badgeColor="black"
          selected={false}
          onPress={() => {
            this.setState({
              selectedTab: '#F42E4A',
              notifCount: this.state.notifCount + 1,
            });
          }}
        />

        <TabBarIOS.Item
          icon={require('../../img/profile.png')}
          selectedIcon={require('../../img/profile_select.png')}

          renderAsOriginal
          selected={false}
          onPress={() => {
            this.setState({

              selectedTab: '#777777',
              presses: this.state.presses + 1
            });
          }}
        />

        <TabBarIOS.Item
          icon={require('../../img/search.png')}
          selectedIcon={require('../../img/search_select.png')}
          renderAsOriginal
          selected={false}
          onPress={() => {
            this.setState({
              selectedTab: '#777777',
              presses: this.state.presses + 1
            });
          }}
        />

      </TabBarIOS>
    </View>
    );
  }
}

var styles = StyleSheet.create({
  tabContent: {
    flex: 1,
    alignItems: 'center',
    color: '#777777',
  },
  tabText: {
    color: '#777777',
    margin: 50,
  },
});

export { Nav };
