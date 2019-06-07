import React, { Component } from 'react';
import { View, Image, FlatList, TouchableOpacity } from 'react-native';
import { Header } from '#common/';
import axios from 'axios';
import { IDENTITY_CONFIG, USER_WANTLIST_URL } from '#src/routes';

class Wantlist extends Component {
  static navigationOptions = {
    header: null,
  };
  state = { records: [], refreshing: false };

  getUserWantlist = () => {
    const {
      user: { username },
      accessToken,
      oauthSecret,
    } = this.props.screenProps.user;
    const url = USER_WANTLIST_URL(username);
    const config = IDENTITY_CONFIG(accessToken, oauthSecret);
    axios
      .get(url, config)
      .then(response => {
        this.setState({ records: response.data.wants, refreshing: false });
      })

      .catch(error => {
        if (error.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);
        } else if (error.request) {
          // The request was made but no response was received
          // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
          // http.ClientRequest in node.js
          console.log(error.request);
        } else {
          // Something happened in setting up the request that triggered an Error
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
        this.getUserWantlist();
      }
    );
  };
  handleLoadMore = () => {
    this.setState(
      {
        page: this.state.page + 1,
      },
      () => {
        this.getUserWantlist();
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
          <Header headerText={'Wantlist'} />
        </View>
        <View style={styles.contentContainer}>
          <FlatList
            data={records}
            renderItem={({ item, index }) => (
              <TouchableOpacity
                key={item.instance_id}
                onPress={() => {
                  this.props.navigation.navigate('AlbumDetail', {
                    item: item,
                    inWantlist: true,
                  });
                }}
              >
                <Image
                  style={styles.albumCovers}
                  source={{ uri: item.basic_information.thumb }}
                />
              </TouchableOpacity>
            )}
            keyExtractor={this._keyExtractor}
            ListFooterComponent={this.renderFooter}
            refreshing={this.state.refreshing}
            onRefresh={this.handleRefresh}
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

export default Wantlist;
