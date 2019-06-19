import vinylAxios from 'axios';
import { VINYLIZR_API_BASE_URL } from '#src/routes';
import {
  FETCH_USER_COLLECTION,
  UPDATE_IS_FETCHING,
  SAVE_TO_COLLECTION,
} from './constants';

function userCollection(releases) {
  const action = {
    type: FETCH_USER_COLLECTION,
    payload: releases,
  };

  return action;
}

function updateIsFetching(status) {
  return {
    type: UPDATE_IS_FETCHING,
    status,
  };
}
async function fetchUserCollection(accessData, username, folder, page) {
  const url = `${VINYLIZR_API_BASE_URL}/collection?folder=${folder}&user=${username}&page=${page}`;
  const { data } = await vinylAxios.post(url, accessData);
  try {
    return data;
  } catch (error) {
    console.log('error fetch', error);
  }
}

function processResponse(data, status, dispatch) {
  dispatch(userCollection(data));
  dispatch(updateIsFetching(status));
}

export function getReleases(accessData, username, folder, page) {
  return async dispatch => {
    dispatch(updateIsFetching(true));
    const collection = await fetchUserCollection(
      accessData,
      username,
      folder,
      page
    );
    return processResponse(collection, false, dispatch);
  };
}

async function savingCollection(accessData, username, release_id) {
  const url = `${VINYLIZR_API_BASE_URL}/collection/save?user=${username}&folder=1&release=${release_id}`;
  await vinylAxios.post(url, accessData);
}

function processSaveResponse(status, dispatch) {
  dispatch(updateIsFetching(status));
}

export function saveToCollection(accessData, username, release_id) {
  return async dispatch => {
    dispatch(updateIsFetching(true));
    await savingCollection(accessData, username, release_id);
    getReleases();
    return processSaveResponse(false, dispatch);
  };
}
