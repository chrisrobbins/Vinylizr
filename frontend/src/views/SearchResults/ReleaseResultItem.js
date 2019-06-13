import React, { Component } from 'react';
import { Text, View, Image, AsyncStorage } from 'react-native';

import CollectionBadge from '#commpn/Badges/CollectionBadge';
import WantlistBadge from '#commpn/Badges/WantlistBadge';

import axios from 'axios';

import { CardSection } from '#common/CardSection';
import Swipeable from 'react-native-swipeable';
import SearchSuccessModal from '../Modals/SearchSuccessModal';

class ReleaseResultItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      leftActionActivated: false,
      rightActionActivated: false,
      isModalVisible: false,
      leftSwiped: false,
      rightSwiped: false,
      isSwiping: null,
      releasesOwned: [],
      releasesWanted: [],
      page: 1,
    };
  }

  saveToCollection = () => {
    const { userData } = this.props;
    value = AsyncStorage.multiGet(['oauth_token', 'oauth_secret']).then(
      values => {
        const user_token = values[0][1];
        const user_secret = values[1][1];
        const user_name = userData.username;
        const release_id = this.props.item.id;

        axios({
          method: 'POST',
          url: `https://api.discogs.com/users/${user_name}/collection/folders/1/releases/${release_id}`,
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            Authorization: `OAuth oauth_consumer_key="jbUTpFhLTiyyHgLRoBgq",oauth_nonce="${Date.now()}",oauth_token="${user_token}",oauth_signature="LSQDaLpplgcCGlkzujkHyUkxImNlWVoI&${user_secret}",oauth_signature_method="PLAINTEXT",oauth_timestamp="${Date.now()}"`,
            'User-Agent':
              'Mozilla/5.0 (Macintosh Intel Mac OS X 10_12_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/61.0.3163.100 Safari/537.36',
          },
        })
          .then(response => {
            this.setState({ items: response.data.releases });
          })
          .then(() => {
            this._showLeftModal();
          })
          .catch(error => {
            console.log(error.config);
          });
      }
    );
  };

  saveToWantlist = () => {
    const { userData, item } = this.props;
    value = AsyncStorage.multiGet(['oauth_token', 'oauth_secret']).then(
      values => {
        const user_token = values[0][1];
        const user_secret = values[1][1];
        const user_name = userData.username;
        const release_id = item.id;

        axios({
          method: 'PUT',
          url: `https://api.discogs.com/users/${user_name}/wants/${release_id}`,
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            Authorization: `OAuth oauth_consumer_key="jbUTpFhLTiyyHgLRoBgq",oauth_nonce="${Date.now()}",oauth_token="${user_token}",oauth_signature="LSQDaLpplgcCGlkzujkHyUkxImNlWVoI&${user_secret}",oauth_signature_method="PLAINTEXT",oauth_timestamp="${Date.now()}"`,
            'User-Agent':
              'Mozilla/5.0 (Macintosh Intel Mac OS X 10_12_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/61.0.3163.100 Safari/537.36',
          },
        })
          .then(() => {
            this._showRightModal();
          })

          .catch(error => {
            console.log(error.config);
          });
      }
    );
  };

  _showLeftModal = () => {
    this.setState({ leftSwiped: true });
    setTimeout(() => this.setState({ isModalVisible: true }), 300);
    setTimeout(() => this.setState({ isModalVisible: false }), 2000);
  };
  _showRightModal = () => {
    this.setState({ rightSwiped: true });
    setTimeout(() => this.setState({ isModalVisible: true }), 300);
    setTimeout(() => this.setState({ isModalVisible: false }), 2000);
  };

  render() {
    const {
      item,
      onSwipeStart,
      onSwipeRelease,
      collectionRecords,
      wantlistRecords,
      artist,
    } = this.props;
    const title = item.title;

    const { textView, titleTextStyle, artistTextStyle } = styles;

    const {
      leftActionActivated,
      rightActionActivated,
      isModalVisible,
      leftSwiped,
      rightSwiped,
      releasesOwned,
      releasesWanted,
    } = this.state;
    const wantlistIcon = require('../assets/images/wantlistButton.png');
    const collectionIcon = require('../assets/images/collectionButton.png');

    const leftContent = [
      <View
        key={item.id}
        style={[
          styles.leftSwipeItem,
          { backgroundColor: leftActionActivated ? '#0967EE' : '#000' },
        ]}
      >
        <Image style={styles.leftIconStyles} source={collectionIcon} />
      </View>,
    ];
    const rightContent = [
      <View
        key={item.id}
        style={[
          styles.rightSwipeItem,
          { backgroundColor: rightActionActivated ? '#D400FF' : '#000' },
        ]}
      >
        <Image style={styles.rightIconStyles} source={wantlistIcon} />
      </View>,
    ];
    let recordReleased = item.released;
    if (recordReleased && recordReleased.includes('-')) {
      const releaseSplit = recordReleased.split('-');
      recordReleased = releaseSplit[0];
    }

    return (
      <SearchSuccessModal
        isModalVisible={isModalVisible}
        leftSwiped={leftSwiped}
        rightSwiped={rightSwiped}
        key={item.id}
      >
        <Swipeable
          key={item.id}
          leftContent={leftContent}
          rightContent={rightContent}
          leftActionActivationDistance={100}
          rightActionActivationDistance={100}
          onLeftActionActivate={() =>
            this.setState({ leftActionActivated: true })
          }
          onLeftActionDeactivate={() =>
            this.setState({ leftActionActivated: false })
          }
          onRightActionActivate={() =>
            this.setState({ rightActionActivated: true })
          }
          onRightActionDeactivate={() =>
            this.setState({ rightActionActivated: false })
          }
          onLeftActionRelease={this.saveToCollection}
          onLeftActionComplete={() => this.setState({ isModalVisible: true })}
          onRightActionComplete={() => this.setState({ isModalVisible: true })}
          onRightActionRelease={this.saveToWantlist}
          onSwipeStart={onSwipeStart}
          onSwipeRelease={onSwipeRelease}
        >
          <CardSection key={item.id}>
            <View style={textView}>
              <Text
                ellipsizeMode={'tail'}
                numberOfLines={1}
                style={titleTextStyle}
              >
                {title}
              </Text>
              <Text
                ellipsizeMode={'tail'}
                numberOfLines={1}
                style={artistTextStyle}
              >
                {artist}
              </Text>
              <View style={styles.badgeContainer} key={item.id}>
                <Text key={item.id} style={styles.labelTextStyle}>
                  {item.label} - {!item.released ? '' : recordReleased}
                </Text>
                {collectionRecords.map(record => {
                  if (record.id === item.id) {
                    releasesOwned.push(record);
                    return <CollectionBadge key={record.id}>1</CollectionBadge>;
                  }
                })}
                {wantlistRecords.map(record => {
                  if (record.id === item.id) {
                    releasesWanted.push(record);
                    return <WantlistBadge key={record.id}>1</WantlistBadge>;
                  }
                })}
              </View>
            </View>
          </CardSection>
        </Swipeable>
      </SearchSuccessModal>
    );
  }
}

const styles = {
  container: {
    flexDirection: 'column',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(217,217,217,.6)',
  },
  badgeContainer: {
    flexDirection: 'row',
  },

  textView: {
    justifyContent: 'center',
    width: 250,
    height: 125,
    marginLeft: 15,
  },
  titleTextStyle: {
    fontSize: 18,
    color: '#ffffff',
    marginLeft: 5,
    fontFamily: 'Lato-Regular',
    lineHeight: 22,
    letterSpacing: 1,
  },
  labelTextStyle: {
    fontSize: 16.5,
    fontFamily: 'Lato-Regular',
    marginLeft: 5,
    marginTop: 3,
    color: 'rgba(217,217,217,.6)',
  },
  artistTextStyle: {
    fontSize: 16.5,
    color: 'rgba(217,217,217,.6)',
    marginLeft: 5,
    marginTop: 1,
    marginBottom: 15,
    fontFamily: 'Lato-Regular',
  },
  leftSwipeItem: {
    flex: 1,
    alignItems: 'flex-end',
    justifyContent: 'center',
    paddingRight: 20,
  },
  // collectionSavedTextStyle: {
  //   color: '#0967EE',
  //   marginLeft: 12,
  //   marginTop: 9,
  //   fontSize: 10
  // },
  // wantlistSavedTextStyle: {
  //   color: '#D400FF',
  //   marginLeft: 12,
  //   marginTop: 9,
  //   fontSize: 10
  // },
  imageStyle: {
    height: 85,
    width: 85,
  },
  rightSwipeItem: {
    flex: 1,
    alignItems: 'flex-start',
    justifyContent: 'center',
    paddingLeft: 20,
  },
  searchModal: {
    justifyContent: 'center',
    height: 90,
    width: 90,
  },
};

export default ReleaseResultItem;
