import React, { Component } from 'react';
import {
  Text,
  View,
  Image,
  ImageBackground,
  ScrollView,
  TouchableOpacity,
  AsyncStorage,
} from 'react-native';
import vinylAxios from 'axios';
import { connect } from 'react-redux';
import { UserData } from 'src/contexts';
import {
  saveToCollection,
  removeFromCollection,
} from '#modules/Collection/actions';
import { saveToWantlist, removeFromWantlist } from '#modules/Wantlist/actions';
import Stars from 'react-native-stars';

import { DetailButton } from '#common';
import TrackList from '#views/TrackList/TrackList';
import albumGradient from '/assets/images/album_gradient_BG.png';
import starFull from '/assets/images/star-full.png';
import starEmpty from '/assets/images/empty-star.png';
import goTo from '/assets/images/goto-icon.png';
import { VINYLIZR_API_BASE_URL } from '../../src/routes';
import { styles } from './styles';

class AlbumDetail extends Component {
  state = {
    avgRating: '',
    tracklist: [],
    low: '',
    median: '',
    high: '',
    userRating: '',
    record: this.props.navigation.state.params.item,
    inCollection: this.props.navigation.state.params.inCollection,
    inWantlist: this.props.navigation.state.params.inWantlist,
    goBack: this.props.navigation.state.params.routeBack,
  };

  static navigationOptions = {
    drawerLabel: 'AlbumDetail',
    header: null,
  };

  componentDidMount() {
    this.checkCollectionForExistingRelease();
  }

  getTrackList = () => {
    const { item } = this.props.navigation.state.params;
    const release_id = item.id;

    const url = `https://api.discogs.com/releases/${release_id}`;
    vinylAxios
      .get(url)
      .then(res => {
        this.setState({
          tracklist: res.data.tracklist,
          avgRating: res.data.community.rating.average,
          numForSale: res.data.num_for_sale,
        });
      })
      .catch(error => {
        this.setState({ error });
      });
  };

  toggleInWantlist = () => {
    const { record } = this.state;
    if (!this.state.inWantlist) {
      this.addToWantlist(record);
      this.setState({ inWantlist: true });
    }
    if (this.state.inWantlist) {
      this.deleteFromWantlist(record);
      this.setState({ inWantlist: false });
    }
  };

  toggleInCollection = async () => {
    const { record } = this.state;
    if (!this.state.inCollection) {
      this.addToCollection(record);
      this.setState({ inCollection: true });
    }
    if (this.state.inCollection) {
      this.deleteFromCollection(record);
      this.setState({ inCollection: false });
    }
  };

  checkCollectionForExistingRelease = async () => {
    const { user, token, tokenSecret } = await UserData();
    const userMeta = JSON.parse(user);
    const { username } = userMeta;
    const {
      item: { id },
    } = this.props.navigation.state.params;
    const accessData = {
      token,
      tokenSecret,
    };
    const url = `${VINYLIZR_API_BASE_URL}/check-collection?release=${id}&user=${username}`;
    const {
      data: { releases },
    } = await vinylAxios.get(url, accessData);
    if (releases.length > 0) {
      this.setState({ inCollection: true });
    }
  };

  getPrices = () => {
    const { item, userData } = this.props.navigation.state.params;
    const release_id = item.id;
    AsyncStorage.multiGet(['oauth_token', 'oauth_secret']).then(values => {
      const user_token = values[0][1];
      const user_secret = values[1][1];

      vinylAxios({
        method: 'GET',
        url: `https://api.discogs.com/marketplace/price_suggestions/${release_id}`,
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          Authorization: `OAuth oauth_consumer_key="jbUTpFhLTiyyHgLRoBgq",oauth_nonce="${Date.now()}",oauth_token="${user_token}",oauth_signature="LSQDaLpplgcCGlkzujkHyUkxImNlWVoI&${user_secret}",oauth_signature_method="PLAINTEXT",oauth_timestamp="${Date.now()}"`,
          'User-Agent':
            'Mozilla/5.0 (Macintosh Intel Mac OS X 10_12_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/61.0.3163.100 Safari/537.36',
        },
      }).then(response => {
        this.setState({
          low: response.data['Good Plus (G+)'].value,
          median: response.data['Very Good Plus (VG+)'].value,
          high: response.data['Mint (M)'].value,
        });
      });
    });
  };

  changeRating = val => {
    const { item, userData } = this.props.navigation.state.params;
    const release_id = item.id;
    const user_name = userData.username;
    AsyncStorage.multiGet(['oauth_token', 'oauth_secret']).then(values => {
      const user_token = values[0][1];
      const user_secret = values[1][1];
      const instance_id = item.instance_id;
      const folder_id = item.folder_id;

      vinylAxios({
        method: 'POST',
        url: `https://api.discogs.com//users/${user_name}/collection/folders/${folder_id}/releases/${release_id}/instances/${instance_id}`,
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          Authorization: `OAuth oauth_consumer_key="jbUTpFhLTiyyHgLRoBgq",oauth_nonce="${Date.now()}",oauth_token="${user_token}",oauth_signature="LSQDaLpplgcCGlkzujkHyUkxImNlWVoI&${user_secret}",oauth_signature_method="PLAINTEXT",oauth_timestamp="${Date.now()}"`,
          'User-Agent':
            'Mozilla/5.0 (Macintosh Intel Mac OS X 10_12_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/61.0.3163.100 Safari/537.36',
        },
        rating: `'${rating}'`,
      });
    });
  };

  getUserRating = () => {
    const { item, userData } = this.props.navigation.state.params;
    const release_id = item.id;
    const user_name = userData.username;

    const url = `https://api.discogs.com//releases/${release_id}/rating/${user_name}`;
    vinylAxios
      .get(url)
      .then(res => {
        this.setState({ userRating: res.data.rating });
      })
      .catch(error => {
        this.setState({ error });
      });
  };

  addToCollection = async item => {
    const { token, tokenSecret, user } = await UserData();
    const accessData = {
      token,
      tokenSecret,
    };
    const userMeta = JSON.parse(user);
    const { username } = userMeta;
    const { id } = item;
    try {
      await this.props.dispatch(saveToCollection(accessData, username, id));
      console.log(`Added ${item.basic_information.title}`);
    } catch (error) {
      console.log('ERROR', error);
    }
  };
  deleteFromCollection = async item => {
    const { token, tokenSecret, user } = await UserData();
    const accessData = {
      token,
      tokenSecret,
    };
    const { newInstance } = this.props;
    const userMeta = JSON.parse(user);
    const { username } = userMeta;
    const { id, instance_id } = item;
    const instance = !newInstance ? instance_id : newInstance;
    try {
      await this.props.dispatch(
        removeFromCollection(accessData, username, id, instance)
      );
      console.log(`removed ${item.basic_information.title}`);
    } catch (error) {
      console.log('ERROR', error);
    }
  };

  addToWantlist = async item => {
    const { token, tokenSecret, user } = await UserData();
    const accessData = {
      token,
      tokenSecret,
    };
    const userMeta = JSON.parse(user);
    const { username } = userMeta;
    const { id } = item;
    try {
      await this.props.dispatch(saveToWantlist(accessData, username, id));
      console.log(`Added ${item.basic_information.title}`);
    } catch (error) {
      console.log('ERROR', error);
    }
  };
  deleteFromWantlist = async item => {
    const { token, tokenSecret, user } = await UserData();
    const accessData = {
      token,
      tokenSecret,
    };
    const { newWantInstance } = this.props;
    const userMeta = JSON.parse(user);
    const { username } = userMeta;
    const { id, instance_id } = item;
    const instance = !newWantInstance ? instance_id : newWantInstance;
    try {
      await this.props.dispatch(
        removeFromWantlist(accessData, username, id, instance)
      );
      console.log(`removed ${item.basic_information.title}`);
    } catch (error) {
      console.log('ERROR', error);
    }
  };

  goBack = () => {
    const { goBack } = this.state;
    this.props.navigation.navigate(goBack);
  };

  render() {
    const { item } = this.props.navigation.state.params;
    const {
      avgRating,
      low,
      median,
      high,
      numForSale,
      tracklist,
      userRating,
      inCollection,
      inWantlist,
    } = this.state;
    const roundedRating = Math.round(avgRating * 10) / 10;
    const roundedMedian = !median ? 0 : median.toFixed(2);
    const roundedLow = !low ? 0 : low.toFixed(2);
    const roundedHigh = !high ? 0 : high.toFixed(2);
    const title = item.basic_information.title;
    const artist = item.basic_information.artists[0].name;
    const label = item.basic_information.labels[0].name;
    const year = item.basic_information.year;

    userRatingNum = parseInt(userRating);

    return (
      <View style={styles.detailScrollView}>
        <ScrollView contentContainerStyle={styles.scrollViewChild}>
          <View style={styles.imagesContainer}>
            <ImageBackground
              style={styles.backgroundImage}
              source={{
                uri: item.basic_information.cover_image,
              }}
              blurRadius={1}
              resizeMode="cover"
            >
              <ImageBackground
                source={albumGradient}
                resizeMode="cover"
                style={styles.album_gradient}
              >
                <View style={styles.backTextContainer}>
                  <TouchableOpacity onPress={this.goBack}>
                    <Text style={styles.backText}>BACK</Text>
                  </TouchableOpacity>
                </View>
                <View style={styles.infoContainer}>
                  <Image
                    source={{
                      uri: item.basic_information.cover_image,
                    }}
                    style={styles.detailThumb}
                  />
                  <View
                    style={{
                      width: 350,
                      marginBottom: 80,
                    }}
                  >
                    <Text
                      numberOfLines={1}
                      ellipsifyMode={'tail'}
                      style={styles.detailTitle}
                    >
                      {title}
                    </Text>
                    <Text style={styles.detailText}>{artist}</Text>
                    <Text style={styles.detailText}>{label}</Text>
                    <Text style={styles.detailText}>{year}</Text>
                  </View>
                </View>
                <View style={styles.btnContainer}>
                  <DetailButton
                    btnStyle={
                      inCollection === true
                        ? styles.detailCollectionTrue
                        : styles.detailCollectionBtnFalse
                    }
                    txtStyle={styles.btnCollText}
                    onPress={this.toggleInCollection}
                  >
                    {inCollection === true
                      ? 'In Collection'
                      : 'Add to Collection'}
                  </DetailButton>
                  <DetailButton
                    btnStyle={
                      inWantlist === true
                        ? styles.detailWantlistBtnTrue
                        : styles.detailWantlistBtnFalse
                    }
                    onPress={this.toggleInWantlist}
                    txtStyle={styles.btnWantText}
                  >
                    {inWantlist === true ? 'In Wantlist' : 'Add to Wantlist'}
                  </DetailButton>
                </View>
              </ImageBackground>
            </ImageBackground>
          </View>
          <View style={styles.midContainer}>
            <View style={styles.avgRatingContainer}>
              <Text style={styles.midTitle}>AVG. RATING</Text>
              <View style={styles.ratingContainer}>
                <Text style={styles.bigRate}>{roundedRating}</Text>
                <Text style={styles.littleRate}>/5</Text>
              </View>
              <View style={styles.starContainer}>
                <Text style={styles.rateAlbumTitle}>Rate Album</Text>
                <Stars
                  half={false}
                  rating={3}
                  update={val => this.changeRating(val)}
                  spacing={4}
                  starSize={30}
                  count={5}
                  fullStar={starFull}
                  emptyStar={starEmpty}
                />
              </View>
            </View>
            <View style={styles.midDivider} />
            <View style={styles.valueContainer}>
              <Text style={styles.midTitle}>MEDIAN VALUE</Text>
              <Text style={styles.median}>${roundedMedian}</Text>
              <View style={styles.lowHiContainer}>
                <View style={styles.lowContainer}>
                  <Text style={styles.lowTitle}>Low</Text>
                  <Text style={styles.loHiPrice}>${roundedLow}</Text>
                </View>
                <View style={styles.hiContainer}>
                  <Text style={styles.lowTitle}>High</Text>
                  <Text style={styles.loHiPrice}>${roundedHigh}</Text>
                </View>
              </View>
              <View>
                <TouchableOpacity style={styles.buyLinkContainer}>
                  <Text style={styles.buyLink}>{numForSale} for sale</Text>
                  <Image source={goTo} />
                </TouchableOpacity>
              </View>
            </View>
          </View>
          <View style={styles.endDivider} />
          <TrackList tracklist={tracklist} />
        </ScrollView>
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    newInstance: state.UserCollection.newInstance,
    newWantInstance: state.UserWantlist.newWantInstance,
  };
};

export default connect(mapStateToProps)(AlbumDetail);
