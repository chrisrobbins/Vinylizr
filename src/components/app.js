import React, { Component } from 'react';
import { View, StatusBar, Linking } from 'react-native';
import * as firebase from "firebase";
import { Spinner } from './common';
import MainNav from './MainNav';
import LoginForm from './LoginForm';
import DeepLinking from 'react-native-deep-linking'
import axios from 'axios'
console.disableYellowBox = true;

export default class App extends Component {
  constructor(props) {
    super(props)
      this.state = {
       access_token: '',
       token_secret: '',
       response: {},
       loggedIn: null
      }

  }




  componentWillMount() {
    const config = {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Authorization':`OAuth oauth_consumer_key="jbUTpFhLTiyyHgLRoBgq",oauth_nonce="${Date.now()}",oauth_signature="LSQDaLpplgcCGlkzujkHyUkxImNlWVoI&",oauth_signature_method="PLAINTEXT",oauth_timestamp="${Date.now()}",oauth_callback="${Linking.openURL('vinylizr://collection')}"`,
          'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/61.0.3163.100 Safari/537.36'
        },
      }

    axios.get(`https://api.discogs.com/oauth/request_token`,  config)
    .then((response) => {
      if(response.data.oauth_token) {
      this.setState({access_token:response.data.oauth_token, loggedIn: true})
    }
    else {
      return;
    }
  })
    .catch( (error) => {
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      console.log(error.response.data);
      console.log(error.response.status);
      console.log(error.response.headers);
    } else if (error.request) {
      // The request was made but no response was received
      // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
      // http.ClientRequest in node.js
      console.log(error.request);
    } else {
      // Something happened in setting up the request that triggered an Error
      console.log('Error', error.message);
    }
    console.log(error.config);
  });
}

componentDidMount() {
  Linking.getInitialURL().then((url) => {
    if (url) {
      console.log('Initial url is: ' + url);
    }
  }).catch(err => console.error('An error occurred', err));
}


  renderContent() {
    switch (this.state.loggedIn) {
      case true:
        return <MainNav />;
      case false:
        return <LoginForm access_token={this.state.access_token} isLoggedIn={this.state.loggedIn} />

      default:
        return <MainNav />;
    }
  }

  render() {
    return (

    <View style={styles.container}>
      <StatusBar
       barStyle="light-content"
      />
      {this.renderContent()}
    </View>

    );
  }
}

const styles = {
  container: {
    flex: 1,
    backgroundColor: '#000000'
  },
  status: {
    backgroundColor: 'transparent'
  }
};
