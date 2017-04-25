import React, { Component } from 'react';
import axios from 'axios';
import { Button, Input, AlbumDetail, Tabs, BarCode, ClearText } from './common';
import { Debounce } from 'react-throttle';

import {
  View,
  Text,
  ScrollView
} from 'react-native';

class DiscogsSearch extends Component {
state = { text: '', albums: [] };

 searchDiscogs() {
   let apiSearch = this.state.newText;
   axios.get(
     `https://api.discogs.com/database/search?artist=${apiSearch}
     &key=jbUTpFhLTiyyHgLRoBgq&secret=LSQDaLpplgcCGlkzujkHyUkxImNlWVoI`
   )
     .then(response => this.setState({ albums: response.data.results }));
   }

   renderAlbums() {
     return this.state.albums.map(album =>
       <AlbumDetail key={ album.id } album={ album } />
     );
   }

   renderInputButton() {
     if (this.state.text == " ") {
       return <BarCode />;
   }
     return <ClearText />;
   }

  render() {
    console.log(this.state);
    return (
      <View style={styles.container}>

        <Tabs onPress={pressed => this.setState({ pressStatus: true })} />

        <Debounce time="400" handler="onChangeText">

        <Input

          type="search"

          style={styles.search}

          value={this.state.newText}

          onChangeText={this.searchDiscogs.bind(this)}

          onChange={(event) => this.setState({ newText: event.nativeEvent.text })}

          placeholder="Artist or Album"

          placeholderTextColor="#D9D9D9">

        </Input>

      </Debounce>

      <View>
        {this.renderInputButton()}
      </View>

        <ScrollView style={styles.renderAlbums}>

          {this.renderAlbums()}

        </ScrollView>

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
  renderAlbums: {
    marginTop: 20,
  }
};

export default DiscogsSearch;
