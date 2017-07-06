import _ from 'lodash';
import * as types from '../actions/types';

export default function(state = {}, action) {
  switch (action.type) {
    case types.FETCH_ALBUMS:
      return action.payload;
      // case SEARCH_DEEZER:
      //   return action.payload;
    case types.SAVE_ALBUM:
      return { ...state, ...action.payload };
    case types.DELETE_ALBUM:
      return _.omit(state, action.payload);
  }

  return state;
}
