import fire from '../fire.js';
import thunk from 'redux-thunk';
import _ from 'lodash';
import {
  FETCH_ALBUMS,
  DELETE_ALBUM,
  SAVE_ALBUM,
  // SEARCH_DEEZER
} from './types.js';


export function fetchAlbums() {
  return dispatch => {
    fire.database().ref('albums').on('child_added', snapshot => {
      dispatch({
        type: FETCH_ALBUMS,
        payload: snapshot.val().album
      });
      console.log("WTF ", snapshot.val().album);
    });
  };
}

export function saveAlbum(album) {
  return dispatch => fire.database().ref('albums').push().set({album:album});
}

export function deleteAlbum(key) {
  return dispatch => fire.database().child(key).remove();
}
