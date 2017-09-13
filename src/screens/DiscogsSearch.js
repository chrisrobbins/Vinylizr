import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import {
  saveCollectionItem,
  fetchCollection,
} from '../actions/collection-action';
import {
  saveWantlistItem,
  fetchWantlist,
} from '../actions/wantlist-action';

import {
   Button,
   BarCode,
   ClearText
} from '../components/common';
import fire from '../components/fire';
import SearchResultItem from '../components/SearchResultItem';


import _ from 'lodash';

import {
  View,
  Text,
  TextInput,
  Image,
  ActivityIndicator,
  FlatList
} from 'react-native';

class DiscogsSearch extends Component {
  constructor(props) {
    super(props);
    this.searchDiscogs = this.searchDiscogs.bind(this)

    this.state = {
      text: '',
      loading: false,
      albums: [],
      page: 1,
      discogsRecord: '',
      seed: 1,
      error: null,
      refreshing: false
    };
    this.searchDiscogs = _.debounce(this.searchDiscogs, 150)

  }
  static navigationOptions = {

    tabBarIcon: ({ tintColor }) => (tintColor == '#e91e63' ?
    <Image
      source={require('../img/search_select.png')}
    />
    :
    <Image
      source={require('../img/search.png')}
    />
  ),
};


  searchDiscogs = () => {
    const apiKey = "jbUTpFhLTiyyHgLRoBgq";
    const apiSecret = "LSQDaLpplgcCGlkzujkHyUkxImNlWVoI";
    const { page } = this.state;
    const apiSearch = this.state.newText;
    const url = `https://api.discogs.com/database/search?artist=${apiSearch}
    &key=${apiKey}&secret=${apiSecret}`
    this.setState({ loading: true });

    axios.get(url)
      .then(res => {
        this.setState({
          albums:page === 1 ? res.data.results : [...this.state.albums, ...res.data.results],
          error: res.error || null,
          loading: false,
          refreshing: false
        });
      })
      .catch(error => {
        this.setState({ error, loading: false });
      });

  };

   clearTextInput = () => {
     this._textInput.setNativeProps({ text: '' });
     this.setState({ text: '', albums: [] });
   }
   renderInputButton = () => {
     return <ClearText onPress={this.clearTextInput.bind(this)} />;
   }
  //  handleScroll = () => {
  //   const {currentlyOpenSwipeable} = this.state;
  //
  //   if (currentlyOpenSwipeable) {
  //     currentlyOpenSwipeable.recenter();
  //   }
  // };

   handleRefresh = () => {
     this.setState(
       {
         page: 1,
         seed: this.state.seed + 1,
         refreshing: true
       },
       () => {
         this.searchDiscogs;
       }
     );
   };

   handleLoadMore = () => {
     this.setState(
       {
         page: this.state.page + 1
       },
       () => {
         this.searchDiscogs;
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
           borderColor: "#CED0CE"
         }}
       >
         <ActivityIndicator animating size="large" />
       </View>
     );
   };
   _keyExtractor = (item, index) => item.id;


  render() {

    return (
      <View style={styles.container}>

        <View style={styles.inputStyleContainer}>


        <TextInput

          ref={text => this._textInput = text}

          style={styles.inputStyle}

          autoFocus={true}

          type="search"

          value={this.state.newText}

          onChangeText={this.searchDiscogs}

          onChange={(event) => this.setState({ newText: event.nativeEvent.text })}

          placeholder="Artist or Album"

          placeholderTextColor="#D9D9D9"

          selectionColor={'#F42E4A'}

        />

      </View>

      <View style={styles.inputContainer}>

        {this.renderInputButton()}

      </View>
        <FlatList
          data={this.state.albums}
          renderItem={({item}) => (


            <SearchResultItem
             item={item}
             onSwipeStart={() => this.setState({isSwiping: true})}
             onSwipeRelease={() => this.setState({isSwiping: false})}
           />
       )}
          keyExtractor={this._keyExtractor}
          ListFooterComponent={this.renderFooter}
          refreshing={this.state.refreshing}
          onEndReached={this.handleLoadMore}
          onEndReachedThreshold={40}
          style={styles.renderAlbums}
          scrollEnabled={!this.state.isSwiping}
          // backgroundColor={'#1A1A1A'}
          // itemBackgroundColor={'#1A1A1A'}

        />

    </View>
    );
  }
}

const styles = {
  renderAlbums: {
    flex: 1,
    marginTop: -3
  },
  inputContainer: {
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    height: 5,
    marginRight: 10,
    marginBottom: 0,
  },
  container: {
    flex: 1
  },

  inputStyleContainer: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    marginTop: 25,
    height: 40,
    borderBottomWidth: 1,
    borderBottomColor: "#ffffff",
    marginBottom: 0
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
    marginBottom: 0
  },

};

const mapStateToProps = (state) => {
    return {
      ...state
    }
}
// for click events so that dispatches can happen
const mapDispatchToProps = (dispatch) => {
    return {
      saveCollectionItem: (item) => {
          dispatch(saveCollectionItem(item))
      },
      saveWantlistItem: (item) => {
          dispatch(saveWantlistItem(item))
      },
      fetchCollection: () => {
          dispatch(fetchCollection())
      },
      fetchWantlist: () => {
          dispatch(fetchWantlist())
      },
    }
  }



export default connect(mapStateToProps, mapDispatchToProps)(DiscogsSearch);
