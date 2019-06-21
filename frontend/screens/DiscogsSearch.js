import React, { Component } from 'react';
import vinylAxios from 'axios';
import { debounce } from 'lodash';
import { connect } from 'react-redux';
import { saveToCollection } from '#modules/Collection/actions';
import { saveToWantlist } from '#modules/Wantlist/actions';
import { ClearText } from '#common/';
import { UserData } from '#src/contexts';
import SearchSuccessModal from '#views/Modals/SearchSuccessModal';
import { VINYLIZR_API_BASE_URL } from '#src/routes';
import SearchSwiper from './SearchSwiper';

import {
  View,
  TextInput,
  ActivityIndicator,
  FlatList,
  StatusBar,
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
    isSwiping: null,
    collectionRecords: [],
    rightSwiped: false,
    leftSwiped: false,
  };

  searchDiscogs = async () => {
    const { page } = this.state;
    const apiSearch = this.state.newText;
    const { token, tokenSecret } = await UserData();
    const url = `${VINYLIZR_API_BASE_URL}/database/search?&q=${apiSearch}&page=${page}&per_page=30&format=vinyl`;
    const accessData = {
      token,
      tokenSecret,
    };
    this.setState({ loading: true });
    await vinylAxios.post(url, accessData).then(response => {
      const { results } = response.data;
      this.setState({
        albums:
          page === 1 ? Array.from(results) : [...this.state.albums, ...results],
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
        this.searchDiscogs();
      }
    );
  };
  handleLoadMore = () => {
    this.setState(
      {
        page: this.state.page + 1,
      },
      () => {
        this.searchDiscogs();
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

  _keyExtractor = (item, index) => 'S' + index.toString();

  _disableScroll = () => {
    //debugger;
    this.swipeableList.getScrollResponder().setNativeProps({
      scrollEnabled: false,
    });
  };

  _enableScroll = () => {
    this.swipeableList.getScrollResponder().setNativeProps({
      scrollEnabled: true,
    });
  };

  renderSearchResults = ({ item, index }) => {
    return (
      <SearchSwiper
        item={item}
        addToCollection={this.addToCollection}
        addToWantlist={this.addToWantlist}
        onSwipeStart={this._disableScroll}
        onSwipeRelease={this._enableScroll}
        {...this.props}
      />
    );
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
      this._showLeftModal();
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
      this._showRightModal();
    } catch (error) {
      console.log('ERROR', error);
    }
  };

  _showLeftModal = () => {
    this.setState({ leftSwiped: true });
    setTimeout(() => this.setState({ isModalVisible: true }), 200);
    setTimeout(() => this._hideModal(), 2000);
  };
  _showRightModal = () => {
    this.setState({ rightSwiped: true });
    setTimeout(() => this.setState({ isModalVisible: true }), 300);
    setTimeout(() => this._hideModal(), 2000);
  };

  _hideModal = () => {
    this.setState({
      isModalVisible: false,
      leftSwiped: false,
      rightSwiped: false,
    });
  };

  render() {
    const { albums } = this.state;

    return (
      <SearchSuccessModal
        isModalVisible={this.state.isModalVisible}
        leftSwiped={this.state.leftSwiped}
        rightSwiped={this.state.rightSwiped}
      >
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
            data={albums}
            ref={ref => (this.swipeableList = ref)}
            renderItem={this.renderSearchResults}
            keyExtractor={this._keyExtractor}
            ListFooterComponent={this.renderFooter}
            refreshing={this.state.refreshing}
            onEndReached={this.handleLoadMore}
            style={styles.renderAlbums}
            scrollEnabled={!this.state.isSwiping}
            style={styles.renderAlbums}
          />
        </View>
      </SearchSuccessModal>
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

export default connect()(DiscogsSearch);
