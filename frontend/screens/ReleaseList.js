import React, { Component } from 'react';
import {
  Text,
  View,
  Image,
  FlatList,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
const windowSize = Dimensions.get('window');
import { ReleaseResultItem } from '#views/SearchResults';
import { VersionsBadge, CollectionBadge, WantlistBadge } from '#common/Badges/';

export default class ReleaseList extends Component {
  state = {
    refreshing: null,
    page: 1,
  };
  static navigationOptions = {
    drawerLabel: 'ReleaseList',
    header: null,
  };

  renderFooter = () => {
    if (!this.state.loading) return null;
    return (
      <View
        style={{
          paddingVertical: 20,
          borderTopWidth: 1,
          borderColor: '#CED0CE',
        }}
      >
        <ActivityIndicator animating size="large" />
      </View>
    );
  };

  _keyExtractor = (item, index) => 'M' + index.toString();

  render() {
    const { masterRelease, versions } = this.props.navigation.state.params;
    const releasesInCollection = versions.filter(record => {
      return record.stats.user.in_collection > 0;
    });
    const releasesInWantlist = versions.filter(record => {
      return record.stats.user.in_wantlist > 0;
    });
    let discogsString = masterRelease.title.split('-');
    const title = discogsString[1];
    const artist = discogsString[0];

    return (
      <View style={styles.container}>
        <View style={styles.imagesContainer}>
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate('DiscogsSearch')}
          >
            <Image
              source={{ uri: masterRelease.thumb }}
              style={styles.detailThumb}
            />
          </TouchableOpacity>
          <View style={styles.headerContainer}>
            <Text
              numberOfLines={1}
              ellipsifyMode={'tail'}
              style={styles.detailTitle}
            >
              {title}
            </Text>
            <Text style={styles.detailArtist}>{artist}</Text>
            <View style={styles.badgeContainer}>
              <VersionsBadge>{versions.length} VERSIONS</VersionsBadge>
              {releasesInCollection.length > 0 && (
                <CollectionBadge style={styles.badge}>
                  {releasesInCollection.length}
                </CollectionBadge>
              )}
              {releasesInWantlist.length > 0 && (
                <WantlistBadge style={styles.badge}>
                  {releasesInWantlist.length}
                </WantlistBadge>
              )}
            </View>
          </View>
        </View>
        <FlatList
          data={versions}
          renderItem={({ item }) => (
            <ReleaseResultItem
              item={item}
              key={item.id}
              artist={artist}
              onSwipeStart={() => this.setState({ isSwiping: true })}
              onSwipeRelease={() => this.setState({ isSwiping: false })}
            />
          )}
          keyExtractor={this._keyExtractor}
          ListFooterComponent={this.renderFooter}
          onEndReachedThreshold={0.02}
          style={styles.renderAlbums}
          scrollEnabled={!this.state.isSwiping}
          style={styles.renderAlbums}
        />
      </View>
    );
  }
}

const styles = {
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  badgeContainer: {
    flexDirection: 'row',
    marginBottom: 10,
    marginLeft: 6,
  },
  imagesContainer: {
    width: windowSize.width,
    height: 145,
    flexDirection: 'row',
    backgroundColor: '#000',
    alignItems: 'flex-end',
    borderBottomWidth: 4,
    borderBottomColor: '#d3d3d3',
  },
  detailThumb: {
    height: 100,
    width: 100,
    marginBottom: 0,
    marginLeft: 0,
    marginRight: 15,
  },
  headerContainer: {
    justifyContent: 'center',
  },
  detailTitle: {
    color: '#fff',
    fontSize: 20,
    backgroundColor: 'transparent',
    fontFamily: 'Lato-Regular',
    lineHeight: 28,
  },
  detailArtist: {
    color: '#777777',
    marginBottom: 10,
    backgroundColor: 'transparent',
    fontFamily: 'Lato-Regular',
    lineHeight: 24,
    fontSize: 16,
    marginLeft: 6,
  },
  btnContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignSelf: 'stretch',
    marginBottom: 45,
  },
  btnCollText: {
    fontFamily: 'Lato-Regular',
    color: '#0967EE',
    backgroundColor: 'transparent',
  },
  btnWantText: {
    fontFamily: 'Lato-Regular',
    color: '#D400FF',
    backgroundColor: 'transparent',
  },
  renderAlbums: {
    flex: 1,
    marginTop: -3,
    backgroundColor: '#000',
  },
  detailCollectionBtnFalse: {
    borderWidth: 1,
    borderColor: '#0967EE',
    borderRadius: 99,
    height: 44,
    width: 165,
    justifyContent: 'center',
    alignItems: 'center',
  },
  detailWantlistBtnFalse: {
    borderWidth: 1,
    borderColor: '#D400FF',
    borderRadius: 99,
    height: 44,
    width: 165,
    justifyContent: 'center',
    alignItems: 'center',
  },
  detailStaticTxt: {
    color: 'rgba(217,217,217,.35)',
    width: 90,
    fontFamily: 'Lato-Regular',
    fontSize: 14,
    lineHeight: 18,
  },
  detailDynTxt: {
    color: '#fff',
    fontFamily: 'Lato-Bold',
    fontSize: 14,
    lineHeight: 18,
  },
  detailContain: {
    height: 32,
    alignSelf: 'stretch',
    flexDirection: 'row',
    justifyContent: 'space-around',
    borderBottomWidth: 0.5,
    borderColor: 'rgba(217,217,217,.35)',
    justifyContent: 'flex-start',
    marginBottom: 10,
  },
  starTxt: {
    color: 'rgba(217,217,217,.35)',
    alignSelf: 'flex-start',
    marginBottom: 8,
    lineHeight: 17,
    fontFamily: 'Lato-Regular',
    fontSize: 14,
  },
  starContainer: {
    alignItems: 'flex-start',
    marginLeft: 20,
    marginTop: 25,
    marginBottom: 25,
  },
};
