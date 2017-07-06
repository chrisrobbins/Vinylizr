import { combineReducers } from 'redux';
import AlbumsReducer from './reducer_albums';

const rootReducer = combineReducers({
  albums: AlbumsReducer
});

export default rootReducer;
