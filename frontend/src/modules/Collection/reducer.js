/**
 *  Import action creator constants
 */
import {
  UPDATE_IS_FETCHING,
  FETCH_USER_COLLECTION,
  STORE_INSTANCE,
} from './constants';

/**
 *  Set intial state
 */
const initialState = {
  releases: [],
  newInstance: null,
  isFetching: false,
};

/**
 *  Define the reducer with actions
 */
function userCollection(state = initialState, action) {
  switch (action.type) {
    case FETCH_USER_COLLECTION:
      return {
        ...state,
        releases: action.payload,
      };
    case STORE_INSTANCE:
      return {
        ...state,
        newInstance: action.payload,
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
export default userCollection;
