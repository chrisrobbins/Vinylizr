import React, { Component } from 'react';
import axios from 'axios';
import { Button, Input, AlbumDetail, BarCode, ClearText } from './common';
import { Debounce } from 'react-throttle';

import {
  View,
  Text,
  ScrollView
} from 'react-native';

class DeezerSearch extends Component {
state = { text: '', albums: [] };

ComponentWillMount() {
  if (this.state.text === '') {
    return this.setState({ text: '' })
  }
}

 searchDeezer() {
   let apiSearch = this.state.newText;
   axios.get(
     `https://api.deezer.com/search/album/?q=${apiSearch}&index=0&limit=50&output=json`
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
   clearTextInput() {
     this.setState({ newText: '', albums: [] });

   }


  render() {
    console.log(this.state);
    return (
      <View style={styles.container}>

        <Debounce time="300" handler="onChangeText">

        <Input

          type="search"

          style={styles.search}

          value={this.state.newText}

          onChangeText={this.searchDeezer.bind(this)}

          onChange={(event) => this.setState({ newText: event.nativeEvent.text })}

          placeholder="Artist or Album"

          placeholderTextColor="#D9D9D9"

          >

        </Input>

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
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  renderAlbums: {
    marginTop: 1,
  },
  inputContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    height: 5,
    alignSelf: 'flex-end',
    marginRight: 10
  }
};

export default DeezerSearch;
