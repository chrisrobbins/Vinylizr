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

  componentDidMount() {
    Font.loadAsync({
      Lato: require('./assets/fonts/Lato-Black.ttf'),
      'Lato-Regular': require('./assets/fonts/Lato-Regular.ttf'),
      'Lato-Bold': require('./assets/fonts/Lato-Bold.ttf'),
      'Lato-Light': require('./assets/fonts/Lato-Light.ttf'),
    });
    this.localizeAsyncStorageData();
  }

  localizeAsyncStorageData = async () => {
    const { user, tokenSecret, token } = await UserData();
    console.log({ user });

    this.setState({ userMeta: { user }, accessData: { token, tokenSecret } });
  };

  componentDidUpdate(prevProps, prevState) {
    if (isEmpty(prevState.accessData) && !isEmpty(this.state.accessData)) {
      this.localizeAsyncStorageData();
    }
  }

  logUserIn = async (response) => {
    console.log('LOG USER RESPONSE', response);

    this.setState({ userMeta: response.data, loggedIn: true });
    const userMeta = JSON.stringify(response.data);
    AsyncStorage.setItem('userMeta', userMeta);
  };

  getDiscogsIdentity = async (accessData) => {
    const url = `${VINYLIZR_API_BASE_URL}/identity`;
    try {
      const DiscIdentity = await vinylAxios.post(url, accessData);
      console.log({ DiscIdentity });

      this.logUserIn(DiscIdentity);
    } catch (err) {
      console.log({ err });
    }
  };

  render() {
    const {
      accessData,
      userMeta: { user = {} },
    } = this.state;

    return (
      <ApolloProvider client={client}>
        <Provider store={store}>
          <Vinylizr
            accessData={accessData}
            username={user.username}
            login={this.logUserIn}
            getDiscogsIdentity={this.getDiscogsIdentity}
          />
        </Provider>
      </ApolloProvider>
    );
  }
}
