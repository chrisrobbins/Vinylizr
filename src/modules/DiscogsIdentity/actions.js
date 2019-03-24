import { AsyncStorage } from 'react-native';
import { FETCH_DISCOGS_IDENTITY, UPDATE_IS_FETCHING } from './constants';
import axios from 'axios';
import {
  CONSUMER_KEY,
  CONSUMER_SECRET,
  DISCOGS_BASE_URL,
  IDENTITY,
  IDENTITY_CONFIG,
} from '#src/routes';

async function fetchDiscogsIdentityFromDiscogsApi() {
  let apiResponse;
  AsyncStorage.multiGet(['oauth_token', 'oauth_secret']).then(values => {
    const user_secret = values[0][1];
    const user_token = values[1][1];
    const url = `${DISCOGS_BASE_URL}${IDENTITY}`;
    const config = IDENTITY_CONFIG(user_token, user_secret);
    console.log('TOKENS from ACTION', user_token, user_secret);

    return axios.get(url, config).then(response => {
      console.log('HELLLLOOOO', response);
      apiResponse = response.data;
    });
  });
  return apiResponse;
}

export function fetchDiscogsIdentity() {
  return dispatch => {
    dispatch(updateIsFetching(true));
    return fetchDiscogsIdentityFromDiscogsApi()
      .then(json => {
        console.log('JAYSON FROM USER IDENTITY ACTION', json);

        dispatch(updateDiscogsIdentity(json));
        dispatch(updateIsFetching(false));
      })
      .catch(error => {
        dispatch(updateIsFetching(false));
      });
  };
}

export function updateDiscogsIdentity(profile) {
  const action = {
    type: FETCH_DISCOGS_IDENTITY,
    profile,
  };
  return action;
}

/**
 * UPDATE_IS_FETCHING
 * @param {boolean} status
 * @returns {action} UPDATE_IS_FETCHING
 */
export function updateIsFetching(status) {
  const action = {
    type: UPDATE_IS_FETCHING,
    status,
  };
  return action;
}
