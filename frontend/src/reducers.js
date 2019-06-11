import { combineReducers } from 'redux';
import UserCollection from './modules/Collection/reducer';
const rootReducer = combineReducers({
  UserCollection,
});

export default rootReducer;
