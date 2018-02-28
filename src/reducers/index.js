import { combineReducers } from 'redux';
import collection from './collection';
import wantlist from './wantlist';
import user from './user';

const rootReducer = combineReducers({
  collection,
  wantlist,
  user
});

export default rootReducer;
