import vinylAxios from 'axios';
import { VINYLIZR_API_BASE_URL } from '#src/routes';
import {
  FETCH_USER_WANTLIST,
  STORE_WANT_INSTANCE,
  UPDATE_IS_FETCHING,
} from './constants';

function userWantlist(releases) {
  const action = {
    type: FETCH_USER_WANTLIST,
    payload: releases,
  };

  return action;
}

function storeWantInstance(instance_id) {
  const action = {
    type: STORE_WANT_INSTANCE,
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
async function fetchUserWantlist(accessData, username, page) {
  const url = `${VINYLIZR_API_BASE_URL}/wantlist?user=${username}&page=${page}`;
  const { data } = await vinylAxios.post(url, accessData);
  try {
    return data;
  } catch (error) {
    console.log('error fetch', error);
  }
}
function processResponse(data, status, dispatch) {
  dispatch(userWantlist(data));
  dispatch(updateIsFetching(status));
}
export function getReleases(accessData, username, folder, page) {
  return async dispatch => {
    dispatch(updateIsFetching(true));
    const wantlist = await fetchUserWantlist(
      accessData,
      username,
      folder,
      page
    );
    return processResponse(wantlist, false, dispatch);
  };
}

async function savingWantlist(accessData, username, release_id) {
  const url = `${VINYLIZR_API_BASE_URL}/wantlist/save?user=${username}&folder=1&release=${release_id}`;
  const result = await vinylAxios.post(url, accessData);
  return result;
}

function processSaveResponse(status, dispatch) {
  dispatch(updateIsFetching(status));
}

export function saveToWantlist(accessData, username, release_id) {
  return async (dispatch, getState) => {
    dispatch(updateIsFetching(true));
    const {
      data: { instance_id },
    } = await savingWantlist(accessData, username, release_id);
    dispatch(storeWantInstance(instance_id));
    return processSaveResponse(false, dispatch);
  };
}

async function removingWantlist(accessData, username, release_id, instance_id) {
  const url = `${VINYLIZR_API_BASE_URL}/wantlist/remove?user=${username}&folder=1&release=${release_id}&instance=${instance_id}`;
  await vinylAxios.post(url, accessData);
}

export function removeFromWantlist(
  accessData,
  username,
  release_id,
  instance_id
) {
  return async dispatch => {
    dispatch(updateIsFetching(true));
    await removingWantlist(accessData, username, release_id, instance_id);
    getReleases();
    dispatch(updateIsFetching(false));
  };
}
