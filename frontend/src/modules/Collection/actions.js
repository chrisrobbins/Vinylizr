import vinylAxios from 'axios';
import { VINYLIZR_API_BASE_URL } from '#src/routes';
import {
  FETCH_USER_COLLECTION,
  UPDATE_IS_FETCHING,
  STORE_INSTANCE,
} from './constants';

function userCollection(releases) {
  const action = {
    type: FETCH_USER_COLLECTION,
    payload: releases,
  };

  return action;
}

function storeInstance(instance_id) {
  const action = {
    type: STORE_INSTANCE,
    payload: instance_id,
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
  const result = await vinylAxios.post(url, accessData);
  return result;
}

function processSaveResponse(status, dispatch) {
  dispatch(updateIsFetching(status));
}

export function saveToCollection(accessData, username, release_id) {
  return async (dispatch, getState) => {
    dispatch(updateIsFetching(true));
    const {
      data: { instance_id },
    } = await savingCollection(accessData, username, release_id);
    dispatch(storeInstance(instance_id));
    return processSaveResponse(false, dispatch);
  };
}

async function removingCollection(
  accessData,
  username,
  release_id,
  instance_id
) {
  const url = `${VINYLIZR_API_BASE_URL}/collection/remove?user=${username}&folder=1&release=${release_id}&instance=${instance_id}`;
  await vinylAxios.post(url, accessData);
}

function processDeleteResponse(status, dispatch) {
  dispatch(updateIsFetching(status));
}

export function removeFromCollection(
  accessData,
  username,
  release_id,
  instance_id
) {
  return async dispatch => {
    dispatch(updateIsFetching(true));
    await removingCollection(accessData, username, release_id, instance_id);
    getReleases();
    return processDeleteResponse(false, dispatch);
  };
}
