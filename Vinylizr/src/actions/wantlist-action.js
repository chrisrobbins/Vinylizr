import fire from '../fire.js';
import thunk from 'redux-thunk';
import _ from 'lodash';
import {
  FETCH_WANTLIST,
  SAVE_WANTLIST_ITEM,
  DELETE_WANTLIST_ITEM,
} from './types.js';


export function fetchWantlist() {
  let userId = fire.auth().currentUser.uid;
  return dispatch => {
    fire.database().ref(`${userId}/wantlist/albums`).on('child_added', snapshot => {
      dispatch({
        type: FETCH_WANTLIST,
        payload: snapshot.val().album
      });
      console.log("WTF ", snapshot.val().album);
    });
    fire.database().ref(`${userId}/wantlist/albums`).on('child_removed', snapshot => {
      dispatch({
        type: FETCH_WANTLIST,
        payload: snapshot.val().album
      });
  });
  };
}

export function saveWantlistItem(album) {
  let userId = fire.auth().currentUser.uid;
  console.log(album);
  return dispatch =>
  fire.database().ref(`${userId}/wantlist/albums`).push({
    album:album,
    id:userId
  })
}

export function deleteWantlistItem(key) {
  return dispatch => fire.database().child(key).remove();
}
