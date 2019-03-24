import React, { Component } from 'react';
import { View, AsyncStorage } from 'react-native';
import { Font } from 'expo';
import Vinylizr from './src/App/RenderVinylizr';
import IdentityLayer from '#views/Layer';
import UserCollections from '#screens/UserCollections';
import { createStore, applyMiddleware } from 'redux';
import rootReducer from './src/reducers';
import { Provider } from 'react-redux';
import ReduxThunk from 'redux-thunk';
import { IDENTITY, IDENTITY_CONFIG } from './src/routes';
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

  componentDidUpdate(prevState) {
    const { user, oauthToken } = this.state;
    if (!prevState.oauthToken && !user && oauthToken) {
      this.getDiscogsIdentity();
    }
  }

  getDiscogsIdentity = () => {
    const { oauthToken, oauthSecret } = this.state;
    const url = `${IDENTITY}`;
    const config = IDENTITY_CONFIG(oauthToken, oauthSecret);
    axios
      .get(url, config)
      .then(response => {
        this.setState({ user: response.data });
      })

      .catch(error => {
        console.log(error.config);
      });
  };

  getTokens = () => {
    AsyncStorage.multiGet(['oauth_token', 'oauth_secret']).then(values => {
      const user_token = values[0][1];
      const user_secret = values[1][1];
      this.setState({ oauthToken: user_token, oauthSecret: user_secret });
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
