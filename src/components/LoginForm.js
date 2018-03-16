import React, { Component } from 'react'
import { Text, View, Linking, Image, Dimensions } from 'react-native'
import axios from 'axios'
import DeepLinking from 'react-native-deep-linking'
import * as Animatable from 'react-native-animatable'
const windowSize = Dimensions.get('window')

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

  })






discogsRedirect = () => {
  const { access_token } = this.props
  Linking.openURL(`https://discogs.com/oauth/authorize?oauth_token=${access_token}`)

}


  render() {
    const backgroundImg = require('../img/vinyl-record-player.png')
    const power = require('../img/power.png')


    return (
      <View
        style={styles.imagesContainer}>

        <Image style={styles.backgroundImage} source={backgroundImg}>

          <View style={styles.headingContainer}>
            <Text style={styles.title}>Powered by Discogs</Text>
              <Image style={styles.logo} source={power} />
              <Text style={styles.subText}>
                Vinylizr is a  companion tool that uses the cataloging features of Discgos.
              </Text>
          </View>

          <Animatable.View animation="fadeIn" style={styles.animateStyles}>
            <Button
              onPress={this.discogsRedirect}>
              Get Started
            </Button>

          </Animatable.View>

      </Image>
      </View>
    )
  }
}

const styles = {
  animateStyles: {
    flex: 1,
    justifyContent: 'flex-end',
    marginBottom: 40
  },
  headingContainer: {
    alignItems: 'center',
    justifyContent: 'flex-end',
    marginTop: 100,
    width: 295
  },
  title: {
    backgroundColor: 'transparent',
    fontSize: 24,
    fontFamily: 'Lato-Bold',
    color: '#ffffff',
    lineHeight: 29,
    marginBottom: 10

  },
  subText: {
    backgroundColor: 'transparent',
    fontFamily: 'Lato-Regular',
    color: '#ffffff',
    fontSize: 16,
    lineHeight: 29,
    marginTop: 10,
    textAlign: 'center'
  },
  logo: {
    width: 24,
    height: 28

  },
  imagesContainer: {
    width: windowSize.width,
    height: windowSize.height,
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  backgroundImage: {
    flex: 1,
    width: windowSize.width,
    height: windowSize.height,
    backgroundColor: '#000',
    justifyContent: 'flex-end',
    alignItems: 'center'

  }
  }

export default LoginForm
