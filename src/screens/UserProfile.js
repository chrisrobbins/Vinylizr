import React, { Component } from 'react';

import {
  View,
  Text,
  StyleSheet,
  Image,
  AsyncStorage,
  Linking
} from 'react-native';

import { Button, Header } from '../components/common';


export default class UserProfile extends Component {

  componentWillMount() {
    console.log(this.props, "Navigator props");
  }

  static navigationOptions = ({screenProps}) => ({
    header: null,
    tabBarIcon: ({ tintColor }) => (tintColor == '#e91e63'
    ?
    <Image source={require('../img/profile_select.png')} />
    :
    <Image source={require('../img/profile.png')} />
    )
  })


  signOut() {
    AsyncStorage.removeItem('oauth_token').then(() => {console.log("Token Removed")}).then(() => {console.log("TOKEN SUCCESS!!")})
    AsyncStorage.removeItem('oauth_secret').then(() => {console.log("SECRET SUCCESS!!")})
    this.props.navigation.navigate('LoginForm')

  }

  render() {
    return (
    <View style={styles.container}>

      <View style={styles.headerContainer}>
        <Header headerText={"My Profile"} />
      </View>
      <View style={styles.logOut}>
        <View style={styles.buttonContainer}>
        <Button onPress={this.signOut.bind(this)}>
          Log Out
        </Button>
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
    backgroundColor: '#000'
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
