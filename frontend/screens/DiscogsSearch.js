import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { ClearText } from '#common/';
import {
  MasterReleaseResult,
  SearchResultItem,
} from '#views/SearchResults/MasterReleaseResult';
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
    seed: 1,
    error: null,
    refreshing: false,
    isModalVisible: false,
    userData: {},
    isSwiping: null,
    collectionRecords: [],
  };

  componentDidMount() {
    console.log(this.props);
  }

  searchDiscogs = () => {
    const apiKey = 'jbUTpFhLTiyyHgLRoBgq';
    const apiSecret = 'LSQDaLpplgcCGlkzujkHyUkxImNlWVoI';
    const { page } = this.state;
    const apiSearch = this.state.newText;
    const releaseType = 'master';
    const url = `https://api.discogs.com/database/search?&q=${apiSearch}&page=${page}&per_page=80&key=${apiKey}&secret=${apiSecret}`;
    this.setState({ loading: true });
    axios
      .get(url)
      .then(res => {
        this.setState({
          albums:
            page === 1
              ? res.data.results
              : [...this.state.albums, ...res.data.results],
          error: res.error || null,
          loading: false,
          refreshing: false,
        });
      })
      .catch(error => {
        this.setState({ error, loading: false });
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
        debounce(this.searchDiscogs());
      }
    );
  };
  handleLoadMore = () => {
    this.setState(
      {
        page: this.state.page + 1,
      },
      () => {
        debounce(this.searchDiscogs());
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

  renderScrollContent = item => {
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

  _keyExtractor = (item, index) => item.id + index;

  render() {
    const { userData, albums } = this.state;
    let records = uniqBy(albums, 'thumb');
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
            onKeyPress={this.searchDiscogs}
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
          renderItem={({ item }) => this.renderScrollContent(item)}
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
