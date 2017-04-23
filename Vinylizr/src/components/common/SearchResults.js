import React, { Component } from 'react';
import { ScrollView, View } from 'react-native';
import axios from 'axios';
import firebase from 'firebase';
import AlbumDetail from './AlbumDetail';
import DiscogsSearch from '../DiscogsSearch';


class SearchResults extends Component {
  state = { albums: [] };

  componentWillMount() {
    <View>
      <DiscogsSearch />
    </View>
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
      </ScrollView>
    );
  }
}



export { SearchResults };
