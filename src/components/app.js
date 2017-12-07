import './ReactotronConfig';
import React, { Component } from 'react';
import { View, StatusBar, Linking, AsyncStorage } from 'react-native';
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
       loggedIn: null,
       verifier: '',
      }

      this._handleOpenURL = this._handleOpenURL.bind(this)
      this.getAccessToken = this.getAccessToken.bind(this)
      this.logIn = this.logIn.bind(this)
      this.logOut = this.logOut.bind(this)
      this.getToken = this.getToken.bind(this)
      this.getSecret = this.getSecret.bind(this)
  }

 logIn() {
   console.log("LOGGIN IN!!! I'm FIRING OK!");
   this.setState({ loggedIn: true })

  }

  logOut() {
    console.log("LOGGIN OUT!!!");
    this.setState({ loggedIn: false })
  }

  componentWillMount() {
    if (!this.getToken()) {
    console.log("NO TOKEN YOU HAVE BEEN LOGGED OUT ");
       this.logOut()
    } else {
      console.log("you are LOGGED IN FROM THE APP MY FRIEND: ");
       this.logIn()
    }


     let config = {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Authorization':`OAuth oauth_consumer_key="jbUTpFhLTiyyHgLRoBgq",oauth_nonce="${Date.now()}",oauth_signature="LSQDaLpplgcCGlkzujkHyUkxImNlWVoI&",oauth_signature_method="PLAINTEXT",oauth_timestamp="${Date.now()}",oauth_callback="vinylizr://collection"`,
          'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/61.0.3163.100 Safari/537.36'
        },
      }

    axios.get(`https://api.discogs.com/oauth/request_token`,  config)
    .then((response) => {
      const stringBreak = response.data.split('=')
      const parseToken = stringBreak[2].split('&')
      const parseSecret = stringBreak[1].split('&')
      const tokenSecret = parseSecret[0]
      const reqToken = parseToken[0]
      this.setState({ access_token: reqToken, token_secret: tokenSecret })
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

getSecret() {
 AsyncStorage.getItem('oauth_secret').then((keyValue) => {
   console.log(keyValue) //Display key value
   return keyValue
   }, (error) => {
   console.log(error) //Display error
 });
}

getToken() {
  AsyncStorage.getItem('oauth_token').then((keyValue) => {
    console.log(keyValue) //Display key value
    if (keyValue) {
      return keyValue
    } else {
      return 0
    }
  }).catch((error) => {
    console.log(error, "NOT WORKING FOR GETITING TOKENS")
  })
}

componentDidMount() {

Linking.addEventListener('url', this._handleOpenURL);

}
componentWillUnmount() {
Linking.removeEventListener('url', this._handleOpenURL);
}
_handleOpenURL(event) {
  let dscUrl = event.url.split('=')
  let dscVerifier = dscUrl[2]

this.setState({verifier:dscVerifier})
console.log(this.state, "what a shit show");
if (this.state.verifier === dscVerifier) {
this.getAccessToken()
}

}


//ACCESS TOKEN/VERIFIER
getAccessToken() {
  const {access_token, verifier, token_secret} = this.state
  console.log("CMON I NEED THIS: ", access_token);
  axios({method:'POST', url:`https://api.discogs.com/oauth/access_token`,
  headers:{
  'Content-Type': 'application/x-www-form-urlencoded',
  'Authorization':`OAuth oauth_consumer_key="jbUTpFhLTiyyHgLRoBgq",oauth_nonce="${Date.now()}",oauth_token="${access_token}",oauth_signature="LSQDaLpplgcCGlkzujkHyUkxImNlWVoI&${token_secret}",oauth_signature_method="PLAINTEXT",oauth_timestamp="${Date.now()}",oauth_verifier="${verifier}"`,
  'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/61.0.3163.100 Safari/537.36'
 }
})
  .then((response) => {
    this.logIn()
    console.log(response.data, "OH MAN I HOPE THIS WORKS");
    const stringBreak = response.data.split('=')
    let secretSplit = stringBreak[1].split('&')
    const oauthToken = stringBreak[2]
    const oauthSecret = secretSplit[0]

    AsyncStorage.setItem("oauth_token", `${oauthToken}`).then((value) => {console.log("STORAGE VALS: ")})
    AsyncStorage.setItem("oauth_secret", `${oauthSecret}`).then((value) => {console.log("STORAGE VALS: ")})

      this.setState({ loggedIn: true })


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


  renderContent() {

    switch (this.state.loggedIn) {
      case true:
        return <MainNav />
      case false:
        return <LoginForm access_token={this.state.access_token} loggedIn={this.logIn} isLoggedIn={this.state.loggedIn} loggedOut={this.logOut} getToken={this.getToken} getSecret={this.getSecret} />
      default:
        return <Spinner size="large" />;
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
    backgroundColor: '#000000'
  }
};
