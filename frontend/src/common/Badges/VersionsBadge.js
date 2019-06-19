import React, { Component } from 'react';
import { Text, View } from 'react-native';

class VersionsBadge extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>{this.props.children}</Text>
      </View>
    );
  }
}

const styles = {
  container: {
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 2,
    borderColor: 'rgba(217,217,217,.6)',
    paddingLeft: 6,
    paddingRight: 6,
  },
  text: {
    color: 'rgba(217,217,217,.6)',
    fontSize: 12,
  },
};

export default VersionsBadge;
