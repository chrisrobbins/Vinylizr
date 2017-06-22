import React, { Component } from 'react';
import {
  View,
  Text,
  Image
} from 'react-native';

import { Header } from '../components/common';
import * as firebase from "firebase";


class UserCollections extends Component {
  state = { albums: [] };



componentWillMount() {
  const rootRef = firebase.database().ref();
  const speedRef = rootRef.child('albums');
  speedRef.on('value', snap => {
    this.setState({
      albums: snap.val()
      });
    });
  }


  render() {
    let renderCollection = this.state.albums;
    return (

      <View style={styles.container}>
        <View style={styles.headerContainer}>
        <Header headerText={"Collection"} />
        </View>
        <View style={styles.textContainer}>
          <View style={styles.text}>
            <Image style={styles.collectImage} source={{ uri: `${renderCollection}` }}/></View>
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
  },
  collectImage: {
    height: 85,
    width: 85
  }
};

export default UserCollections;
