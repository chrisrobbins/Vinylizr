import React from 'react';
import { TextInput, View } from 'react-native';

const SearchInput = ({ ref, value, onChangeText, placeholder, secureTextEntry, onChange }) => {
  const { inputStyle, containerStyle } = styles;

  return (
    <View style={containerStyle}>
      <TextInput
        placeholder={placeholder}
        placeholderTextColor="rgba(217,217,217,.6)"
        autoCorrect={false}
        style={inputStyle}
        value={value}
        onChangeText={onChangeText}
        onChange={onChange}
        secureTextEntry={secureTextEntry}
        ref={ref}
        selectionColor={'#F42E4A'}
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
    paddingLeft: 7,
    paddingRight: 7
  },
  containerStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 25,
    borderBottomWidth: 1,
    borderBottomColor: "#ffffff",

  }
};


export { SearchInput };
