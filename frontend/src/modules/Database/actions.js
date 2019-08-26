import React from 'react';
import vinylAxios from 'axios';
import { UserData } from '#src/contexts';
import { VINYLIZR_API_BASE_URL } from '#src/routes';
import { FETCH_MASTER_RELEASES, UPDATE_IS_FETCHING } from './constants';

function storeMasters(releases) {
  const action = {
    type: FETCH_MASTER_RELEASES,
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

async function fetchMasterReleases(master_id, page) {
  const { token, tokenSecret } = await UserData();
  const accessData = {
    token,
    tokenSecret,
  };
  const url = `${VINYLIZR_API_BASE_URL}/database/master-releases?master=${master_id}&page=${page}`;
  const {
    data: { versions },
  } = await vinylAxios.post(url, accessData);
  console.log({ versions });
  return versions;
}

export function getMasterReleases(master_id, page) {
  return async dispatch => {
    dispatch(updateIsFetching(true));
    const masters = await fetchMasterReleases(master_id, page);
    dispatch(storeMasters(masters));
    dispatch(updateIsFetching(false));
  };
}
