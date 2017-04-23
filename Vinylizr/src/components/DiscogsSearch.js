import React, { Component } from 'react';
import axios from 'axios';
import { Button, Input, SearchResults } from './common';

import {
  View,
  Text
} from 'react-native';

class DiscogsSearch extends Component {
state = { text: '' };

 searchDiscogs() {
   let apiSearch = this.state.newText;
   axios.get(
     `https://api.discogs.com/database/search?artist=${apiSearch}
     &key=jbUTpFhLTiyyHgLRoBgq&secret=LSQDaLpplgcCGlkzujkHyUkxImNlWVoI`
   )
     .then(response => this.setState({ albums: response.data.results }));
   }

  render() {
    console.log(this.state);
    return (
      <View style={styles.container}>
        <Input
          type="search"
          style={styles.search}
          value={this.state.newText}
          onChangeText={this.searchDiscogs.bind(this)}
          onChange={(event) => this.setState({ newText: event.nativeEvent.text })}
          placeholder="enter artist">
        </Input>
        <SearchResults />

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
  signOut: {
    alignSelf: 'stretch'
  }
};

export default DiscogsSearch;
