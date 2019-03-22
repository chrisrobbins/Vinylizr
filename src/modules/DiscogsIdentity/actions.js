import { AsyncStorage } from 'react-native';
import DISCOGS_BASE_URL from '#src/routes';
import { FETCH_DISCOGS_IDENTITY, UPDATE_IS_FETCHING } from '#constants/';
import axios from 'axios';

function fetchDiscogsIdentityFromDiscogsApi() {
  AsyncStorage.multiGet(['oauth_token', 'oauth_secret']).then(values => {
    const user_secret = values[0][1];
    const user_token = values[1][1];

    console.log('TOKENS from ACTION', user_token, user_secret);

    axios({
      method: 'GET',
      url: `${DISCOGS_BASE_URL}/oauth/identity`,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: `OAuth oauth_consumer_key="jbUTpFhLTiyyHgLRoBgq",oauth_nonce="${Date.now()}",oauth_token="${user_token}",oauth_signature="LSQDaLpplgcCGlkzujkHyUkxImNlWVoI&${user_secret}",oauth_signature_method="PLAINTEXT",oauth_timestamp="${Date.now()}"`,
        'User-Agent':
          'Mozilla/5.0 (Macintosh Intel Mac OS X 10_12_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/61.0.3163.100 Safari/537.36',
      },
    }).then(response => response.data);
  });
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
