import _ from 'lodash';
import * as types from '../actions/types';


export default function(state = {wantlist:{ albums: []}}, action) {
  console.log("action ", action);
  switch (action.type) {
    case types.FETCH_WANTLIST:
      return {
      wantlist: {
        albums: state.wantlist.albums.concat(action.payload),
      }
    }
    case types.SAVE_WANTLIST_ITEM:
      return {
        wantlist: {
        albums: action.payload,
      }
    }
    case types.DELETE_WANTLIST_ITEM:
      return _.omit(state, action.payload);
  }

  return state;
}
