import React, { Component } from 'react'
import { Text, View, Linking } from 'react-native'
import axios from 'axios'
import DeepLinking from 'react-native-deep-linking'
import * as Animatable from 'react-native-animatable';

import {
  Button,
  CardSection,
  Spinner,
  Logo,
  AsyncStorage
} from './common'


class LoginForm extends Component {


  static navigationOptions = () => ({
    drawerLabel: 'LoginForm',
    header: null,
    cardStyle: {
      backgroundColor: '#000000'
    },
  });






discogsRedirect = () => {
  const { access_token } = this.props
  Linking.openURL(`https://discogs.com/oauth/authorize?oauth_token=${access_token}`)

}


  render() {
    return (
      <View
        style={styles.sectionContainer}>

        <View style={styles.containerLogo}>
          <Animatable.View animation="fadeIn">
              <Logo />

          </Animatable.View>
        </View>



        <CardSection>
          <Animatable.View animation="fadeIn" style={styles.animateStyles}>
            <Button
              onPress={this.discogsRedirect}>
              Log in
            </Button>

          </Animatable.View>

        </CardSection>

      </View>
    );
  }
}

const styles = {
  sectionContainer: {
    flex: 1,
    backgroundColor: '#000000',

  },
  containerLogo: {
    flex: 1,
    justifyContent: 'center',
    flexDirection: 'column'
  },
  animateStyles: {
    flex: 1,
    justifyContent: 'flex-end',
    marginBottom: 75
  },


  errorTextStyle: {
    fontSize: 20,
    alignSelf: 'center',
    color: 'red'
  },
  sectionContainer: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#000000',
    paddingLeft: 20,
    paddingRight: 20


  },

  createButton: {
    flex:1,
    alignSelf: 'stretch',
    backgroundColor: 'transparent',
    height: 20,

  },
  };

export default LoginForm;
