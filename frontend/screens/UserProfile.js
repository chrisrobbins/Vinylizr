import React, { Component } from 'react';

import { View, AsyncStorage } from 'react-native';

import { Button, Header } from '#common/';

export default class UserProfile extends Component {
  static navigationOptions = {
    header: null,
  };
  signOut() {
    AsyncStorage.removeItem('oauth_token').then(() => {
      console.log('Token Removed');
    });
    AsyncStorage.removeItem('oauth_secret').then(() => {
      console.log('SECRET removed!!');
    });
    this.props.navigation.navigate('Auth');
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.headerContainer}>
          <Header headerText={'My Profile'} />
        </View>
        <View style={styles.logOut}>
          <View style={styles.buttonContainer}>
            <Button onPress={this.signOut.bind(this)}>Log Out</Button>
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
    backgroundColor: '#000',
  },
  buttonContainer: {
    justifyContent: 'flex-end',
    height: 40,
    marginBottom: 70,
  },
  logOut: {
    flex: 1,
    alignSelf: 'stretch',
    justifyContent: 'flex-end',
  },
  headerContainer: {
    alignSelf: 'stretch',
  },
};
