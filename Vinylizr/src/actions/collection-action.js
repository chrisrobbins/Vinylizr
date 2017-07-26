import fire from '../components/fire.js';
import thunk from 'redux-thunk';
import _ from 'lodash';
import {
  FETCH_COLLECTION,
  SAVE_COLLECTION_ITEM,
  DELETE_COLLECTION_ITEM
} from './types.js';

export function fetchCollection() {

  let userId = fire.auth().currentUser.uid;
  // console.log(fire.auth().currentUser);

  return dispatch => {

    //read database when child is added to collection

    fire.database().ref(`users/${userId}/collection/albums`).on('child_added', snapshot => {
      dispatch({
        type: FETCH_COLLECTION,
        payload: snapshot.val().album
      });
      // console.log("WTF ", snapshot.val().album);
    });
      //read database when child is removed from collection
      fire.database().ref(`users/${userId}/collection/albums`).on('child_removed', snapshot => {
        dispatch({
          type: FETCH_COLLECTION,
          payload: snapshot.val().album
        });
    });
 }
}



export function saveCollectionItem(deezerRecord) {
  let userId = fire.auth().currentUser.uid;
  let albumRef = fire.database().ref(`users/${userId}/collection/albums`)
  return dispatch =>
  albumRef.push({
    album:deezerRecord
   })
  }


export function deleteCollectionItem(key) {
  return dispatch => fire.database().child(key).remove();
}
