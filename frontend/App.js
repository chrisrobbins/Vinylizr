if (__DEV__) {
  import('./ReactotronConfig').then(() => console.log('Reactotron Configured'));
}

import React, { Component } from 'react';
import { AsyncStorage } from 'react-native';
import { Provider } from 'react-redux';
import vinylAxios from 'axios';
import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { ApolloProvider } from '@apollo/react-hooks';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { UserData } from '#src/contexts';
import store from './src/store';
import * as Font from 'expo-font';
import Vinylizr from './src/App/RenderVinylizr';
import { isEmpty } from 'lodash';
import { VINYLIZR_API_BASE_URL } from './src/routes';

const cache = new InMemoryCache();
const client = new ApolloClient({
  cache,
  link: new HttpLink({
    uri: 'http://localhost:4000',
    headers: {
      'client-name': 'Vinylizr [mobile]',
      'client-version': '1.0.0',
    },
  }),
});
// disable yellow box warnings b/c they're fucking annoying
console.disableYellowBox = true;

export default class App extends Component {
  state = {
    userMeta: {},
    loggedIn: false,
    accessData: {},
  };

  async componentDidMount() {
    await this.localizeAsyncStorageData();
    Font.loadAsync({
      Lato: require('./assets/fonts/Lato-Black.ttf'),
      'Lato-Regular': require('./assets/fonts/Lato-Regular.ttf'),
      'Lato-Bold': require('./assets/fonts/Lato-Bold.ttf'),
      'Lato-Light': require('./assets/fonts/Lato-Light.ttf'),
    });
  }

  localizeAsyncStorageData = async () => {
    const { user, tokenSecret, token } = await UserData();
    const userMeta = JSON.parse(user);
    console.log('APP ENTRY', user, tokenSecret, token);
    this.setState({ userMeta, accessData: { token, tokenSecret } });
  };

  componentDidUpdate(prevProps, prevState) {
    if (isEmpty(prevState.accessData) && !isEmpty(this.state.accessData)) {
      this.saveDisInfoAsyncStore();
    }
  }

  saveDisInfoAsyncStore = async () => {
    const accessData = await UserData();
    this.setState({ accessData });
  };

  logUserIn = async response => {
    this.setState({ userMeta: response.data, loggedIn: true });
    const userMeta = JSON.stringify(response.data);
    AsyncStorage.setItem('userMeta', userMeta);
  };

  getDiscogsIdentity = accessData => {
    const url = `${VINYLIZR_API_BASE_URL}/identity`;
    vinylAxios.post(url, accessData).then(response => {
      this.logUserIn(response);
    });
  };

  render() {
    return (
      <ApolloProvider client={client}>
        <Provider store={store}>
          <Vinylizr
            user={this.state}
            login={this.logUserIn}
            getDiscogsIdentity={this.getDiscogsIdentity}
          />
        </Provider>
      </ApolloProvider>
    );
  }
}
