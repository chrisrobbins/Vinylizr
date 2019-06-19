import { combineReducers } from 'redux';
import UserCollection from './modules/Collection/reducer';
import UserWantlist from './modules/Wantlist/reducer';

const rootReducer = combineReducers({
  UserCollection,
  UserWantlist,
});

export default rootReducer;
