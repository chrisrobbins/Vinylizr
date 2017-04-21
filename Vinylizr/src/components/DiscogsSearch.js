

import React, { Component } from 'react';
import axios from 'axios';
import Button from './common';

import {
  View,
  Text,
  TextInput
} from 'react-native';

class DiscogsSearch extends Component {

 BASE_URL = 'https://api.discogs.com';

searchDiscogs() {
  axios.get(
    'BASE_URL + /database/search?q={query}&{?title,release_title,artist,barcode}')
    .then(console.log('it worked!'));
}

  render() {
    return (
      <View style={styles.container}>
        <TextInput
          onSubmit={this.searchDiscogs.bind(this)}
          placeholder="Search Artist or Song"
          style={styles.search}
        />
        <Button style={styles.signOut} onPress={() => firebase.auth().signOut()}>
          Log out
        </Button>
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
  search: {
    width: 20,
    height: 50,
    backgroundColor: 'white',
    alignSelf: 'stretch'
  },
  signOut: {
    alignSelf: 'stretch'
  }
};

export default DiscogsSearch;
