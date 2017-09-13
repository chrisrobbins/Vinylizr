import React, { Component } from 'react';
import {
  Text,
  View,
  Image,
  Linking,
  TouchableHighlight
} from 'react-native';
import { connect } from 'react-redux';
import {
  saveCollectionItem,
} from '../actions/collection-action';
import {
  saveWantlistItem,
} from '../actions/wantlist-action';
import { CardSection } from '../components/common/CardSection';
import { Button } from '../components/common/Button';
import Swipeable from 'react-native-swipeable';

class SearchResultItem extends Component {
constructor(props) {
	super(props);
	this.state = {
    collectionRecordSaved: '',
    wantlistRecordSaved: '',
    };
}

componentWillMount() {
  this.checkCollectionForRecords();
}


checkCollectionForRecords() {
    let discogsRecord = this.props.album.thumb;
    this.props.collectionRecords.map((collectionRecord) => {
      if (discogsRecord === collectionRecord) {
        console.log("already in collection", discogsRecord, collectionRecord);
        this.setState({collectionRecordSaved: " in collection"})
      } else if (!collectionRecord) {
        console.log("NOT HERE ", discogsRecord, collectionRecord);
        this.setState({collectionRecordSaved: '' })
      }
    })
  }

  checkWantlistForRecords() {
    let discogsRecord = this.props.album.thumb;
    this.props.wantlistRecords.map((wantlistRecord) => {
      // console.log("DATABASE: ", wantlistRecord);
      if (discogsRecord === wantlistRecord) {
        console.log("already in wantlist");
        this.setState({wantlistRecordSaved: " in wantlist"})
      } else if (!wantlistRecord) {
        this.setState({wantlistRecordSaved: ''})
      }
    })
  }

saveToCollection() {
  let discogsRecord = this.props.album.thumb;
  this.props.saveCollectionItem(discogsRecord)
  this.checkCollectionForRecords()
  console.log(discogsRecord);
  this
 }



saveToWantlist() {
  this.props.saveWantlistItem
  this.setState({wantlistRecordSaved: " in wantlist"})
  console.log(discogsRecord);
}

beenThereDoneThat() {
  const smallWantlistIcon = require('../img/smallWantlistIcon.png');
  const smallCollectionIcon = require('../img/smallCollectionIcon.png');
  let collectionRecord = this.state.collectionRecordSaved;
  let wantlistRecord = this.state.wantlistRecordSaved;
  if (collectionRecord) {
    return (
      <Text
        style={styles.collectionSavedTextStyle}>
        <Image source={smallCollectionIcon} />  {collectionRecord}
      </Text>
    )
  } else if (wantlistRecord) {
return (
  <Text
    style={styles.wantlistSavedTextStyle}>
    <Image source={smallWantlistIcon} />  {wantlistRecord}
  </Text>
    )
  }
}



render() {
  const { album, leftActionActivated, rightActionActivated } = this.props;
  const { thumb } = album;
  const discogsString = album.title.split('-');
  const title = discogsString[1];
  const artist = discogsString[0];
  const {
    imageView,
    textView,
    imageStyle,
    titleTextStyle,
    artistTextStyle,
    collectionSavedTextStyle,
    wantlistSavedTextStyle
  } = styles;
  const wantlistIcon = require('../img/wantlistButton.png');
  const collectionIcon = require('../img/collectionButton.png');
  const check = require('../img/check-o.png');

  const leftContent = [
    <View style={[styles.leftSwipeItem, {backgroundColor: leftActionActivated ? '#2EF470' : '#000'}]}>
    {leftActionActivated ?
      <Image style={styles.leftIconStyles} source={wantlistIcon} /> :
      <Image style={styles.leftIconStyles} source={collectionIcon} />}
    </View>
  ];
  const rightContent = [
    <View style={[styles.rightSwipeItem, {backgroundColor: rightActionActivated ? '#F4702E' : '#000'}]}>
    {rightActionActivated ?
      <Image style={styles.rightIconStyles} source={check} /> :
      <Image style={styles.rightIconStyles} source={wantlistIcon} />}
    </View>
  ];

  return (
    <Swipeable
          leftActionActivationDistance={100}
          rightActionActivationDistance={100}
          leftContent={leftContent}
          rightContent={rightContent}
          onLeftActionActivate={() => this.props.onLeftActionActivate}
          onLeftActionDeactivate={() => this.props.onLeftActionDeactivate}
          onRightActionActivate={() => this.props.onRightActionActivate}
          onRightActionDeactivate={() => this.props.onRightActionDeactivate}
          onLeftActionRelease={this.saveToCollection.bind(this)}
          onRightActionRelease={this.saveToWantlist.bind(this)}
          onSwipeStart={() => this.props.onSwipeStart}
          onSwipeRelease={() => this.props.onSwipeRelease}
    >


      <CardSection>
        <View style={imageView}>
          <Image
            style={imageStyle}
            source={{ uri: album.thumb }}
          />
        </View>

      <View style={textView}>
          <Text style={titleTextStyle}>{title}</Text>
          <Text style={artistTextStyle}>{artist}</Text>
          {this.beenThereDoneThat()}
        </View>
      </CardSection>
    </Swipeable>

  );
}
};

const styles = {
  textView: {
    justifyContent: 'center',
    flex: 1
  },
  titleTextStyle: {
    fontSize: 20,
    color: "#DADADA",
    marginLeft: 5
  },
  artistTextStyle: {
    fontSize: 16,
    color: "rgba(217,217,217,.6)",
    marginLeft: 10,
    marginTop: 1
  },
  collectionSavedTextStyle: {
    color: '#2EF470',
    marginLeft: 12,
    marginTop: 9,
    fontSize: 10
  },
  wantlistSavedTextStyle: {
    color: '#F4702E',
    marginLeft: 12,
    marginTop: 9,
    fontSize: 10
  },
  imageStyle: {
    height: 85,
    width: 85
  },
  leftIconStyles: {
      alignSelf: 'flex-end',
      marginRight: 29
    },
    rightIconStyles: {
      alignSelf: 'flex-start',
      marginLeft: 29
    },
    leftSwipeItem: {
      flex: 1,
      alignItems: 'flex-end',
      justifyContent: 'center',
      paddingRight: 20
    },
    rightSwipeItem: {
      flex: 1,
      alignItems: 'flex-start',
      justifyContent: 'center',
      paddingLeft: 20
    },
    leftIconStyles: {
      alignSelf: 'flex-end',
      marginRight: 29
    },
    rightIconStyles: {
      alignSelf: 'flex-start',
      marginLeft: 29
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
      saveCollectionItem: (item) => {
          dispatch(saveCollectionItem(item))
      },

  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchResultItem);
