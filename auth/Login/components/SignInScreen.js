import React, { Component } from 'react';
import {
  View,
  AsyncStorage,
  Linking,
  Text,
  Image,
  Dimensions,
  ImageBackground,
} from 'react-native';
import { AuthSession } from 'expo';
import axios from 'axios';
import * as Animatable from 'react-native-animatable';
const windowSize = Dimensions.get('window');
import { withUser } from '#contexts';
import { Button } from '#common/';
import {
  DISCOGS_AUTH_URL,
  DISCOGS_ACCESS_TOKEN_URL,
  ACCESS_TOKEN_CONFIG,
  REQUEST_TOKEN_CONFIG,
} from '#src/routes';

const backgroundImg = require('#assets/images/vinyl-record-player.png');
const power = require('#assets/images/power.png');

class SignInScreen extends Component {
  static navigationOptions = {
    header: null,
  };

  state = {
    Token: '',
    Secret: '',
    verifier: '',
  };

  async componentDidUpdate(prevProps) {
    const { loggedIn } = this.props.screenProps.user;
    if (!prevProps.screenProps.user.loggedIn && loggedIn) {
      this.props.navigation.navigate('App');
    }
    if (!loggedIn) {
      await this.getDiscogsRequestToken();
      let url = AuthSession.getRedirectUrl();
      await Linking.addEventListener(`${url}`, this._handleOpenURL());
    }
  }

  componentWillUnmount() {
    let url = AuthSession.getRedirectUrl();

    Linking.removeEventListener(`${url}`, this._handleOpenURL());
  }

  getDiscogsRequestToken = async () => {
    console.log('PROPS PROPS PROPS', this.props);
    let redirectUrl = AuthSession.getRedirectUrl();
    const config = REQUEST_TOKEN_CONFIG(redirectUrl);
    const url = `${DISCOGS_AUTH_URL}`;
    await axios
      .get(url, config)
      .then(response => {
        console.log('RESPONSE REQUEST TOKEN', response);

        const stringBreak = response.data.split('=');
        const parseToken = stringBreak[2].split('&');
        const parseSecret = stringBreak[1].split('&');
        const reqToken = parseSecret[0];
        const tokenSecret = parseToken[0];
        this.setState({ Token: reqToken, Secret: tokenSecret, loggedIn: true });
      })
      .catch(error => {
        console.log(error);
      });
  };

  _handlePressAsync = async () => {
    const { Token } = this.state;
    const redirectUrl = AuthSession.getRedirectUrl();
    const discogsAuthUrl = DISCOGS_AUTH_URL(Token);
    let oauthReturnObj = await AuthSession.startAsync({
      authUrl:
        `${discogsAuthUrl}` +
        `&redirect_uri=${encodeURIComponent(redirectUrl)}`,
    });

    this.setState({
      verifier: oauthReturnObj.params.oauth_verifier,
    });
  };

  _handleOpenURL = () => {
    if (this.state.verifier) {
      this.getAccessToken();
      this.props.navigation.navigate('App');
    }
  };

  getAccessToken = () => {
    const { verifier, Token, Secret } = this.state;
    const url = `${DISCOGS_ACCESS_TOKEN_URL}`;
    const config = ACCESS_TOKEN_CONFIG(Token, Secret, verifier);
    axios
      .post(url, config)
      .then(response => {
        console.log('ACCESS TOKEN RESPONSE', response);

        const stringBreak = response.data.split('=');
        let secretSplit = stringBreak[1].split('&');

        const oauthSecret = stringBreak[2];
        const oauthToken = secretSplit[0];

        AsyncStorage.multiSet([
          ['oauth_token', oauthToken],
          ['oauth_secret', oauthSecret],
        ]);
      })
      .catch(error => {
        console.log(error.config);
      });
  };

  render() {
    console.log('WITH USER SIGN IN SCREEN', this.props);

    return (
      <View style={styles.imagesContainer}>
        <ImageBackground style={styles.backgroundImage} source={backgroundImg}>
          <View style={styles.headingContainer}>
            <Text style={styles.title}>Powered by Discogs</Text>
            <Image style={styles.logo} source={power} />
            <Text style={styles.subText}>
              Vinylizr is a companion tool that uses the cataloging features of
              Discgos.
            </Text>
          </View>

          <Animatable.View animation="fadeIn" style={styles.animateStyles}>
            <Button onPress={this._signInAsync}>Get Started</Button>
            <Button onPress={this._signOutAsync}>Sign Out</Button>
          </Animatable.View>
        </ImageBackground>
      </View>
    );
  }
}

const styles = {
  animateStyles: {
    flex: 1,
    justifyContent: 'flex-end',
    marginBottom: 40,
  },
  headingContainer: {
    alignItems: 'center',
    justifyContent: 'flex-end',
    marginTop: 100,
    width: 295,
  },
  title: {
    backgroundColor: 'transparent',
    fontSize: 24,
    color: '#ffffff',
    lineHeight: 29,
    marginBottom: 10,
  },
  subText: {
    backgroundColor: 'transparent',
    color: '#ffffff',
    fontSize: 16,
    lineHeight: 29,
    marginTop: 10,
    textAlign: 'center',
  },
  logo: {
    width: 24,
    height: 28,
  },
  imagesContainer: {
    width: windowSize.width,
    height: windowSize.height,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  backgroundImage: {
    flex: 1,
    width: windowSize.width,
    height: windowSize.height,
    backgroundColor: '#000',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
};

export default SignInScreen;
