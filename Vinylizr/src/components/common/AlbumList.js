import React, { Component } from 'react';
import { ScrollView } from 'react-native';
import axios from 'axios';
import firebase from 'firebase';
import { Button } from './Button';
import { AlbumDetail } from './AlbumDetail';

class AlbumList extends Component {
  state = { albums: [] };

  componentWillMount() {
    axios.get('https://rallycoding.herokuapp.com/api/music_albums')
      .then(response => this.setState({ albums: response.data }));
  }

  renderAlbums() {
    return this.state.albums.map(album =>
      <AlbumDetail key={album.title} album={album} />
    );
  }

  render() {
    return (
      <ScrollView>
        {this.renderAlbums()}
        <Button onPress={() => firebase.auth().signOut()}>
          Log out
        </Button>
      </ScrollView>
    );
    console.log(ScrollView);

  }
}

export { AlbumList };
