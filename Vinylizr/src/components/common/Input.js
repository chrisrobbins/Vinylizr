import React from 'react';
import { TextInput, View } from 'react-native';

const Input = ({ value, onChangeText, placeholder, secureTextEntry, onChange }) => {
  const { inputStyle, containerStyle } = styles;

  return (
    <View style={containerStyle}>
      <TextInput
        placeholder={placeholder}
        placeholderTextColor="white"
        autoCorrect={false}
        style={inputStyle}
        value={value}
        onChangeText={onChangeText}
        onChange={onChange}
        secureTextEntry={secureTextEntry}
      />

    </View>
  );
};

const styles = {
  inputStyle: {
    color: '#000',
    fontSize: 18,
    lineHeight: 23,
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'flex-start',
    height: 40
  },
  containerStyle: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 25

  }
};

export { Input };
