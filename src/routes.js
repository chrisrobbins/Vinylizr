// DISCOGS CONSUMER KEY AND SECRET
export const CONSUMER_KEY = 'jbUTpFhLTiyyHgLRoBgq';
export const CONSUMER_SECRET = 'LSQDaLpplgcCGlkzujkHyUkxImNlWVoI';
// DISCOGS API BASE URL
export const DISCOGS_BASE_URL = 'https://api.discogs.com';

// DISCOGS USER IDENTITY ENDPOINT
export const IDENTITY = `${DISCOGS_BASE_URL}/oauth/identity`;

// DISCOGS USER COLLECTION ENPOINT
export const USER_COLLECTION = (username, page) =>
  `${DISCOGS_BASE_URL}/users/${username}/collection/folders/0/releases?page=1&per_page=900`;

// DISCOGS WANTLIST ENDPOINT
export const USER_WANTLIST = username =>
  `${DISCOGS_BASE_URL}/users/${username}/wants`;

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
