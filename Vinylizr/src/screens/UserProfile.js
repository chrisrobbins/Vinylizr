import React, { Component } from 'react';
import firebase from 'firebase';

import {
  View,
  Text,
  StyleSheet,
} from 'react-native';

import { Button } from '../components/common';
import { Header } from '../components/common'


export default class UserProfile extends Component {
  render() {
    return (
    <View style={styles.container}>

      <View style={styles.headerContainer}>
        <Header headerText={"My Profile"} />
      </View>
      <View style={styles.logOut}>
        <View>
        <Button onPress={() => firebase.auth().signOut()}>Log out</Button>
        </View>
    </View>
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
  logOut: {
    alignSelf: 'stretch',
    flex: 1,
    justifyContent: 'flex-end',
    marginLeft: 20,
    marginRight: 20,
    marginBottom: 60
  },
  headerContainer: {
    alignSelf: 'stretch'
  }
});
