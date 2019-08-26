/**
 *  Import action creator constants
 */
import { UPDATE_IS_FETCHING, FETCH_MASTER_RELEASES } from './constants';

/**
 *  Set intial state
 */
const initialState = {
  masterReleases: [],
  isFetching: false,
};

/**
 *  Define the reducer with actions
 */
function masterReleases(state = initialState, action) {
  switch (action.type) {
    case FETCH_MASTER_RELEASES:
      return {
        ...state,
        masterReleases: action.payload,
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
export default masterReleases;
