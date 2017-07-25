import React, { Component } from 'react';
import {
  Text,
  View,
  Image,
  Linking,
  ListView,
  TouchableHighlight
} from 'react-native';
import fire from './fire.js'
import { connect } from 'react-redux';

import { CardSection } from '../components/common/CardSection';
import { Button } from '../components/common/Button';
import {saveCollectionItem} from '../actions/collection-action'
import {saveWantlistItem} from '../actions/wantlist-action'
import {fetchCollection} from '../actions/collection-action'
import {fetchWantlist} from '../actions/wantlist-action'
import Swipeable from 'react-native-swipeable';

class SearchResultItem extends Component {

  state = { recordSaved: '' }


  componentWillMount() {
    this.props.fetchCollection();
    this.props.fetchWantlist();
    this.saved();
    // console.log(this.state, this.props.album.cover);

  }

saveToCollection() {
  let newRecord = this.props.album.cover;
  this.props.saveCollectionItem(newRecord)
}
saveToWantlist() {
  let newRecord = this.props.album.cover;
  this.props.saveWantlistItem(newRecord)
}

saved() {
  this.props.collection.collection.albums.map(collectionAlbum => {
  if (this.props.album.cover === collectionAlbum ) {
    this.setState({ recordSaved: "collection"})
      }
    })
    this.props.wantlist.wantlist.albums.map(wantlistAlbum => {
    if (this.props.album.cover === wantlistAlbum) {
    this.setState({ recordSaved: "wantlist"})
    }
  })
}

beenThereDoneThat() {
  if (this.state.recordSaved === "wantlist") {
    return (
      <Text style={styles.wantlistSavedTextStyle}>wantlist</Text>
    )
  } else if (this.state.recordSaved === "collection") {
return (
  <Text style={styles.collectionSavedTextStyle}>collection</Text>
    )
  }
}


render() {
  const { album } = this.props;
  const { title, cover } = album;
  const {
    imageView,
    textView,
    imageStyle,
    titleTextStyle,
    artistTextStyle,
    collectionSavedTextStyle
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
      leftActionActivationDistance={25}
      onLeftActionRelease={this.saveToCollection.bind(this)}
      rightActionActivationDistance={25}
      onRightActionRelease={this.saveToWantlist.bind(this)}
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
          {this.beenThereDoneThat()}
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
  collectionSavedTextStyle: {
    color: '#2EF470'
  },
  wantlistSavedTextStyle: {
    color: '#F4702E'
  },
  imageStyle: {
    height: 85,
    width: 85
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
const mapStateToProps = (state) => {
    return {
      ...state
    }
}
// for click events so that dispatches can happen
const mapDispatchToProps = (dispatch) => {
    return {
        saveCollectionItem: (album) => {
            dispatch(saveCollectionItem(album))
        },
        saveWantlistItem: (album) => {
            dispatch(saveWantlistItem(album))
        },
        fetchCollection: () => {
          dispatch(fetchCollection())
        },
        fetchWantlist: () => {
          dispatch(fetchWantlist())
        }
      }
    }



export default connect(mapStateToProps, mapDispatchToProps)(SearchResultItem);
