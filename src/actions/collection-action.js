import fire from '../components/fire.js';
import thunk from 'redux-thunk';
import _ from 'lodash';
import {
  FETCH_COLLECTION,
  SAVE_COLLECTION_ITEM,
  DELETE_COLLECTION_ITEM,
} from './types.js';



export const saveCollectionItem = (item) => {
  let userId = fire.auth().currentUser.uid;
  let albumRef = fire.database().ref(`users/${userId}/collection/albums`)
      return dispatch => {
          albumRef.push(item);
          dispatch(fetchCollection());
      }
  }

export const deleteCollectionItem = (key) => {
  return dispatch => fire.database().child(key).remove();
  //read database when child is removed from collection
  fire.database().ref(`users/${userId}/collection/albums`).on('child_removed', snapshot => {
    dispatch({
      type: FETCH_COLLECTION,
      payload: snapshot.val().album
    });
});
}
