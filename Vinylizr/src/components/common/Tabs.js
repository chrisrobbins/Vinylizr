import React, { Component } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

const Tabs = () => {
  state={ pressStatus: false };

  const { onPress, buttonStyle, searchStyle, container, pressedButtonStyle } = styles;
  return (
  <View style={container}>
    <TouchableOpacity
      onPress={onPress} style={this.state.pressStatus ? pressedButtonStyle : buttonStyle}

    >

      <Text style={searchStyle}>
        Search
      </Text>

    </TouchableOpacity>

    <TouchableOpacity
      onPress={onPress} style={this.state.pressStatus ? pressedButtonStyle : buttonStyle}

    >
      <Text style={searchStyle}>
        Discover
      </Text>

    </TouchableOpacity>
  </View>
  );
};


const styles = {
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 75,
    flexDirection: 'row',
    backgroundColor: '#1a1a1a',
    alignSelf: 'stretch'
  },
  searchStyle: {
    color: 'rgba(217,217,217,.6)',
    fontSize: 17,
    marginTop: 12
  },
  buttonStyle: {
    alignSelf: 'stretch',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    flex: 1
  },
  pressedButtonStyle: {
    alignSelf: 'stretch',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    flex: 1,
    color: '#F42E4A',
    borderBottomColor: '#F42E4A',
    borderBottomWidth: 2
  }
}
export { Tabs };
