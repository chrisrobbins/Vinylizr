import { combineReducers } from 'redux';
import DiscogsIdentity from '#modules/DiscogsIdentity/reducer';

const rootReducer = combineReducers({
  userProfile: DiscogsIdentity,
});

export default rootReducer;
