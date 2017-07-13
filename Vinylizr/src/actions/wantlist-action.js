import fire from '../fire.js';
import thunk from 'redux-thunk';
import _ from 'lodash';
import {
  FETCH_WANTLIST,
  SAVE_WANTLIST_ITEM,
  DELETE_WANTLIST_ITEM,
} from './types.js';


export function fetchWantlist() {
  return dispatch => {
    fire.database().ref('wantlist/albums').on('child_added', snapshot => {
      dispatch({
        type: FETCH_WANTLIST,
        payload: snapshot.val().album
      });
      console.log("WTF ", snapshot.val().album);
    });
  };
}

export function saveWantlistItem(album) {
  console.log(album);
  return dispatch =>
  fire.database().ref('wantlist/albums').push({album:album})
}

export function deleteWantlistItem(key) {
  return dispatch => fire.database().child(key).remove();
}
