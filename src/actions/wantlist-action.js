import fire from '../components/fire.js'
import thunk from 'redux-thunk'
import _ from 'lodash'
import {
  FETCH_WANTLIST,
  SAVE_WANTLIST_ITEM,
  DELETE_WANTLIST_ITEM
} from './types.js'

export const fetchWantlist =() => {

  let userId = fire.auth().currentUser.uid
  // console.log(fire.auth().currentUser)
  return dispatch => {
    //read database when child is added to wantlist
    fire.database().ref(`users/${userId}/wantlist/albums`).once('value', snapshot => {
      const allData = []
      snapshot.forEach((childSnapshot) => {
        const key = childSnapshot.key
        const album = childSnapshot.val()
        const eachWantlist = {
          key,
          album
        }
        allData.push(eachWantlist)
      })
      dispatch({
        type: FETCH_WANTLIST,
        payload: allData
      })
    })
 }
}

export const saveWantlistItem = (item) => {
  let userId = fire.auth().currentUser.uid
  let albumRef = fire.database().ref(`users/${userId}/wantlist/albums`)
  return dispatch => {
    albumRef.push(item)
    dispatch(fetchWantlist())
  }
  }


export const deleteWantlistItem = (key) => {
  return dispatch => fire.database().child(key).remove()
  //read database when child is removed from wantlist
  fire.database().ref(`users/${userId}/wantlist/albums`).on('child_removed', snapshot => {
    dispatch({
      type: FETCH_WANTLIST,
      payload: snapshot.val().album
    })
})
}
