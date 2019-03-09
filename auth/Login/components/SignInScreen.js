import React, { Component } from "react";
import {
  View,
  AsyncStorage,
  Linking,
  Text,
  Image,
  Dimensions,
  ImageBackground
} from "react-native";
import { AuthSession } from "expo";
import axios from "axios";
import * as Animatable from "react-native-animatable";
const windowSize = Dimensions.get("window");

import { Button } from "../../../components/common";

const backgroundImg = require("../../../assets/images/vinyl-record-player.png");
const power = require("../../../assets/images/power.png");

class SignInScreen extends Component {
  static navigationOptions = {
    header: null
  };

  state = {
    Token: "",
    Secret: "",
    verifier: "",
    loggedIn: null
  };

  componentDidMount() {
    this.getDiscogsRequestToken();
    AsyncStorage.multiGet(["oauth_token", "oauth_secret"]).then(values => {
      console.log("SIGN IN TOKENS", values);
      if (values[0][1] !== null)
        this.setState({ loggedIn: true }, () => {
          this.props.navigation.navigate("App");
        });
      if (values[0][1] === null) this.setState({ loggedIn: false });
    });
  }

  componentDidUpdate() {
    let url = AuthSession.getRedirectUrl();
    Linking.addEventListener(`${url}`, this._handleOpenURL());
  }

  componentWillUnmount() {
    let url = AuthSession.getRedirectUrl();

    Linking.removeEventListener(`${url}`, this._handleOpenURL());
  }

  getDiscogsRequestToken = async () => {
    const redirectUrl = AuthSession.getRedirectUrl();
    const config = {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: `OAuth oauth_consumer_key="jbUTpFhLTiyyHgLRoBgq",oauth_nonce="${Date.now()}",oauth_signature="LSQDaLpplgcCGlkzujkHyUkxImNlWVoI&",oauth_signature_method="PLAINTEXT",oauth_timestamp="${Date.now()}",oauth_callback="${redirectUrl}"`,
        "User-Agent":
          "Mozilla/5.0 (Macintosh Intel Mac OS X 10_12_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/61.0.3163.100 Safari/537.36"
      }
    };

    await axios
      .get(`https://api.discogs.com/oauth/request_token`, config)
      .then(response => {
        const stringBreak = response.data.split("=");
        const parseToken = stringBreak[2].split("&");
        const parseSecret = stringBreak[1].split("&");
        const reqToken = parseSecret[0];
        const tokenSecret = parseToken[0];
        this.setState({ Token: reqToken, Secret: tokenSecret });
      })
      .catch(error => {
        console.log(error);
      });
  };

  _handlePressAsync = async () => {
    const { Token } = this.state;
    let redirectUrl = AuthSession.getRedirectUrl();
    console.log("REDIRECT URL", redirectUrl);

    let oauthReturnObj = await AuthSession.startAsync({
      authUrl:
        `https://discogs.com/oauth/authorize?oauth_token=${Token}` +
        `&redirect_uri=${encodeURIComponent(redirectUrl)}`
    });
    console.log("OAUTH RETURN object", oauthReturnObj);

    this.setState({
      verifier: oauthReturnObj.params.oauth_verifier
    });
  };

  _handleOpenURL = () => {
    if (this.state.verifier) {
      this.getAccessToken();
      this.props.navigation.navigate("App");
    }
  };

  getAccessToken = () => {
    const { verifier, Token, Secret } = this.state;
    axios({
      method: "POST",
      url: `https://api.discogs.com/oauth/access_token`,
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: `OAuth oauth_consumer_key="jbUTpFhLTiyyHgLRoBgq",oauth_nonce="${Date.now()}",oauth_token="${Token}",oauth_signature="LSQDaLpplgcCGlkzujkHyUkxImNlWVoI&${Secret}",oauth_signature_method="PLAINTEXT",oauth_timestamp="${Date.now()}",oauth_verifier="${verifier}"`,
        "User-Agent":
          "Mozilla/5.0 (Macintosh Intel Mac OS X 10_12_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/61.0.3163.100 Safari/537.36"
      }
    })
      .then(response => {
        console.log("ACCESS TOKEN RESPONSE", response);

        const stringBreak = response.data.split("=");
        let secretSplit = stringBreak[1].split("&");

        const oauthSecret = stringBreak[2];
        const oauthToken = secretSplit[0];

        AsyncStorage.multiSet([
          ["oauth_token", oauthToken],
          ["oauth_secret", oauthSecret]
        ]);
      })
      .catch(error => {
        console.log(error.config);
      });
  };

  render() {
    return (
      <View style={styles.imagesContainer}>
        <ImageBackground style={styles.backgroundImage} source={backgroundImg}>
          <View style={styles.headingContainer}>
            <Text style={styles.title}>Powered by Discogs</Text>
            <Image style={styles.logo} source={power} />
            <Text style={styles.subText}>
              Vinylizr is a companion tool that uses the cataloging features of
              Discgos.
            </Text>
          </View>

          <Animatable.View animation="fadeIn" style={styles.animateStyles}>
            <Button onPress={this._signInAsync}>Get Started</Button>
            <Button onPress={this._signOutAsync}>Sign Out</Button>
          </Animatable.View>
        </ImageBackground>
      </View>
    );
  }

  discogsRedirect = () => {
    const { Token } = this.state;
    Linking.openURL(`https://discogs.com/oauth/authorize?oauth_token=${Token}`);
  };

  _signInAsync = () => {
    const { Token, Secret } = this.state;
    if (Token.length && Secret.length) {
      this._handlePressAsync();
    }
  };

  _signOutAsync = async () => {
    await AsyncStorage.clear();
  };
}

const styles = {
  animateStyles: {
    flex: 1,
    justifyContent: "flex-end",
    marginBottom: 40
  },
  headingContainer: {
    alignItems: "center",
    justifyContent: "flex-end",
    marginTop: 100,
    width: 295
  },
  title: {
    backgroundColor: "transparent",
    fontSize: 24,
    color: "#ffffff",
    lineHeight: 29,
    marginBottom: 10
  },
  subText: {
    backgroundColor: "transparent",
    color: "#ffffff",
    fontSize: 16,
    lineHeight: 29,
    marginTop: 10,
    textAlign: "center"
  },
  logo: {
    width: 24,
    height: 28
  },
  imagesContainer: {
    width: windowSize.width,
    height: windowSize.height,
    justifyContent: "flex-end",
    alignItems: "center"
  },
  backgroundImage: {
    flex: 1,
    width: windowSize.width,
    height: windowSize.height,
    backgroundColor: "#000",
    justifyContent: "flex-end",
    alignItems: "center"
  }
};

// class HomeScreen extends React.Component {
//   static navigationOptions = {
//     title: "Welcome to the app!"
//   };

//   render() {
//     return (
//       <View>
//         <Button title="Show me more of the app" onPress={this._showMoreApp} />
//         <Button title="Actually, sign me out :)" onPress={this._signOutAsync} />
//       </View>
//     );
//   }

//   _showMoreApp = () => {
//     this.props.navigation.navigate("Other");
//   };
// }

export default SignInScreen;
