import React from 'react';
import {
  StyleSheet,
  Text,
  View
} from 'react-native';

import Login from './Login';

var SplashScreen = React.createClass({
  render() {
    return (
    <View style={style.container}>
        <View style={style.splash}>
        <Image
          source={require('./img/vinyl_logo.png')}
        />
      </View>

    );
  }
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'stretch',
    paddingTop: 20,
    backgroundColor: '#000000',
  },
  splash: {
    alignItems: 'center',
  }

});


module.exports = SplashScreen;
