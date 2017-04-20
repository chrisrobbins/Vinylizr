/* @flow */

import React, { Component } from 'react';
import axios from 'axios';
import {
  View,
  Text,
  Input,
  TouchableOpacity
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
        <Input
          onSubmit={this.searchDiscogs.bind(this)}
          placeholder="Search Artist or Song"
          style={styles.search}
        />
      </View>
    );
  }
}

const styles = {
  container: {
    flex: 1,
  },
  search: {
    width: 20
  }
};

export { DiscogsSearch };
