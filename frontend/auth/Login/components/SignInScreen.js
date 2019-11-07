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
import vinylAxios from 'axios';
import * as Animatable from 'react-native-animatable';
import { Button } from '#common/';
const windowSize = Dimensions.get('window');
import backgroundImg from '/assets/images/vinyl-record-player.png';
import power from '/assets/images/power.png';
import { VINYLIZR_API_BASE_URL } from '#src/routes';

class SignInScreen extends Component {
  static navigationOptions = {
    header: null,
  };

  state = {
    verifier: '',
    authData: {},
    accessData: {},
  };

  componentDidMount() {
    const url = AuthSession.getRedirectUrl();
    Linking.addEventListener(`${url}`, this._handleOpenURL());
  }

  async componentDidUpdate(prevProps, prevState) {
    if (!prevState.verifier.length && this.state.verifier.length) {
      await this.getAccessToken();
    }
  }

  componentWillUnmount() {
    const url = AuthSession.getRedirectUrl();

    Linking.removeEventListener(`${url}`, this._handleOpenURL());
  }

  _handlePressAsync = async () => {
    const proxyUrl = `${VINYLIZR_API_BASE_URL}/authorize`;
    try {
      const response = await vinylAxios.get(proxyUrl);
      this.setState({ authData: response.data });
      this.asyncGetData(response.data.authorizeUrl);
    } catch (err) {
      console.error('THIS ISNT WORKING FOR SINGING IN', err);
    }
  };

  asyncGetData = async url => {
    const oauthReturnObj = await AuthSession.startAsync({
      authUrl: url,
    });

    this.setState({
      verifier: oauthReturnObj.params.oauth_verifier,
    });
  };

  _handleOpenURL = async () => {
    const accessToken = await AsyncStorage.getItem('access_token');
    this.props.navigation.navigate(
      !accessToken || accessToken === 'undefined' ? 'Auth' : 'App'
    );
  };

  getAccessToken = () => {
    const { verifier, authData } = this.state;
    const url = `${VINYLIZR_API_BASE_URL}/callback?oauth_verifier=${verifier}`;
    vinylAxios
      .post(url, authData)
      .then(response => {
        this.setState({ accessData: response.data });
        this.props.screenProps.getDiscogsIdentity(response.data);
        this.props.navigation.navigate('App');

        const { token, tokenSecret } = response.data;

        AsyncStorage.multiSet([
          ['access_token', token],
          ['access_secret', tokenSecret],
        ]);
      })
      .catch(error => {
        if (error.response) {
          console.log(error.response || error.message);
        }
      });
  };

  render() {
    return (
      <View style={styles.imagesContainer}>
        <ImageBackground style={styles.backgroundImage} source={backgroundImg}>
          <View style={styles.headingContainer}>
            <Text style={styles.title}>Powered by Discogs</Text>
            <Image style={styles.logo} source={power} />
            <Text style={styles.subText}>
              Vinylizr is a companion tool that uses the cataloging features of
              Discogs.
            </Text>
          </View>

          <Animatable.View animation="fadeIn" style={styles.animateStyles}>
            <Button onPress={this._handlePressAsync}>Get Started</Button>
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
