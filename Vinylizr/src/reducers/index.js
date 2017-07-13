import { combineReducers } from 'redux';
import collection from './collection';
import wantlist from './wantlist';

const rootReducer = combineReducers({
  collection,
  wantlist
});

export default rootReducer;
