

import React, { Component } from 'react';
import axios from 'axios';
import Button from './common';

import {
  View,
  Text,
  TextInput
} from 'react-native';

class DiscogsSearch extends Component {
state = { text: '' };
searchDiscogs() {
  let apiSearch = this.setState{( text: '' )};
  axios.get(
    `https://api.discogs.com/database/search?artist=${apiSearch}&key=jbUTpFhLTiyyHgLRoBgq&secret=LSQDaLpplgcCGlkzujkHyUkxImNlWVoI`
  )
    .then(response => console.log(response.data))
    .catch(response => console.log('youre fucked'));
 }

  render() {
    return (
      <View style={styles.container}>
        <TextInput
          type="search"
          ref="searchBar"
          style={styles.search}
          value={this.state.text}
          onChangeText={this.searchDiscogs.bind(this)}
          placeholder="Search Artist or Song"
        />

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
    height: 50,
    backgroundColor: 'white',
    alignSelf: 'stretch'
  },
  signOut: {
    alignSelf: 'stretch'
  }
};

export default DiscogsSearch;
