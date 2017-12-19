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
import SearchSuccessModal from '../components/SearchSuccessModal';


import _ from 'lodash';

import {
  View,
  Text,
  TextInput,
  Image,
  ActivityIndicator,
  FlatList,
  StatusBar,
  AsyncStorage
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
      refreshing: false,
      isModalVisible: false,
      userData: {},
      artist_id: ''
    };
    this.searchDiscogs = _.debounce(this.searchDiscogs, 210)

  }

   static navigationOptions = ({screenProps}) => ({
     header: null,
     cardStyle: {
       backgroundColor: '#000000'
     },
     tabBarIcon: ({ tintColor }) => ( tintColor == '#e91e63'
     ?
     <Image source={require('../img/search_select.png')} />
     :
     <Image source={require('../img/search.png')} />
   ),
   })

   componentWillMount() {
     const { artist_id } = this.state

     value = AsyncStorage.multiGet(['oauth_token', 'oauth_secret']).then((values) => {
       const user_token = values[0][1]
       const user_secret = values[1][1]

         axios({method:'GET', url:`https://api.discogs.com/oauth/identity`,
         headers:{
         'Content-Type': 'application/x-www-form-urlencoded',
         'Authorization':`OAuth oauth_consumer_key="jbUTpFhLTiyyHgLRoBgq",oauth_nonce="${Date.now()}",oauth_token="${user_token}",oauth_signature="LSQDaLpplgcCGlkzujkHyUkxImNlWVoI&${user_secret}",oauth_signature_method="PLAINTEXT",oauth_timestamp="${Date.now()}"`,
         'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/61.0.3163.100 Safari/537.36'
        }
       })
         .then((response) => {
           this.setState({userData:response.data})

       })
         .catch( (error) => {
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
       })
     })

   }

   getArtistReleases = (artist_id) => {
     console.log(artist_id, "this is the ARTIST ID");
     AsyncStorage.multiGet(['oauth_token', 'oauth_secret']).then((values) => {
       const user_token = values[0][1]
       const user_secret = values[1][1]
     axios({method:'GET', url:`https://api.discogs.com/artists/${artist_id}/releases`,
     headers:{
     'Content-Type': 'application/x-www-form-urlencoded',
     'Authorization':`OAuth oauth_consumer_key="jbUTpFhLTiyyHgLRoBgq",oauth_nonce="${Date.now()}",oauth_token="${user_token}",oauth_signature="LSQDaLpplgcCGlkzujkHyUkxImNlWVoI&${user_secret}",oauth_signature_method="PLAINTEXT",oauth_timestamp="${Date.now()}"`,
     'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/61.0.3163.100 Safari/537.36'
     }
     })
     .then((res) => {
     let artist_releases = res.data.releases
     this.state.albums.unshift(artist_releases)
     console.log("YIPPEEE");
     })
     .catch((err) => {
       console.log(err, "ERROR");
     })
   })
   }





  searchDiscogs = () => {
    const apiKey = "jbUTpFhLTiyyHgLRoBgq";
    const apiSecret = "LSQDaLpplgcCGlkzujkHyUkxImNlWVoI";
    const { page, artist_id } = this.state;
    const apiSearch = this.state.newText;
    const releaseType = 'master'
    const url = `https://api.discogs.com/database/search?q=${apiSearch}&artist=${apiSearch}&type=Release&format=Vinyl&key=${apiKey}&secret=${apiSecret}`
    this.setState({ loading: true });

    axios.get(url)
      .then(res => {
        this.setState({
          albums:page === 1 ? res.data.results : [...this.state.albums, ...res.data.results],
          error: res.error || null,
          loading: false,
          refreshing: false,
          artist_id: res.data.results[0].type === 'artist' ? res.data.results[0].id : null
        })
      })



        .catch( (error) => {
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
      })

      .catch(error => {
        this.setState({ error, loading: false });
      });
}



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


   renderResults(item, index) {
     console.log(item, "SEARCH RESULTS ITEM");
     const { userData, artistId } = this.state
    if(item.type === "release") {
      return (
    <SearchResultItem
     item={item}
     key={item.id + index}
     userData={userData}
     onSwipeStart={() => this.setState({isSwiping: true})}
     onSwipeRelease={() => this.setState({isSwiping: false})}
   />
 )
}
   }

   _keyExtractor = (item, index) => item.id + index;


  render() {
    const { userData, albums } = this.state
    return (

      <View style={styles.container}>
        <StatusBar barStyle="light-content" />

        <View style={styles.inputStyleContainer}>


        <TextInput

          ref={text => this._textInput = text}

          style={styles.inputStyle}

          autoFocus={true}

          type="search"

          value={this.state.newText}

          onKeyPress={this.searchDiscogs}

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
          data={albums}
          renderItem={({ item, index }) => (
            this.renderResults(item, index)

       )}
          keyExtractor={this._keyExtractor}
          ListFooterComponent={this.renderFooter}
          refreshing={this.state.refreshing}
          onEndReached={this.handleLoadMore}
          onEndReachedThreshold={40}
          style={styles.renderAlbums}
          scrollEnabled={!this.state.isSwiping}
          backgroundColor={'#1A1A1A'}
          itemBackgroundColor={'#1A1A1A'}

        />

    </View>
    );
  }
}

const styles = {
  renderAlbums: {
    flex: 1,
    marginTop: -3,
    backgroundColor: '#000'
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
