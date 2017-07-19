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
    this.state = { text: '', albums: [], currentlyOpenSwipeable: null };
  }

    handleScroll = () => {
      const {currentlyOpenSwipeable} = this.state;

      if (currentlyOpenSwipeable) {
        currentlyOpenSwipeable.recenter();
      }
    };



 searchDeezer() {
   let apiSearch = this.state.newText;
   axios.get(
     `https://api.deezer.com/search/album/?q=${apiSearch}&index=0&limit=40&output=json`
   )
   .then((response) => this.setState({ albums: response.data.data }));
 }

   renderAlbums() {
     const {currentlyOpenSwipeable} = this.state;
    const itemProps = {
      onOpen: (event, gestureState, swipeable) => {
        if (currentlyOpenSwipeable && currentlyOpenSwipeable !== swipeable) {
          currentlyOpenSwipeable.recenter();
        }

        this.setState({currentlyOpenSwipeable: swipeable});
      },
      onClose: () => this.setState({currentlyOpenSwipeable: null})
    };
     return this.state.albums.map((album) =>
       <SearchResultItem {...itemProps} key={album.id} album={ album } />
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
          onScroll={this.handleScroll}
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
    borderBottomWidth: 1,
    borderBottomColor: "#ffffff",
    marginBottom: 0
  },
  inputStyle: {
    color: '#fff',
    fontSize: 18,
    lineHeight: 23,
    flex: 1,
    backgroundColor: '#000',
    justifyContent: 'flex-start',
    height: 40,
    paddingLeft: 7,
    paddingRight: 7,
    paddingBottom: 0,
    marginBottom: 0
  },
};

export default DeezerSearch;
