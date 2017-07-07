import _ from 'lodash';
import * as types from '../actions/types';


export default function(state = {albums: []}, action) {
  console.log("action ", action);
  switch (action.type) {
    case types.FETCH_ALBUMS:
      return {
        albums: state.albums.concat(action.payload),
      }
    case types.SAVE_ALBUM:
      return {
        albums: action.payload,
      }
    case types.DELETE_ALBUM:
      return _.omit(state, action.payload);
  }

  return state;
}
