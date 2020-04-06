import React, { Component, createRef } from 'react';
import vinylAxios from 'axios';
import { connect } from 'react-redux';
import { saveToCollection } from '#modules/Collection/actions';
import { saveToWantlist } from '#modules/Wantlist/actions';
import { ClearText, Spinner } from '#common/';
import { UserData } from '#src/contexts';
import SearchSuccessModal from '#views/Modals/SearchSuccessModal';
import { VINYLIZR_API_BASE_URL } from '#src/routes';
import SearchSwiper from '../SearchSwiper';
import { search } from '../utils';
import { styles } from './styles';
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
    this.page = 1;
    this.state = {
      newText: '',
      loading: false,
      loadingMore: false,
      albums: [],
      error: null,
      refreshing: false,
      isModalVisible: false,
      isSwiping: null,
      rightSwiped: false,
      leftSwiped: false,
    };
    this.text_input = createRef();
  }

  componentWillUnmount() {
    this.clearTextInput();
  }

  searchDiscogs = async (newText, page) => {
    this.setState({ loading: true });
    const { token, tokenSecret } = this.props.screenProps.accessData;
    const url = `${VINYLIZR_API_BASE_URL}/database/search?q=${newText}&artist=${newText}&format=vinyl&page=${page}&per_page=15`;
    const accessData = {
      token,
      tokenSecret,
    };
    const { data } = await search(url, accessData);

    this.setState({
      albums:
        page === 1 ? data.results : [...this.state.albums, ...data.results],
      error: data.results.error || null,
      loading: false,
      loadingMore: false,
      refreshing: false,
    });
  };

  onChangeHandler = async (e) => {
    this.searchDiscogs(e.nativeEvent.text, this.page);
    this.setState({ newText: e.nativeEvent.text });
  };

  handleLoadMore = () => {
    const { newText, loading } = this.state;
    if (!loading) {
      this.page = this.page + 1; // increase page by 1
      this.searchDiscogs(newText, this.page); // method for API call
    }
  };

  clearTextInput = () => {
    this.text_input.current.clear();
    this.setState({
      newText: '',
      albums: [],
      loading: false,
      loadingMore: false,
    });
  };

  handleRefresh = () => {
    const { newText } = this.state;
    this.setState(
      {
        page: 1,
        refreshing: true,
      },
      () => {
        this.searchDiscogs(newText, this.page);
      }
    );
  };

  renderFooter = () => {
    return this.state.loadingMore ? (
      <View style={{ marginTop: 30, marginBottom: 30, alignItems: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    ) : null;
  };

  renderInputButton = () => {
    return <ClearText onPress={() => this.clearTextInput()} />;
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

  addToCollection = async (item) => {
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
      console.error(error);
    }
  };

  addToWantlist = async (item) => {
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
      console.error(error);
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
    const { albums, page } = this.state;

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
              onChange={(e) => this.onChangeHandler(e)}
              placeholder="Artist or Album"
              placeholderTextColor="#D9D9D9"
              selectionColor={'#F42E4A'}
            />
          </View>
          <View style={styles.inputContainer}>{this.renderInputButton()}</View>
          <FlatList
            data={albums}
            ref={(ref) => (this.swipeableList = ref)}
            renderItem={this.renderSearchResults}
            keyExtractor={this._keyExtractor}
            ListFooterComponent={this.renderFooter}
            refreshing={this.state.refreshing}
            onEndReached={this.handleLoadMore}
            onEndReachedThreshold={0.01}
            style={styles.renderAlbums}
            scrollEnabled={!this.state.isSwiping}
          />
        </View>
      </SearchSuccessModal>
    );
  }
}
export default connect()(DiscogsSearch);
