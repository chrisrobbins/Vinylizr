import React from 'react'
import { AppRegistry } from 'react-native'
import { Provider } from "react-redux"
import UserCollections from './src/screens/UserCollections'
import { createStore, applyMiddleware } from 'redux'
import reduxThunk from 'redux-thunk'
import rootReducer from './src/reducers/index'


import App from './src/components/app'

const createStoreWithMiddleware = applyMiddleware(reduxThunk)(createStore)

const Vinylizr = () => (
  <Provider store={createStoreWithMiddleware(rootReducer)}>
    <App />
  </Provider>
)

AppRegistry.registerComponent('Vinylizr', () => Vinylizr)
