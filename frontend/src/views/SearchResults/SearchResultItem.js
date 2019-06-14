import React, { Component } from 'react';
import { Text, View, Image, AsyncStorage } from 'react-native';

import vinylAxios from 'axios';
import { CardSection } from '#common/CardSection';
import Swipeable from 'react-native-swipeable';
import SearchSuccessModal from '../Modals/SearchSuccessModal';
import wantlistIcon from '/assets/images/wantlistButton.png';
import collectionIcon from '/assets/images/collectionButton.png';
import { VINYLIZR_API_BASE_URL } from '#src/routes';
class SearchResultItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      leftActionActivated: false,
      rightActionActivated: false,
      isModalVisible: false,
      leftSwiped: false,
      rightSwiped: false,
    };
  }

  saveToCollection = async () => {
    const token = await AsyncStorage.getItem('access_token');
    const tokenSecret = await AsyncStorage.getItem('access_secret');
    const user = await AsyncStorage.getItem('userMeta');
    const userMeta = JSON.parse(user);
    const { username } = userMeta;
    const release_id = this.props.item.id;
    const url = `${VINYLIZR_API_BASE_URL}/?user=${username}&folder=1&release=${release_id}`;

    const accessData = {
      token,
      tokenSecret,
    };

    const {
      response: {
        data: { releases },
      },
    } = await vinylAxios.post(url, accessData);

    try {
      this.setState({ items: releases }, () => {
        this._showLeftModal();
      });
    } catch (err) {
      console.log('ERROR', err);
    }
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
          .then(response => {
            this.setState({ records: response.data.wants });
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
    setTimeout(() => this._hideModal(), 2000);
  };
  _showRightModal = () => {
    this.setState({ rightSwiped: true });
    setTimeout(() => this.setState({ isModalVisible: true }), 300);
    setTimeout(() => this._hideModal(), 2000);
  };

  _hideModal = () => {
    this.setState({ isModalVisible: false });
  };

  render() {
    const { item, onSwipeStart, onSwipeRelease } = this.props;
    let discogsRecord = item.thumb;
    const title = item.title;
    const artist = item.artist;
    const label = item.label[0];

    const {
      imageView,
      textView,
      imageStyle,
      titleTextStyle,
      artistTextStyle,
    } = styles;
    const { leftActionActivated, rightActionActivated } = this.state;

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

    return (
      <SearchSuccessModal
        isModalVisible={this.state.isModalVisible}
        leftSwiped={this.state.leftSwiped}
        rightSwiped={this.state.rightSwiped}
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
          onRightActionRelease={this.saveToWantlist}
          onSwipeStart={onSwipeStart}
          onSwipeRelease={onSwipeRelease}
        >
          <CardSection>
            <View style={imageView}>
              {!discogsRecord ? (
                <Image style={imageStyle} source={noImage} />
              ) : (
                <Image style={imageStyle} source={{ uri: discogsRecord }} />
              )}
            </View>

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
              <Text key={item.id} style={styles.artistTextStyle}>
                {item.label[0]} -{item.country || ''} - {item.year || ''}
              </Text>
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

  textView: {
    justifyContent: 'center',
    width: 250,
  },
  titleTextStyle: {
    fontSize: 20,
    color: '#DADADA',
    marginLeft: 5,
    fontFamily: 'Lato-Regular',
  },
  artistTextStyle: {
    fontSize: 16,
    color: 'rgba(217,217,217,.6)',
    marginLeft: 10,
    marginTop: 1,
    fontFamily: 'Lato-Regular',
  },
  leftSwipeItem: {
    flex: 1,
    alignItems: 'flex-end',
    justifyContent: 'center',
    paddingRight: 20,
  },
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

export default SearchResultItem;
