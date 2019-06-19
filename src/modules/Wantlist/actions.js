import vinylAxios from 'axios';
import { VINYLIZR_API_BASE_URL } from '#src/routes';
import { FETCH_USER_WANTLIST, UPDATE_IS_FETCHING } from './constants';

function userWantlist(releases) {
  const action = {
    type: FETCH_USER_WANTLIST,
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

export function getReleases(accessData, username, page) {
  return async dispatch => {
    dispatch(updateIsFetching(true));
    const wantlist = await fetchUserWantlist(accessData, username, page);
    return processResponse(wantlist, false, dispatch);
  };
}

async function savingWantlist(accessData, username, release_id) {
  const url = `${VINYLIZR_API_BASE_URL}/wantlist/save?user=${username}&release=${release_id}`;
  await vinylAxios.post(url, accessData);
}

function processSaveResponse(status, dispatch) {
  dispatch(updateIsFetching(status));
}

export function saveToWantlist(accessData, username, release_id) {
  return async dispatch => {
    dispatch(updateIsFetching(true));
    await savingWantlist(accessData, username, release_id);
    getReleases();
    return processSaveResponse(false, dispatch);
  };
}
