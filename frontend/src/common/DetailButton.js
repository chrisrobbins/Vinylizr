import React from 'react';
import { Text, TouchableOpacity } from 'react-native';

const DetailButton = ({ onPress, children, btnStyle, txtStyle }) => {
  return (
    <TouchableOpacity onPress={onPress} style={btnStyle}>
      <Text style={txtStyle}>{children}</Text>
    </TouchableOpacity>
  );
};

export default DetailButton;
