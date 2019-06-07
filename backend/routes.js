// DISCOGS CONSUMER KEY AND SECRET
// const { CONSUMER_KEY, CONSUMER_SECRET } = process.env;
// DISCOGS API BASE URL
const DISCOGS_BASE_URL = 'https://api.discogs.com';

// DISCOGS OAUTH REQUEST URL
const DISCOGS_REQUEST_TOKEN_URL = `${DISCOGS_BASE_URL}/oauth/request_token`;

// DISCOGS ACCESS TOKEN URL
const DISCOGS_ACCESS_TOKEN_URL = `${DISCOGS_BASE_URL}/oauth/access_token`;

// DISCOGS AUTH URL
const DISCOGS_AUTH_URL = token =>
  `${DISCOGS_BASE_URL}/oauth/authorize?oauth_token=${token}`;

// DISCOGS USER IDENTITY ENDPOINT
const IDENTITY_URL = `${DISCOGS_BASE_URL}/oauth/identity`;

// DISCOGS USER COLLECTION ENPOINT
const USER_COLLECTION_URL = (username, page) =>
  `${DISCOGS_BASE_URL}/users/${username}/collection/folders/0/releases?page=1&per_page=75`;

// DISCOGS WANTLIST ENDPOINT
const USER_WANTLIST_URL = username =>
  `${DISCOGS_BASE_URL}/users/${username}/wants`;

// DISCOGS URL CONFIGS

// IDENTITY CONFIG
const IDENTITY_CONFIG = (token, secret) => {
  return {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization: `OAuth oauth_consumer_key="${
        process.env.CONSUMER_KEY
      }",oauth_nonce="${Date.now()}",oauth_token="${token}",oauth_signature="${
        process.env.CONSUMER_SECRET
      }&${secret}",oauth_signature_method="PLAINTEXT",oauth_timestamp="${Date.now()}"`,
      'User-Agent':
        'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/72.0.3626.121 Safari/537.36',
    },
  };
};

const ACCESS_TOKEN_CONFIG = (token, secret, verifier) => {
  return {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization: `OAuth oauth_consumer_key="${
        process.env.CONSUMER_KEY
      }",oauth_nonce="${Date.now()}",oauth_token="${token}",oauth_signature="${
        process.env.CONSUMER_SECRET
      }&${secret}",oauth_signature_method="PLAINTEXT",oauth_timestamp="${Date.now()}",oauth_verifier="${verifier}"`,
      'User-Agent':
        'Mozilla/5.0 (Macintosh Intel Mac OS X 10_12_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/61.0.3163.100 Safari/537.36',
    },
  };
};

const REQUEST_TOKEN_CONFIG = redirectUrl => {
  const { CONSUMER_KEY, CONSUMER_SECRET } = process.env;

  return {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization: `OAuth oauth_consumer_key="${CONSUMER_KEY}",oauth_nonce="${Date.now()}",oauth_signature="${CONSUMER_SECRET}&",oauth_signature_method="PLAINTEXT",oauth_timestamp="${Date.now()}",oauth_callback="${redirectUrl}"`,
      'User-Agent':
        'Mozilla/5.0 (Macintosh Intel Mac OS X 10_12_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/61.0.3163.100 Safari/537.36',
    },
  };
};

module.exports = {
  DISCOGS_BASE_URL,
  DISCOGS_REQUEST_TOKEN_URL,
  DISCOGS_ACCESS_TOKEN_URL,
  DISCOGS_AUTH_URL,
  USER_COLLECTION_URL,
  USER_WANTLIST_URL,
  IDENTITY_CONFIG,
  ACCESS_TOKEN_CONFIG,
  REQUEST_TOKEN_CONFIG,
};
