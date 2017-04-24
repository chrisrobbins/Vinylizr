import React from 'react';
import { TextInput, View } from 'react-native';

const Input = ({ value, onChangeText, placeholder, secureTextEntry, onChange }) => {
  const { inputStyle, containerStyle } = styles;

  return (
    <View style={containerStyle}>
      <TextInput
        placeholder={placeholder}
        placeholderTextColor="#D9D9D9"
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
    color: '#fff',
    fontSize: 18,
    lineHeight: 23,
    flex: 1,
    backgroundColor: '#000',
    justifyContent: 'flex-start',
    height: 40,

  },
  containerStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 25,
    borderBottomWidth: 2,
    borderBottomColor: "#F42E4A"
  }
};

export { Input };
