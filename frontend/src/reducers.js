import { combineReducers } from 'redux';
import UserCollection from './modules/Collection/reducer';
import UserWantlist from './modules/Wantlist/reducer';
import Database from './modules/Database/reducer';

const rootReducer = combineReducers({
  UserCollection,
  UserWantlist,
  Database,
});

export default rootReducer;
