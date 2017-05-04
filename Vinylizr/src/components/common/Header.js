// Import libraries for making a component
import React from 'react';
import { Text, View } from 'react-native';

// Make a component
const Header = (props) => {
  const { textStyle, viewStyle } = styles;

  return (
    <View style={viewStyle}>
      <Text style={textStyle}>{props.headerText}</Text>
    </View>
  );
};

const styles = {
  viewStyle: {
    backgroundColor: '#1A1A1A',
    justifyContent: 'center',
    alignItems: 'center',
    height: 65,
    paddingTop: 15,
    position: 'relative',
    borderBottomWidth: 1,
    borderBottomColor: '#F42E4A'
  },
  textStyle: {
    fontSize: 14,
    color: '#fff'
  }
};

// Make the component available to other parts of the app
export { Header };
