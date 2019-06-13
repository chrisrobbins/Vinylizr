import React, { Component } from 'react';
import { AsyncStorage } from 'react-native';
import { IDENTITY_URL, IDENTITY_CONFIG } from '#src/routes';
import { UserProvider } from '#contexts/';
import axios from 'axios';

class IdentityLayer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: {},
      accessToken: '',
      oauthSecret: '',
    };
  }
  async componentDidMount() {
    await getTokens();
  }

  componentDidUpdate(prevState) {
    if (!prevState.accessToken && this.state.accessToken) {
      this.getDiscogsIdentity();
    }
  }

  getDiscogsIdentity = () => {
    const { accessToken, oauthSecret } = this.state;
    const url = IDENTITY_URL;
    const config = IDENTITY_CONFIG(accessToken, oauthSecret);
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
      this.setState({ accessToken: user_token, oauthSecret: user_secret });
    });
  };

  render() {
    return (
      <UserProvider value={{ name: 'chris' }}>
        {this.props.children}
      </UserProvider>
    );
  }
}

export default IdentityLayer;
