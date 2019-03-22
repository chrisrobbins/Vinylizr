import React, { Component } from 'react';
import { View } from 'react-native';
import { Font } from 'expo';
import Vinylizr from './src/App/RenderVinylizr';
import IdentityLayer from '#views/Layer';
import UserCollections from '#screens/UserCollections';
import { UserProvider } from '#contexts/';
// disable yellow box warnings b/c they're fucking annoying
console.disableYellowBox = true;

class App extends Component {
  componentDidMount() {
    Font.loadAsync({
      Lato: require('./assets/fonts/Lato-Black.ttf'),
      'Lato-Regular': require('./assets/fonts/Lato-Regular.ttf'),
      'Lato-Bold': require('./assets/fonts/Lato-Bold.ttf'),
      'Lato-Light': require('./assets/fonts/Lato-Light.ttf'),
    });
  }

  render() {
    return (
      <UserProvider>
        <UserCollections />
      </UserProvider>
    );
  }
}

export default App;
