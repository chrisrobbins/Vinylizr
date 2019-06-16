import React, { Component } from 'react';
import vinylAxios from 'axios';
import { ClearText } from '#common/';
import { VINYLIZR_API_BASE_URL } from '#src/routes';
import MasterReleaseResult from '#views/SearchResults/MasterReleaseResult';
import SearchResultItem from '#views/SearchResults/SearchResultItem';
import { debounce, uniqBy } from 'lodash';

import {
  View,
  TextInput,
  ActivityIndicator,
  FlatList,
  StatusBar,
  TouchableOpacity,
  AsyncStorage,
} from 'react-native';

class DiscogsSearch extends Component {
  static navigationOptions = {
    header: null,
  };
  state = {
    text: '',
    loading: false,
    albums: [],
    page: 1,
    error: null,
    refreshing: false,
    isModalVisible: false,
    userData: {},
    isSwiping: null,
    collectionRecords: [],
  };

  searchDiscogs = async () => {
    const { page } = this.state;
    const apiSearch = this.state.newText;
    const token = await AsyncStorage.getItem('access_token');
    const tokenSecret = await AsyncStorage.getItem('access_secret');
    const url = `${VINYLIZR_API_BASE_URL}/database/search?&q=${apiSearch}&page=${page}&per_page=10`;
    const accessData = {
      token,
      tokenSecret,
    };
    this.setState({ loading: true });
    vinylAxios.post(url, accessData).then(response => {
      const { results } = response.data;
      console.log('RESULTS FROM PROMIS', results);

      this.setState({
        albums: page === 1 ? results : [...this.state.albums, ...results],
        error: results.error || null,
        loading: false,
        refreshing: false,
      });
    });
  };

  clearTextInput = () => {
    this._textInput.setNativeProps({ text: '' });
    this.setState({ text: '', albums: [] });
  };

  handleRefresh = () => {
    this.setState(
      {
        page: 1,
        seed: this.state.seed + 1,
        refreshing: true,
      },
      () => {
        debounce(this.searchDiscogs, 300);
      }
    );
  };
  handleLoadMore = () => {
    this.setState(
      {
        page: this.state.page + 1,
      },
      () => {
        debounce(this.searchDiscogs, 300);
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

  renderInputButton = () => {
    return <ClearText onPress={this.clearTextInput} />;
  };

  renderScrollContent = ({ item }) => {
    const { albums, userData } = this.state;
    if (item.type === 'master') {
      return (
        <TouchableOpacity
          onPress={() => {
            this.props.navigation.navigate('ReleaseList', {
              item: item,
              userData: userData,
            });
          }}
        >
          <MasterReleaseResult
            item={item}
            key={item.id}
            records={albums}
            userData={userData}
          />
        </TouchableOpacity>
      );
    }
    if (item.type === 'release') {
      return (
        <SearchResultItem
          records={albums}
          userData={userData}
          item={item}
          key={item.id}
          onSwipeStart={() => this.setState({ isSwiping: true })}
          onSwipeRelease={() => this.setState({ isSwiping: false })}
        />
      );
    } else {
      return;
    }
  };

  _keyExtractor = (item, index) => 'S' + index.toString();

  render() {
    const { userData, albums } = this.state;
    let records = uniqBy(albums, 'thumb');
    console.log({ albums });
    return (
      <View style={styles.container}>
        <StatusBar barStyle="light-content" />
        <View style={styles.inputStyleContainer}>
          <TextInput
            ref={text => (this._textInput = text)}
            style={styles.inputStyle}
            autoFocus={false}
            type="search"
            value={this.state.newText}
            onKeyPress={debounce(this.searchDiscogs, 250)}
            onChange={event =>
              this.setState({ newText: event.nativeEvent.text })
            }
            placeholder="Artist or Album"
            placeholderTextColor="#D9D9D9"
            selectionColor={'#F42E4A'}
          />
        </View>
        <View style={styles.inputContainer}>{this.renderInputButton()}</View>
        <FlatList
          data={records}
          renderItem={this.renderScrollContent}
          keyExtractor={this._keyExtractor}
          ListFooterComponent={this.renderFooter}
          refreshing={this.state.refreshing}
          onEndReached={this.handleLoadMore}
          onEndReachedThreshold={0.2}
          style={styles.renderAlbums}
          scrollEnabled={!this.state.isSwiping}
          style={styles.renderAlbums}
        />
      </View>
    );
  }
}
const styles = {
  renderAlbums: {
    flex: 1,
    marginTop: -3,
    backgroundColor: '#000',
  },
  inputContainer: {
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    height: 5,
    marginRight: 10,
    marginBottom: 0,
  },
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  inputStyleContainer: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    height: 40,
    borderBottomWidth: 1,
    borderBottomColor: '#ffffff',
    marginBottom: 0,
    marginTop: 40,
    backgroundColor: '#000',
  },
  inputStyle: {
    color: '#fff',
    fontSize: 18,
    lineHeight: 23,
    backgroundColor: '#000',
    justifyContent: 'flex-start',
    flex: 1,
    paddingLeft: 7,
    paddingRight: 7,
    paddingBottom: 0,
    marginBottom: 0,
  },
};

export default DiscogsSearch;
