import React, { Component } from 'react';

import { View, AsyncStorage } from 'react-native';

import { Button, Header } from '#common/';

export default class UserProfile extends Component {
  static navigationOptions = {
    header: null,
  };
  signOut = async () => {
    await AsyncStorage.removeItem('oauth_token');
    await AsyncStorage.removeItem('oauth_secret');
    await AsyncStorage.removeItem('userMeta');

    this.props.navigation.navigate('Auth');
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.headerContainer}>
          <Header headerText={'My Profile'} />
        </View>
        <View style={styles.buttonContainer}>
          <Button onPress={this.signOut}>Log Out</Button>
        </View>
      </View>
    );
  }
}

const styles = {
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000',
  },
  buttonContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
    height: 40,
    marginBottom: 70,
  },
  headerContainer: {
    alignSelf: 'stretch',
  },
};
