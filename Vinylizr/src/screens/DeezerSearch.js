import React, { Component } from 'react';
import axios from 'axios';

import {
   Button,
   BarCode,
   ClearText
} from '../components/common';

import SearchResultItem from '../components/SearchResultItem';


import { Debounce } from 'react-throttle';

import {
  View,
  Text,
  ScrollView,
  TextInput
} from 'react-native';

class DeezerSearch extends Component {
  constructor(props) {
    super(props);
    this.state = { text: '', albums: [] };
  }



 searchDeezer() {
   let apiSearch = this.state.newText;
   axios.get(
     `https://api.deezer.com/search/album/?q=${apiSearch}&index=0&limit=20&output=json`
   )
   .then((response) => this.setState({ albums: response.data.data }));
 }

   renderAlbums() {
     return this.state.albums.map((album) =>
       <SearchResultItem key={album.id} album={ album } />
     );
   }


   clearTextInput() {
     this._textInput.setNativeProps({ text: '' });
     this.setState({ text: '', albums: [] });
   }
   renderInputButton() {
     return <ClearText onPress={this.clearTextInput.bind(this)} />;
   }

  render() {

    return (
      <View style={styles.container}>

        <View style={styles.inputStyleContainer}>

      <Debounce time="250" handler="onChangeText">

        <TextInput

          ref={text => this._textInput = text}

          style={styles.inputStyle}

          autoFocus={true}

          type="search"

          value={this.state.newText}

          onChangeText={this.searchDeezer.bind(this)}

          onChange={(event) => this.setState({ newText: event.nativeEvent.text })}

          placeholder="Artist or Album"

          placeholderTextColor="#D9D9D9"

          selectionColor={'#F42E4A'}

        />

      </Debounce>
      </View>

      <View style={styles.inputContainer}>

        {this.renderInputButton()}

      </View>

        <ScrollView
          style={styles.renderAlbums}
          automaticallyAdjustContentInsets={false}
        >

          {this.renderAlbums()}

        </ScrollView>

      </View>
    );
  }
}

const styles = {
  renderAlbums: {
    flex: 1,
    marginTop: -3
  },
  inputContainer: {
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    height: 5,
    marginRight: 10,
    marginBottom: 0,
  },
  container: {
    flex: 1
  },
  inputStyleContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: 25,
    height: 40,
    borderBottomWidth: 1,
    borderBottomColor: "#ffffff",
    marginBottom: 0
  },
  inputStyle: {
    color: '#fff',
    fontSize: 18,
    lineHeight: 23,
    backgroundColor: '#fff',
    justifyContent: 'flex-start',
    flex: 1,
    paddingLeft: 7,
    paddingRight: 7,
    paddingBottom: 0,
    marginBottom: 0
  },
};

export default DeezerSearch;
