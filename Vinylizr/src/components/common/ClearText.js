import React from 'react';
import {
  View,
  Image,
  TouchableOpacity
} from 'react-native';

const inputClearText = require('../../img/clear_text.png');

const ClearText = () => {
  const { containerStyle, clearText } = styles;
  return (
    <TouchableOpacity style={containerStyle}>
      <Image style={clearText} source={inputClearText} />
    </TouchableOpacity>
  );
};

const styles = {
  containerStyle: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    height: 5,
    alignSelf: 'flex-end',
    marginRight: 13
  },
  clearText: {
    alignSelf: 'flex-end',
    marginBottom: 18
  }
};

export { ClearText };
