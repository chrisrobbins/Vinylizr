/* @flow */

import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';

export default class UserProfile extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.profileText}>User Profile!</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  profileText: {
    color: '#fff',

  }
});
