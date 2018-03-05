import _ from 'lodash';
import * as types from '../actions/types';


const initialState = {
  userData: {}
}

export default function(state = initialState, action) {
  console.log(action, "USER ACTION");
  // console.log("action ", action);
  switch (action.type) {
    case types.FETCH_USER:
      return {
      userData: action.payload
    }
  }

  return state;
}
