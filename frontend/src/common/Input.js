import React from 'react'
import { TextInput, View } from 'react-native'

const Input = ({ value, onChangeText, placeholder, secureTextEntry }) => {
  const { inputStyle, containerStyle } = styles

  return (
    <View style={containerStyle}>
      <TextInput
        placeholder={placeholder}
        placeholderTextColor="white"
        autoCorrect={false}
        style={inputStyle}
        value={value}
        onChangeText={onChangeText}
        multiline
        secureTextEntry={secureTextEntry}
      />

    </View>
  )
}

const styles = {
  inputStyle: {
    color: '#fff',
    fontSize: 18,
    borderBottomWidth: .5,
    borderBottomColor: '#fff',
    paddingBottom: 7
  },
  containerStyle: {
    flexDirection: 'column',
    alignItems: 'flex-end',
    marginTop: 35
  }
}

export { Input }
