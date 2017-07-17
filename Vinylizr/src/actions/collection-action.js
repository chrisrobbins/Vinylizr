import fire from '../fire.js';
import thunk from 'redux-thunk';
import _ from 'lodash';
import {
  FETCH_COLLECTION,
  SAVE_COLLECTION_ITEM,
  DELETE_COLLECTION_ITEM,
} from './types.js';

// fire.child("users").child(authData.uid).set({
//     provider: authData.provider,
//     name: getName(authData)
//   });
export function fetchCollection() {
  return dispatch => {
    fire.database().ref('collection/albums').on('child_added', snapshot => {
      dispatch({
        type: FETCH_COLLECTION,
        payload: snapshot.val().album
      });
      console.log("WTF ", snapshot.val().album);
    });
  };
}

export function saveCollectionItem(album) {
  console.log(album);
  return dispatch =>
  fire.database().ref('users').push({collection: {albums:album}})
}

export function deleteCollectionItem(key) {
  return dispatch => fire.database().child(key).remove();
}
