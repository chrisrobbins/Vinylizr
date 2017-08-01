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
        <View style={styles.buttonContainer}>
        <Button onPress={() => firebase.auth().signOut()}>Log out</Button>
        </View>
    </View>
    </View>
    );
  }
}

const styles = {
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  buttonContainer: {
    justifyContent: 'flex-end',
    height: 40,
    marginBottom: 70
  },
  logOut: {
    flex:1,
    alignSelf: 'stretch',
    justifyContent: 'flex-end'


  },
  headerContainer: {
    alignSelf: 'stretch'
  }
};
