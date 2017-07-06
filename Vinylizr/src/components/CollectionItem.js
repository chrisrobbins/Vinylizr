import React, { Component } from 'react';
import {
  View,
  Image
} from 'react-native';
import { connect } from 'react-redux';
import * as actions from '../actions';

class CollectionItem extends Component {

  componentWillMount() {
    console.log(this.props.albums);
  }

  handleClick() {
    this.props.deleteAlbum(this.props.id);
  }

  render() {
    return (
      <View>
        <Image src={`${this.props.albums}`} />
      </View>
    );
  }
}

export default connect(null, actions)(CollectionItem);
