import React, { Component } from 'react';
import {
  View,
  Text
} from 'react-native';

import { Header } from '../components/common';

class UserCollections extends Component {
  render() {
    return (

      <View style={styles.container}>
        <View style={styles.headerContainer}>
        <Header headerText={"Collection"} />
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.text}>Collection!</Text>
        </View>
      </View>
    );
  }
}

const styles = {
  textContainer: {
    flex: 1,
    justifyContent: 'center',
    alignSelf: 'center'
  },
  text: {
    color: '#fff'
  },
  container: {
    flex: 1
  }
};

export default UserCollections;
