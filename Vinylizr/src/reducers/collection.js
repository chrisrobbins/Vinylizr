import _ from 'lodash';
import * as types from '../actions/types';


const initialState = {
  collection: {
  albums: []
  }
}

export default function(state = initialState, action) {
  // console.log("action ", action);
  switch (action.type) {
    case types.FETCH_COLLECTION:
      return {
      collection: {
        albums: action.payload
      }
    }
    case types.DELETE_COLLECTION_ITEM:
      return _.omit(state, action.payload);
  }

  return state;
}
