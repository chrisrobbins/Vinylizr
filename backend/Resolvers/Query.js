const {
  DISCOGS_REQUEST_TOKEN_URL,
  DISCOGS_ACCESS_TOKEN_URL,
  DISCOGS_AUTH_URL,
  IDENTITY_URL,
  IDENTITY_CONFIG,
  ACCESS_TOKEN_CONFIG,
  REQUEST_TOKEN_CONFIG,
} = require('../routes.js');

const Axios = require('axios');

const Query = {
  requestToken: (parent, { redirectUrl }) => {
    console.log({ redirectUrl });
    const requestConfig = REQUEST_TOKEN_CONFIG(redirectUrl);
    return Axios.get(`${DISCOGS_REQUEST_TOKEN_URL}`, requestConfig).then(
      res => res.data
    );
  },
  // oauthAccess: (parent, { token, secret, verifier }) => {
  //   const accessConfig = ACCESS_TOKEN_CONFIG(token, secret, verifier);
  //   return fetch(`${DISCOGS_ACCESS_TOKEN_URL}`, accessConfig);
  // },
  // user: (parent, { token, secret }) => {
  //   const identityConfig = IDENTITY_CONFIG(token, secret);
  //   return fetch(`${IDENTITY_URL}$`, identityConfig).then(res => res.json());
  // },
};

module.exports = Query;
