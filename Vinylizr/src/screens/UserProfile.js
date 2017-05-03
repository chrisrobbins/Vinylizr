import React, { Component } from 'react';
import firebase from 'firebase';

import {
  View,
  Text,
  StyleSheet,
} from 'react-native';

import { Button } from '../components/common'

export default class UserProfile extends Component {
  render() {
    return (
    <View style={styles.container}>
      <View>
        <Text style={styles.profileText}>User Profile!</Text>
      </View>
      <View style={styles.logOut}>
        <Button onPress={() => firebase.auth().signOut()}>Log out</Button>
      </View>
    </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
    marginLeft: 10
  },
  logOut: {
    alignSelf: 'stretch'
  }
});
