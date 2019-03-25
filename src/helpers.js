// Discogs User Profile Request
getDiscogsIdentity = () => {
  const { oauthToken, oauthSecret } = this.state;
  const url = `${DISCOGS_BASE_URL}${IDENTITY_URL}`;
  const config = IDENTITY_CONFIG(oauthToken, oauthSecret);
  axios
    .get(url, config)
    .then(response => {
      this.setState({ user: response.data });
    })

    .catch(error => {
      console.log(error.config);
    });
};

getTokens = () => {
  AsyncStorage.multiGet(['oauth_token', 'oauth_secret']).then(values => {
    const user_token = values[0][1];
    const user_secret = values[1][1];
    this.setState({ oauthToken: user_token, oauthSecret: user_secret });
  });
};
