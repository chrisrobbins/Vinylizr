import React, { Component } from 'react';
import {
  Text,
  View,
  Image,
  Linking,
  ListView,
  TouchableHighlight
} from 'react-native';
import * as firebase from 'firebase';



import { CardSection } from '../components/common/CardSection';
import { Button } from '../components/common/Button';

import Swipeable from 'react-native-swipeable';

export default class AlbumDetail extends Component {
//   constructor(props) {
//   super(props);
//   var myFirebaseRef = new firebase.database().ref();
//   this.albumsRef = myFirebaseRef.child('albums');
//
//   this.state = {
//     newAlbum: '',
//     albumSource: new ListView.DataSource({rowHasChanged: (row1, row2) => row1 !== row2})
//   };
//
//   this.albums = [];
// }
// componentDidMount() {
//   // When a album is added
//   this.albumsRef.on('child_added', (dataSnapshot) => {
//     this.albums.push({id: dataSnapshot.key(), text: dataSnapshot.val()});
//     this.setState({
//       todoSource: this.state.albumSource.cloneWithRows(this.albums)
//     });
//   });
//
//   // When a album is removed
//   this.albumsRef.on('child_removed', (dataSnapshot) => {
//       this.albums = this.albums.filter((x) => x.id !== dataSnapshot.key());
//       this.setState({
//         albumSource: this.state.albumSource.cloneWithRows(this.albums)
//       });
//   });
// }
// saveToCollection(album) {
//   let myRef = firebase.database();
// }


  saveToCollection() {
    const myFirebaseRef = firebase.database().ref();
    myFirebaseRef.set({
  albums: `${this.props.album.cover}`
});
  }


render() {
  const { album } = this.props;
  const { title } = album;
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
