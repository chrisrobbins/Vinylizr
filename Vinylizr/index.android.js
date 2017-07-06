import React from 'react';
import { AppRegistry } from 'react-native';
import { Provider } from "react-redux";
import configureStore from './src/store/configure-store';
import App from './src/app';
const store = configureStore();


const Vinylizr = () => (
  <Provider store={store}>
    <App />
  </Provider>
)

AppRegistry.registerComponent('Vinylizr', () => Vinylizr);
