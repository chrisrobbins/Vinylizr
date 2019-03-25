import React, { Component } from 'react';
import { shape, func } from 'prop-types';
import {
  View,
  Image,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import { Header } from '#common/';
import axios from 'axios';
import { IDENTITY_CONFIG, USER_COLLECTION_URL } from '#src/routes';
// ApiClient.init(DISCOGS_CONSUMER_KEY, DISCOGS_CONSUMER_SECRET);

class UserCollections extends Component {
  static navigationOptions = {
    header: null,
  };
  state = { records: [], refreshing: false, userData: {}, page: 1 };

  componentDidMount() {
    console.log('this.pprops for coollelctint', this.props.screenProps);

    this.getUserCollection();
  }

  getUserCollection = () => {
    const {
      oauthToken,
      oauthSecret,
      user: { username },
    } = this.props.screenProps.user;
    const { page } = this.state;
    const config = IDENTITY_CONFIG(oauthToken, oauthSecret);
    const url = USER_COLLECTION_URL(username, page);
    axios
      .get(url, config)
      .then(response => {
        console.log('RESPONSE FOR COLLECTION', response);

        this.setState({ records: response.data.releases, refreshing: false });
      })

      .catch(error => {
        if (error.response) {
          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);
        } else if (error.request) {
          console.log(error.request);
        } else {
          console.log('Error', error.message);
        }
        console.log(error.config);
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
    const { records, userData } = this.state;
    return (
      <View style={styles.mainContainer}>
        <View style={styles.headerContainer}>
          <Header headerText={'Collection'} />
        </View>
        <View style={styles.contentContainer}>
          <FlatList
            data={records}
            renderItem={({ item, index }) => (
              <TouchableOpacity
                key={item.intance_id}
                onPress={() => {
                  this.props.navigation.navigate('AlbumDetail', {
                    item: item,
                    inCollection: true,
                    userData: userData,
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
            refreshing={this.state.refreshing}
            onRefresh={this.handleRefresh}
            onEndReached={this.handleLoadMore}
            onEndReachedThreshold={40}
            style={styles.textContainer}
            contentContainerStyle={styles.contentContainerStyle}
            numColumns={3}
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
