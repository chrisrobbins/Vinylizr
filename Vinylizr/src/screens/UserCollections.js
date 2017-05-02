import React, { Component } from 'react';
import {
  View,
  Text
} from 'react-native';

class UserCollections extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>Scroll me!</Text>
      </View>
    );
  }
}

const styles = {
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  text: {
    color: '#fff'
  }
};

export default UserCollections;
