import React, { Component } from 'react';
import { shape, func } from 'prop-types';
import {
  View,
  Image,
  SectionList,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  Text,
  AsyncStorage,
} from 'react-native';
import { Header } from '#common/';
import vinylAxios from 'axios';
import { IDENTITY_CONFIG, USER_COLLECTION_URL } from '#src/routes';
// ApiClient.init(DISCOGS_CONSUMER_KEY, DISCOGS_CONSUMER_SECRET);

class UserCollections extends Component {
  static navigationOptions = {
    header: null,
  };
  state = { records: [], refreshing: false, userData: {}, page: 1 };

  async componentDidMount() {
    await this.getUserCollection();
    const {
      user: { userMeta },
      getDiscogsIdentity,
    } = this.props.screenProps;
    const accessToken = await AsyncStorage.getItem('access_token');
    const accessSecret = await AsyncStorage.getItem('access_secret');
    const accessData = {
      token: accessToken,
      tokenSecret: accessSecret,
    };
    if (!userMeta.username) {
      getDiscogsIdentity(accessData);
    }
  }

  getUserCollection = async () => {
    const {
      user: {
        userMeta: { username },
      },
    } = this.props.screenProps;
    const accessToken = await AsyncStorage.getItem('access_token');
    const accessSecret = await AsyncStorage.getItem('access_secret');
    const { page } = this.state;
    const config = IDENTITY_CONFIG(accessToken, accessSecret);
    const url = USER_COLLECTION_URL(username, page);
    vinylAxios
      .get(url, config)
      .then(response => {
        this.setState({ records: response.data.releases, refreshing: false });
      })

      .catch(error => {
        console.log('error fetching collection');
      });
  };

  handleRefresh = () => {
    this.setState(
      {
        page: 1,
        seed: this.state.seed + 1,
        refreshing: true,
      },
      () => {
        this.getUserCollection();
      }
    );
  };
  handleLoadMore = () => {
    this.setState(
      {
        page: this.state.page + 1,
      },
      () => {
        this.getUserCollection();
      }
    );
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

  _keyExtractor = (item, index) => item.id + index;

  render() {
    const { records } = this.state;
    const {
      user: { userMeta },
    } = this.props.screenProps;

    const vinylData = records.reduce((arrangedData, data) => {
      // c[0] should be the first letter of an entry
      let record = data.basic_information.artists[0].name[0].toLocaleUpperCase();

      // either push to an existing dict entry or create one
      if (arrangedData[record]) arrangedData[record].push(data);
      else arrangedData[record] = [data];

      return arrangedData;
    }, {});

    const collectionSections = Object.entries(vinylData).map(vinyl => {
      return {
        title: vinyl[0],
        data: vinyl[1],
      };
    });
    console.log('COLLECTION SECTIONS', collectionSections);
    return (
      <View style={styles.mainContainer}>
        <View style={styles.headerContainer}>
          <Header headerText={'Collection'} />
        </View>
        <View style={styles.contentContainer}>
          <SectionList
            renderItem={({ section }) => (
              <FlatList
                data={section.data}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    key={item.intance_id}
                    onPress={() => {
                      this.props.navigation.navigate('AlbumDetail', {
                        item: item,
                        inCollection: true,
                        inWantlist: false,
                        userData: userMeta,
                      });
                    }}
                  >
                    <Image
                      style={styles.albumCovers}
                      source={{ uri: item.basic_information.cover_image }}
                    />
                  </TouchableOpacity>
                )}
                keyExtractor={this._keyExtractor}
                ListFooterComponent={this.renderFooter}
                contentContainerStyle={styles.contentContainerStyle}
                numColumns={3}
              />
            )}
            renderSectionHeader={({ section: { title } }) => (
              <Text style={{ fontWeight: 'bold', color: '#fff' }}>{title}</Text>
            )}
            sections={collectionSections}
            keyExtractor={this._keyExtractor}
            refreshing={this.state.refreshing}
            onRefresh={this.handleRefresh}
            onEndReached={this.handleLoadMore}
            onEndReachedThreshold={40}
          />
        </View>
      </View>
    );
  }
}

const styles = {
  textContainer: {
    paddingBottom: 50,
  },
  contentContainer: {
    flex: 1,
    backgroundColor: '#000',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  contentContainerStyle: {
    flexDirection: 'column',
  },
  mainContainer: {
    flex: 1,
  },
  albumCovers: {
    height: 124,
    width: 124,
    marginLeft: 0.5,
    marginRight: 0.5,
    marginTop: 0.5,
    marginBottom: 0.5,
  },
};

export default UserCollections;
