if (__DEV__) {
  import('./ReactotronConfig').then(() => console.log('Reactotron Configured'));
}

import React, { Component } from 'react';
import { AsyncStorage } from 'react-native';
import vinylAxios from 'axios';
import { Font } from 'expo';
import Vinylizr from './src/App/RenderVinylizr';

// disable yellow box warnings b/c they're fucking annoying
console.disableYellowBox = true;

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userMeta: {},
      accessToken: '',
      accessSecret: '',
      loggedIn: false,
    };
  }
  async componentDidMount() {
    Font.loadAsync({
      Lato: require('./assets/fonts/Lato-Black.ttf'),
      'Lato-Regular': require('./assets/fonts/Lato-Regular.ttf'),
      'Lato-Bold': require('./assets/fonts/Lato-Bold.ttf'),
      'Lato-Light': require('./assets/fonts/Lato-Light.ttf'),
    });
  }

  signIn = input => {
    this.setState({ loggedIn: input });
  };

  setUser = userMeta => {
    this.setState({ userMeta });
  };

  logUserIn = async response => {
    await this.setUser(response.data);
    await this.signIn(true);
  };

  getDiscogsIdentity = accessData => {
    const url = 'http://localhost:3000/identity';
    vinylAxios
      .post(url, accessData)
      .then(response => {
        console.log('YEAH, KILLER BOOTS MAN!!', response);
        this.logUserIn(response).then(() =>
          console.log('SUCCESSSSS', this.state)
        );
      })

      .catch(error => {
        if (error.response) {
          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);
        } else if (error.request) {
          console.log(error.request);
        } else {
          console.log('Error', error.message);
        }
        console.log(error.config);
      });
  };

  render() {
    return (
      <>
        <Vinylizr
          user={this.state}
          setUser={this.setUser}
          login={this.signIn}
          saveAccessTokens={this.saveAccessTokensAsync}
          getDiscogsIdentity={this.getDiscogsIdentity}
        />
      </>
    );
  }
}

export default App;
