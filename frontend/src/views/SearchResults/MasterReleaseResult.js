import React, { Component } from 'react';
import { Text, View, Image, TouchableOpacity } from 'react-native';
import vinylAxios from 'axios';
import { connect } from 'react-redux';
import { UserData } from '#src/contexts';
import { VINYLIZR_API_BASE_URL } from '#src/routes';
import { getMasterReleases } from '#modules/Database/actions';
import { CardSection } from '#common/';
import { VersionsBadge, WantlistBadge, CollectionBadge } from '#common/Badges/';
import noImage from '/assets/images/empty-star.png';
class MasterReleaseResult extends Component {
  state = {
    versions: [],
    inCollection: [],
    inWantlist: [],
    page: 1,
  };

  // componentDidMount() {
  //   console.log('MASTER PROPS', this.props);
  //   this.retrieveMasterReleases();
  // }

  componentWillUnmount() {
    this.setState({ versions: [], inCollection: [], inWantlist: [] });
  }

  retrieveMasterReleases = async () => {
    const {
      item: { master_id },
    } = this.props;
    const { page } = this.state;
    const { token, tokenSecret } = await UserData();
    const accessData = {
      token,
      tokenSecret,
    };
    const url = `${VINYLIZR_API_BASE_URL}/database/master-releases?master=${master_id}&page=${page}&per_page=15`;
    const {
      data: { versions },
    } = await vinylAxios.post(url, accessData);
    console.log({ versions });
    try {
      this.setState({ versions });
    } catch (err) {
      console.log('ERROR', err);
    }
  };

  render() {
    const {
      item: { thumb, title },
    } = this.props;
    const { versions } = this.state;
    wantsInList = versions.filter(record => record.stats.user.in_wantlist > 0);
    collectedInList = versions.filter(
      record => record.stats.user.in_collection > 0
    );
    let discogsString = title.split('-');
    const recordTitle = discogsString[1];
    const artist = discogsString[0];
    const {
      imageView,
      textView,
      imageStyle,
      titleTextStyle,
      artistTextStyle,
      container,
    } = styles;

    return (
      <TouchableOpacity
        onPress={() => {
          this.props.navigation.navigate('ReleaseList', {
            versions,
            masterRelease: this.props.item,
          });
        }}
        style={container}
      >
        <CardSection>
          <View style={imageView}>
            {!thumb ? (
              <Image style={imageStyle} source={noImage} />
            ) : (
              <Image style={imageStyle} source={{ uri: thumb }} />
            )}
          </View>

          <View style={textView}>
            <Text
              ellipsizeMode={'tail'}
              numberOfLines={1}
              style={titleTextStyle}
            >
              {recordTitle}
            </Text>
            <Text
              ellipsizeMode={'tail'}
              numberOfLines={1}
              style={artistTextStyle}
            >
              {artist}
            </Text>
            <View style={styles.badgeContainer}>
              <VersionsBadge>MASTER</VersionsBadge>
              {collectedInList.length > 0 && (
                <CollectionBadge>{collectedInList.length}</CollectionBadge>
              )}
              {wantsInList.length > 0 && (
                <WantlistBadge>{wantsInList.length}</WantlistBadge>
              )}
            </View>
          </View>
        </CardSection>
      </TouchableOpacity>
    );
  }
}

const styles = {
  container: {
    flex: 1,
    flexDirection: 'column',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(217,217,217,.6)',
  },
  badgeContainer: {
    flexDirection: 'row',
    marginLeft: 10,
    alignItems: 'center',
    paddingBottom: 10,
  },
  textView: {
    justifyContent: 'center',
  },
  titleTextStyle: {
    fontSize: 18,
    color: '#DADADA',
    marginLeft: 5,
    fontFamily: 'Lato-Regular',
  },
  artistTextStyle: {
    fontSize: 14,
    color: 'rgba(217,217,217,.6)',
    marginLeft: 10,
    marginTop: 1,
    marginBottom: 10,
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
};

// const mapStateToProps = state => {
//   return {
//     masterReleases: state.Database.masterReleases,
//   };
// };

export default MasterReleaseResult;
