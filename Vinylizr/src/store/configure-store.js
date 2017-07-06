import rootReducer from '../reducers/index';
import {createStore, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
/* eslint-disable no-underscore-dangle */
export default(initialState) => {
    return createStore(
     rootReducer,
     composeEnhancers(applyMiddleware(thunk))
    )
   }
