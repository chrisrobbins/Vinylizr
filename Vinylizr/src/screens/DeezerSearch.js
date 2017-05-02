import React, { Component } from 'react';
import axios from 'axios';
import * as firebase from 'firebase';
import { Button, SearchInput, AlbumDetail, BarCode, ClearText } from '../components/common';
import { Debounce } from 'react-throttle';

import {
  View,
  Text,
  ScrollView
} from 'react-native';

class DeezerSearch extends Component {
  state = { text: '', albums: [] };

 searchDeezer() {
   let apiSearch = this.state.newText;
   axios.get(
     `https://api.deezer.com/search/album/?q=${apiSearch}&index=0&limit=40&output=json`
   )
   .then(response => this.setState({ albums: response.data.data }));
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
     return <ClearText onPress={this.clearTextInput.bind(this)} />;
   }
   clearTextInput(event) {
     this.setState({ newText: '', albums: [] });
     event.nativeEvent.text = "";

   }

  render() {
    console.log(this.state);
    return (
      <View style={styles.container}>

        <Debounce time="400" handler="onChangeText">

        <SearchInput

          type="search"

          value={this.state.newText}

          onChangeText={this.searchDeezer.bind(this)}

          onChange={(event) => this.setState({ newText: event.nativeEvent.text })}

          placeholder="Artist or Album"

          placeholderTextColor="#D9D9D9"

          >

        </SearchInput>

      </Debounce>

      <View style={styles.inputContainer}>
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
  renderAlbums: {
    marginTop: -3,
  },
  inputContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    height: 5,
    alignSelf: 'flex-end',
    marginRight: 10
  },
};

export default DeezerSearch;
