import React from 'react';
import {
  View,
  Image,
  TouchableOpacity
} from 'react-native';

const inputBarCode = require('../../img/barcode.png');

const BarCode = () => {
  const { containerStyle, barcode } = styles;
  return (
    <TouchableOpacity style={containerStyle}>
      <Image style={barcode} source={inputBarCode} />
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
  barcode: {
    alignSelf: 'flex-end',
    marginBottom: 18
  }
};

export { BarCode };
