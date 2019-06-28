import React, { Component, createRef } from 'react';
import vinylAxios from 'axios';
import { debounce } from 'lodash';
import { connect } from 'react-redux';
import { saveToCollection } from '#modules/Collection/actions';
import { saveToWantlist } from '#modules/Wantlist/actions';
import { ClearText, Spinner } from '#common/';
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
  constructor() {
    super();
    this.state = {
      text: '',
      newText: '',
      loading: false,
      albums: [],
      page: 1,
      error: null,
      refreshing: false,
      isModalVisible: false,
      isSwiping: null,
      rightSwiped: false,
      leftSwiped: false,
    };
    this.text_input = createRef();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.newText.length && !this.state.newText.length) {
      this.clearTextInput();
    }
  }

  componentWillUnmount() {
    this.clearTextInput();
  }

  searchDiscogs = async () => {
    const { page } = this.state;
    const apiSearch = this.state.newText;
    const { token, tokenSecret } = await UserData();
    const url = `${VINYLIZR_API_BASE_URL}/database/search?&q=${apiSearch}&page=${page}&per_page=10&format=vinyl`;
    const accessData = {
      token,
      tokenSecret,
    };

    this.setState({ loading: true });
    await vinylAxios.post(url, accessData).then(response => {
      const { results } = response.data;
      this.setState({
        albums:
          page === 1 ? Array.from(results) : [this.state.albums, ...results],
        error: results.error || null,
        loading: false,
        refreshing: false,
      });
    });
  };

  debounceDiscogsSearch = () => {
    const { newText } = this.state;
    this.setState({ albums: [] });
    if (!newText.length) return;
    if (newText.length >= 1) {
      this.searchDiscogs();
    }
  };

  clearTextInput = () => {
    this.text_input.current.clear();
    this.setState({ text: '', albums: [], loading: false });
  };

  handleRefresh = () => {
    this.setState(
      {
        page: 1,
        refreshing: true,
      },
      () => {
        this.searchDiscogs();
      }
    );
  };
  handleLoadMore = () => {
    console.log('LOADING MORE BUT NOT TO OFTEN');
    if (!this.state.albums.length) return;
    if (
      this.state.newText.length &&
      this.state.albums.length &&
      this.state.page !== 1
    ) {
      this.setState({ loading: true });
      setTimeout(() => {
        this.setState(
          {
            page: this.state.page + 1,
          },
          () => {
            this.searchDiscogs();
          }
        );
      }, 1500);
    }
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
              ref={this.text_input}
              style={styles.inputStyle}
              autoFocus={true}
              type="search"
              value={this.state.newText}
              onKeyPress={this.debounceDiscogsSearch}
              onChange={event =>
                this.setState({ newText: event.nativeEvent.text })
              }
              onSubmitEditing={this.searchDiscogs}
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
    height: 40,
    borderBottomWidth: 1,
    borderBottomColor: '#ffffff',
    marginTop: 40,
    backgroundColor: '#000',
  },
  inputStyle: {
    flex: 1,
    color: '#fff',
    fontSize: 20,
    lineHeight: 23,
    backgroundColor: '#000',
    marginBottom: 0,
    paddingLeft: 10,
  },
};

export default connect()(DiscogsSearch);
