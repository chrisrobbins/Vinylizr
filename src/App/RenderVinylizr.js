import React, { Component } from 'react';
import { View, StatusBar } from 'react-native';
import AppNavigator from '../../navigation/AppNavigator';

class RenderVinylizr extends Component {
  render() {
    return (
      <View style={styles.container}>
        <StatusBar barStyle="light-content" />
        <AppNavigator />
      </View>
    );
  }
}

const styles = {
  container: {
    flex: 1,
  },
};

export default RenderVinylizr;
