import React, { Component } from "react";
import {
  Text,
  View,
  Linking,
  Image,
  Dimensions,
  ImageBackground,
  AsyncStorage
} from "react-native";
import * as Animatable from "react-native-animatable";
const windowSize = Dimensions.get("window");

import { Button } from "../../../components/common";

class LoginForm extends Component {
  discogsRedirect = () => {
    const { access_token } = this.props;
    console.log("ACCESS TOKEN", access_token);

    Linking.openURL(
      `https://discogs.com/oauth/authorize?oauth_token=${access_token}`
    );
  };

  render() {
    const backgroundImg = require("../../../assets/images/vinyl-record-player.png");
    const power = require("../../../assets/images/power.png");

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
            <Button onPress={this.discogsRedirect}>Get Started</Button>
          </Animatable.View>
        </ImageBackground>
      </View>
    );
  }
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

export default LoginForm;
