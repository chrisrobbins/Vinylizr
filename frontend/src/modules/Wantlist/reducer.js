/**
 *  Import action creator constants
 */
import {
  UPDATE_IS_FETCHING,
  FETCH_USER_WANTLIST,
  STORE_WANT_INSTANCE,
} from './constants';

/**
 *  Set intial state
 */
const initialState = {
  releases: [],
  newWantInstance: null,
  isFetching: false,
};

/**
 *  Define the reducer with actions
 */
function userWantlist(state = initialState, action) {
  switch (action.type) {
    case FETCH_USER_WANTLIST:
      const { payload } = action;
      return {
        ...state,
        releases: payload,
      };
    case STORE_WANT_INSTANCE:
      return {
        ...state,
        newWantInstance: action.payload,
      };
    case UPDATE_IS_FETCHING:
      return {
        ...state,
        isFetching: action.status,
      };
    default:
      return state;
  }
}

/**
 *  Export the reducer
 */
export default userWantlist;
