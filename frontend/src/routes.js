// DISCOGS CONSUMER KEY AND SECRET
export const CONSUMER_KEY = 'jbUTpFhLTiyyHgLRoBgq';
export const CONSUMER_SECRET = 'LSQDaLpplgcCGlkzujkHyUkxImNlWVoI';
// DISCOGS API BASE URL
export const DISCOGS_BASE_URL = 'https://discogs.com';
export const DISCOGS_API_BASE_URL = 'https://api.discogs.com';
export const VINYLIZR_API_BASE_URL =
  'http://vinylizr.us-east-2.elasticbeanstalk.com';
// export const VINYLIZR_API_BASE_URL = 'http://localhost:8081';

// DISCOGS OAUTH REQUEST URL
export const DISCOGS_REQUEST_TOKEN_URL = `${DISCOGS_API_BASE_URL}/oauth/request_token`;

// DISCOGS ACCESS TOKEN URL
export const DISCOGS_ACCESS_TOKEN_URL = `${DISCOGS_API_BASE_URL}/oauth/access_token`;

// DISCOGS AUTH URL
export const DISCOGS_AUTH_URL = token =>
  `${DISCOGS_BASE_URL}/oauth/authorize?oauth_token=${token}`;

// DISCOGS USER IDENTITY ENDPOINT
export const IDENTITY_URL = `${DISCOGS_API_BASE_URL}/oauth/identity`;

// DISCOGS USER COLLECTION ENPOINT
export const USER_COLLECTION_URL = (username, page) =>
  `${DISCOGS_API_BASE_URL}/users/${username}/collection/folders/0/releases?page=1&per_page=75`;

// DISCOGS WANTLIST ENDPOINT
export const USER_WANTLIST_URL = username =>
  `${DISCOGS_API_BASE_URL}/users/${username}/wants`;

// DISCOGS URL CONFIGS

// IDENTITY CONFIG
export const IDENTITY_CONFIG = (token, secret) => {
  return {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization: `OAuth oauth_consumer_key="${CONSUMER_KEY}",oauth_nonce="${Date.now()}",oauth_token="${token}",oauth_signature="${CONSUMER_SECRET}&${secret}",oauth_signature_method="PLAINTEXT",oauth_timestamp="${Date.now()}"`,
      'User-Agent':
        'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/72.0.3626.121 Safari/537.36',
    },
  };
};

export const ACCESS_TOKEN_CONFIG = (token, verifier) => {
  return {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization: `OAuth oauth_consumer_key="${CONSUMER_KEY}",oauth_nonce="${Date.now()}",oauth_token="${token}",oauth_signature="${CONSUMER_SECRET}&",oauth_signature_method="PLAINTEXT",oauth_timestamp="${Date.now()}",oauth_verifier="${verifier}"`,
      'User-Agent':
        'Mozilla/5.0 (Macintosh Intel Mac OS X 10_12_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/61.0.3163.100 Safari/537.36',
    },
  };
};

export const REQUEST_TOKEN_CONFIG = redirectUrl => {
  return {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization: `OAuth oauth_consumer_key="${CONSUMER_KEY}",oauth_nonce="${Date.now()}",oauth_signature="${CONSUMER_SECRET}&",oauth_signature_method="PLAINTEXT",oauth_timestamp="${Date.now()}",oauth_callback="${redirectUrl}"`,
      'User-Agent':
        'Mozilla/5.0 (Macintosh Intel Mac OS X 10_12_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/61.0.3163.100 Safari/537.36',
    },
  };
};
