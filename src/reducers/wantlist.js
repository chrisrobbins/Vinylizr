import _ from 'lodash'
import * as types from '../actions/types'


const initialState = {
  wantlist: {
  albums: []
  }
}

export default function(state = initialState, action) {
  // console.log("action ", action)
  switch (action.type) {
    case types.FETCH_WANTLIST:
      return {
      wantlist: {
        albums: action.payload
      }
    }
    case types.DELETE_WANTLIST_ITEM:
      return _.omit(state, action.payload)
  }

  return state
}
