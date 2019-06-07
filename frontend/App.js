if (__DEV__) {
  import('./ReactotronConfig').then(() => console.log('Reactotron Configured'));
}

import React, { Component } from 'react';
import { AsyncStorage } from 'react-native';
import vinylAxios from 'axios';
import * as Font from 'expo-font';
import Vinylizr from './src/App/RenderVinylizr';
import { isEmpty } from 'rxjs/operator/isEmpty';

// disable yellow box warnings b/c they're fucking annoying
console.disableYellowBox = true;

class App extends Component {
  state = {
    userMeta: {},
    loggedIn: false,
    accessData: {},
  };

  async componentDidMount() {
    Font.loadAsync({
      Lato: require('./assets/fonts/Lato-Black.ttf'),
      'Lato-Regular': require('./assets/fonts/Lato-Regular.ttf'),
      'Lato-Bold': require('./assets/fonts/Lato-Bold.ttf'),
      'Lato-Light': require('./assets/fonts/Lato-Light.ttf'),
    });
  }

  componentDidUpdate(prevProps, prevState) {
    if (isEmpty(prevState.accessData) && !isEmpty(this.state.accessData)) {
      this.saveDisInfoAsyncStore();
    }
  }

  saveDisInfoAsyncStore = async () => {
    const accessData = await AsyncStorage.multiGet([
      'access_token',
      'access_secret',
      'userMeta',
    ]);

    this.setState({ accessData });
  };

  logUserIn = async response => {
    this.setState({ userMeta: response.data, loggedIn: true });
    const userMeta = JSON.stringify(response.data);
    AsyncStorage.setItem('userMeta', userMeta);
  };

  getDiscogsIdentity = accessData => {
    const url = 'http://localhost:3000/identity';
    vinylAxios.post(url, accessData).then(response => {
      this.logUserIn(response);
    });
  };

  render() {
    return (
      <>
        <Vinylizr
          user={this.state}
          login={this.logUserIn}
          getDiscogsIdentity={this.getDiscogsIdentity}
        />
      </>
    );
  }
}

export default App;
