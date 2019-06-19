import React, { Component } from 'react';
import { Text, View, Image, TouchableOpacity } from 'react-native';
import { CardSection } from '#common/';
import { UserData } from '#src/contexts';
import vinylAxios from 'axios';
import { VersionsBadge, WantlistBadge, CollectionBadge } from '#common/Badges/';
import noImage from '/assets/images/empty-star.png';
import { VINYLIZR_API_BASE_URL } from '#src/routes';
class MasterReleaseResult extends Component {
  state = {
    records: [],
    inCollection: [],
    inWantlist: [],
    page: 1,
  };

  componentDidMount() {
    this.getMasterReleases();
  }

  getMasterReleases = async () => {
    const {
      item: { master_id },
    } = this.props;
    const { page } = this.state;
    const { token, tokenSecret } = await UserData();
    const accessData = {
      token,
      tokenSecret,
    };
    const url = `${VINYLIZR_API_BASE_URL}/master-releases?master=${master_id}&page=${page}`;
    vinylAxios.post(url, accessData).then(response => {
      const { versions } = response.data;
      this.setState({ records: versions });
    });
  };

  render() {
    const {
      item: { thumb, title },
    } = this.props;
    const { records } = this.state;
    wantsInList = records.filter(record => record.stats.user.in_wantlist > 0);
    collectedInList = records.filter(
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
            records: records,
            masterRelease: item,
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
              <VersionsBadge>{records.length} VERSIONS</VersionsBadge>
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

export default MasterReleaseResult;
