import React, { Component } from 'react';
import {
  Text,
  View,
  Image,
  Linking,
  ListView,
  TouchableHighlight
} from 'react-native';
import fire from '../fire.js'
import { connect } from 'react-redux';
import * as actions from '../actions';

import { CardSection } from '../components/common/CardSection';
import { Button } from '../components/common/Button';

import Swipeable from 'react-native-swipeable';

class AlbumDetail extends Component {

componentWillMount() {
fire
console.log(this.props);
}


saveToCollection() {

  this.props.saveAlbum(this.props.album.cover)
  console.log("BOOYA ", this.props.album.cover);
}

render() {
  const { album } = this.props;
  const { title, cover } = album;
  const {
    imageView,
    textView,
    imageStyle,
    titleTextStyle,
    artistTextStyle
  } = styles;

  const wantListIcon = require('../img/wantlistButton.png');
  const collectionIcon = require('../img/collectionButton.png');
  const leftButtons = [
    <TouchableHighlight
      style={styles.leftButtons}>
      <Image style={styles.leftIconStyles} source={collectionIcon} />
    </TouchableHighlight>
  ];

  const rightButtons = [
    <TouchableHighlight
      style={styles.rightButtons}>
      <Image style={styles.rightIconStyles} source={wantListIcon} />
    </TouchableHighlight>
  ];

  return (
    <Swipeable
      leftButtons={leftButtons}
      leftButtonWidth={80}
      rightButtons={rightButtons}
      rightButtonWidth={80}
      leftActionActivationDistance={75}
      onLeftActionRelease={this.saveToCollection.bind(this)}
    >
      <CardSection>
        <View style={imageView}>
          <Image
            style={imageStyle}
            source={{ uri: album.cover }}
          />
      </View>

      <View style={textView}>
          <Text style={titleTextStyle}>{album.title}</Text>
          <Text style={artistTextStyle}>{album.artist.name}</Text>
        </View>
      </CardSection>
    </Swipeable>
  );
}
};

const styles = {
  textView: {
    justifyContent: 'center'
  },
  titleTextStyle: {
    fontSize: 16,
    color: "#DADADA",
    marginLeft: 10
  },
  artistTextStyle: {
    fontSize: 14,
    color: "rgba(217,217,217,.6)",
    marginLeft: 10,
    marginTop: 5
  },
  imageStyle: {
    height: 80,
    width: 80
  },
  rightButtons: {
    backgroundColor: '#F4702E',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  leftButtons: {
    backgroundColor: '#2EF470',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  leftIconStyles: {
    alignSelf: 'flex-end',
    marginRight: 29
  },
  rightIconStyles: {
    alignSelf: 'flex-start',
    marginLeft: 29
  }
};

export default connect(null, actions)(AlbumDetail);
