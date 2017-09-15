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
import SearchSuccessModal from '../components/SearchSuccessModal';


class SearchResultItem extends Component {
constructor(props) {
	super(props);
	this.state = {
    leftActionActivated: false,
    rightActionActivated: false,
    isModalVisible: false,
    leftSwiped: false,
    rightSwiped: false
    };
}
//
//
//
// checkCollectionForRecords() {
//     let discogsRecord = this.props.item.thumb;
//     this.props.collectionRecords.map((collectionRecord) => {
//       if (discogsRecord === collectionRecord) {
//         console.log("already in collection", discogsRecord, collectionRecord);
//         this.setState({collectionRecordSaved: " in collection"})
//       } else if (!collectionRecord) {
//         console.log("NOT HERE ", discogsRecord, collectionRecord);
//         this.setState({collectionRecordSaved: '' })
//       }
//     })
//   }
//
//   checkWantlistForRecords() {
//     let discogsRecord = this.props.item.thumb;
//     this.props.wantlistRecords.map((wantlistRecord) => {
//       // console.log("DATABASE: ", wantlistRecord);
//       if (discogsRecord === wantlistRecord) {
//         console.log("already in wantlist");
//         this.setState({wantlistRecordSaved: " in wantlist"})
//       } else if (!wantlistRecord) {
//         this.setState({wantlistRecordSaved: ''})
//       }
//     })
//   }
//
saveToCollection = () => {
  let discogsRecord = this.props.item.thumb;
  this.props.saveCollectionItem(discogsRecord);
  this.setState({ leftSwiped: true })
  setTimeout(() => this._hideModal(), 2000)
    console.log(this.state);
 }
//
//
//
saveToWantlist = () => {
  let discogsRecord = this.props.item.thumb;
  this.props.saveWantlistItem(discogsRecord)
  this.setState({ rightSwiped: true })
  setTimeout(() => this._hideModal(), 2000)
 }
//
// beenThereDoneThat = () => {
//   const smallWantlistIcon = require('../img/smallWantlistIcon.png');
//   const smallCollectionIcon = require('../img/smallCollectionIcon.png');
//   let collectionRecord = this.state.collectionRecordSaved;
//   let wantlistRecord = this.state.wantlistRecordSaved;
//   if (collectionRecord) {
//     return (
//       <Text
//         style={styles.collectionSavedTextStyle}>
//         <Image source={smallCollectionIcon} />  {collectionRecord}
//       </Text>
//     )
//   } else if (wantlistRecord) {
// return (
//   <Text
//     style={styles.wantlistSavedTextStyle}>
//     <Image source={smallWantlistIcon} />  {wantlistRecord}
//   </Text>
//     )
//   }
// }

_showLeftModal = () => {
  this.setState({ isModalVisible: true, leftSwiped: true })
  setTimeout(() => this._hideModal(), 2000)
}
_showRightModal = () => {
  this.setState({ isModalVisible: true, rightSwiped: true })
  setTimeout(() => this._hideModal(), 2000)
}

  _hideModal = () => {
     this.setState({ isModalVisible: false })
     console.log(this.state);
}


render() {
  let discogsRecord = this.props.item.thumb;
  const { item, onSwipeStart, onSwipeRelease } = this.props;
  let discogsString = item.title.split('-');
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
  const { leftActionActivated, rightActionActivated, toggle } = this.state;
  const wantlistIcon = require('../img/wantlistButton.png');
  const collectionIcon = require('../img/collectionButton.png');
  const check = require('../img/checkmark.png');

  const leftContent = [
    <View style={[styles.leftSwipeItem, {backgroundColor: leftActionActivated ? '#2EF470' : '#000'}]}>
      <Image style={styles.leftIconStyles} source={collectionIcon} />
    </View>
  ];
  const rightContent = [
    <View style={[styles.rightSwipeItem, {backgroundColor: rightActionActivated ? '#F4702E' : '#000'}]}>
        <Image style={styles.rightIconStyles} source={wantlistIcon} />
    </View>
  ];

  return (
    <SearchSuccessModal
       isModalVisible={this.state.isModalVisible}
       leftSwiped={this.state.leftSwiped}
       rightSwiped={this.state.rightSwiped}
       >
    <Swipeable
      leftContent={leftContent}
      rightContent={rightContent}
      leftActionActivationDistance={100}
      rightActionActivationDistance={100}
      onLeftActionActivate={() =>
        this.setState({leftActionActivated: true})
    }
      onLeftActionDeactivate={() =>
        this.setState({leftActionActivated: false})
    }
      onRightActionActivate={() =>
        this.setState({rightActionActivated: true})
    }
      onRightActionDeactivate={() =>
        this.setState({rightActionActivated: false})
    }
      onLeftActionRelease={this.saveToCollection}
      onLeftActionComplete={() => this.setState({isModalVisible: true})}
      onRightActionComplete={() => this.setState({isModalVisible: true})}
      onRightActionRelease={this.saveToWantlist}
      onSwipeStart={onSwipeStart}
      onSwipeRelease={onSwipeRelease}

      >
      <CardSection>
        <View style={imageView}>
          {!item.thumb ? <Image
            style={imageStyle}
            source={require('../img/n-a.png')}
          /> : <Image
            style={imageStyle}
            source={{ uri: item.thumb }}
          />}
        </View>

      <View style={textView}>
          <Text style={titleTextStyle}>{title}</Text>
          <Text style={artistTextStyle}>{artist}</Text>
        </View>
      </CardSection>
    </Swipeable>
  </SearchSuccessModal>

    );
  }
};

const styles = {
  container: {
    flexDirection: 'column'
  },

  textView: {
    justifyContent: 'center',
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
  leftSwipeItem: {
    flex: 1,
    alignItems: 'flex-end',
    justifyContent: 'center',
    paddingRight: 20
  },
  // collectionSavedTextStyle: {
  //   color: '#2EF470',
  //   marginLeft: 12,
  //   marginTop: 9,
  //   fontSize: 10
  // },
  // wantlistSavedTextStyle: {
  //   color: '#F4702E',
  //   marginLeft: 12,
  //   marginTop: 9,
  //   fontSize: 10
  // },
  imageStyle: {
    height: 85,
    width: 85
  },
  rightSwipeItem: {
      flex: 1,
      alignItems: 'flex-start',
      justifyContent: 'center',
      paddingLeft: 20
    },
    searchModal: {
      justifyContent: 'center',
      height: 90,
      width: 90
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
      saveWantlistItem: (item) => {
          dispatch(saveWantlistItem(item))
      },
    }
  }



export default connect(mapStateToProps, mapDispatchToProps)(SearchResultItem);
