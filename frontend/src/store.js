import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'remote-redux-devtools';
import thunk from 'redux-thunk';
import rootReducer from './reducers';
const composeEnhancers = composeWithDevTools({
  realtime: true,
  name: 'Vinylizr Dev Tools',
  hostname: 'localhost',
  port: 19001, // the port your remotedev server is running at
});
const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk))
);
export default store;
