import React, { Component } from 'react';
import { AsyncStorage } from 'react-native';
import { Font } from 'expo';
import Vinylizr from './src/App/RenderVinylizr';
import IdentityLayer from '#views/Layer';
import UserCollections from '#screens/UserCollections';
import { createStore, applyMiddleware } from 'redux';
import rootReducer from './src/reducers';
import { Provider } from 'react-redux';
import ReduxThunk from 'redux-thunk';
import { IDENTITY_URL, IDENTITY_CONFIG } from './src/routes';
import axios from 'axios';
const store = createStore(rootReducer, applyMiddleware(ReduxThunk));
// disable yellow box warnings b/c they're fucking annoying
console.disableYellowBox = true;

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: {},
      oauthToken: '',
      oauthSecret: '',
      loggedIn: null,
      userLoggedIn: this.logUserIn,
    };
  }
  async componentDidMount() {
    await this.getTokens();
    Font.loadAsync({
      Lato: require('./assets/fonts/Lato-Black.ttf'),
      'Lato-Regular': require('./assets/fonts/Lato-Regular.ttf'),
      'Lato-Bold': require('./assets/fonts/Lato-Bold.ttf'),
      'Lato-Light': require('./assets/fonts/Lato-Light.ttf'),
    });
  }

  async componentDidUpdate(prevState) {
    const { user, oauthToken } = this.state;
    if (!prevState.oauthToken && oauthToken) {
      await this.getDiscogsIdentity();
    }
  }
  logUserIn = () => {
    this.setState({ loggedIn: true });
  };

  getDiscogsIdentity = () => {
    const { oauthToken, oauthSecret } = this.state;
    const url = IDENTITY_URL;
    const config = IDENTITY_CONFIG(oauthToken, oauthSecret);
    axios
      .get(url, config)
      .then(response => {
        this.setState({ user: response.data, loggedIn: true });
      })

      .catch(error => {
        console.log(error.config);
      });
  };

  getTokens = () => {
    console.log('GET SOME TOKENS!!!');

    AsyncStorage.multiGet(['oauth_token', 'oauth_secret']).then(values => {
      const user_token = values[0][1];
      const user_secret = values[1][1];
      this.setState({
        oauthToken: user_token,
        oauthSecret: user_secret,
      });
    });
  };

  render() {
    return (
      <>
        <Vinylizr user={this.state} />
      </>
    );
  }
}

export default App;
