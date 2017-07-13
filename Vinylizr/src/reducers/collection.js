import _ from 'lodash';
import * as types from '../actions/types';


export default function(state = {collection:{ albums: []}}, action) {
  console.log("action ", action);
  switch (action.type) {
    case types.FETCH_COLLECTION:
      return {
      collection: {
        albums: state.collection.albums.concat(action.payload),
      }
    }
    case types.SAVE_COLLECTION_ITEM:
      return {
        collection: {
        albums: action.payload,
      }
    }
    case types.DELETE_COLLECTION_ITEM:
      return _.omit(state, action.payload);
  }

  return state;
}
