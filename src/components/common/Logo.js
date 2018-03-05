import React from 'react';
import {
  View,
  Image,
  Text
} from 'react-native';

const vinylLogo = require('../../img/vinyl_logo.png');

const Logo = () => {
  const { containerStyle, logo, textStyle } = styles;
  return (
    <View style={containerStyle}>
      <Image style={logo} source={vinylLogo} />
      <Text style={textStyle}>
        Vinylizr
      </Text>
    </View>
  );
};

const styles = {
  containerStyle: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  logo: {
    height: 50,
    width: 65
  },
  textStyle: {
    marginTop: 15,
    color: '#F42E4A',
    fontSize: 18
  }
};

export { Logo };
