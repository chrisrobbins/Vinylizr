// DISCOGS CONSUMER KEY AND SECRET
export const CONSUMER_KEY = 'jbUTpFhLTiyyHgLRoBgq';
export const CONSUMER_SECRET = 'LSQDaLpplgcCGlkzujkHyUkxImNlWVoI';
// DISCOGS API BASE URL
export const DISCOGS_BASE_URL = 'https://api.discogs.com';

// DISCOGS USER IDENTITY ENDPOINT
export const IDENTITY = '/oauth/identity';

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
