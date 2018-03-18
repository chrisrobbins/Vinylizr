import React, { Component } from 'react'
import axios from 'axios'
import {
   Button,
   BarCode,
   ClearText
} from '../components/common'
import MasterReleaseResult from '../components/MasterReleaseResult'
import SearchResultItem from '../components/SearchResultItem'
import SearchSuccessModal from '../components/SearchSuccessModal'
import { NavigationActions } from 'react-navigation'

import _ from 'lodash'

import {
  View,
  Text,
  TextInput,
  Image,
  ActivityIndicator,
  FlatList,
  StatusBar,
  TouchableOpacity,
  AsyncStorage
} from 'react-native'

import collapsible from 'react-native-collapsible/Accordion'

class DiscogsSearch extends Component {
  constructor(props) {
    super(props)
    this.state = {
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
      collectionRecords: []
    }

    this.searchDiscogs = _.debounce(this.searchDiscogs, 218)
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
     value = AsyncStorage.multiGet(['oauth_token', 'oauth_secret']).then((values) => {
       const user_token = values[0][1]
       const user_secret = values[1][1]
         axios({method:'GET', url:`https://api.discogs.com/oauth/identity`,
         headers:{
         'Content-Type': 'application/x-www-form-urlencoded',
         'Authorization':`OAuth oauth_consumer_key="jbUTpFhLTiyyHgLRoBgq",oauth_nonce="${Date.now()}",oauth_token="${user_token}",oauth_signature="LSQDaLpplgcCGlkzujkHyUkxImNlWVoI&${user_secret}",oauth_signature_method="PLAINTEXT",oauth_timestamp="${Date.now()}"`,
         'User-Agent': 'Mozilla/5.0 (Macintosh Intel Mac OS X 10_12_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/61.0.3163.100 Safari/537.36'
        }
       })
         .then((response) => {
           this.setState({userData:response.data})
       })
         .catch( (error) => {
         if (error.response) {
           console.log(error.response.data)
           console.log(error.response.status)
           console.log(error.response.headers)
         } else if (error.request) {
           console.log(error.request)
         } else {
           console.log('Error', error.message)
         }
         console.log(error.config)
       })
     })
   }


  searchDiscogs = () => {
    const apiKey = "jbUTpFhLTiyyHgLRoBgq"
    const apiSecret = "LSQDaLpplgcCGlkzujkHyUkxImNlWVoI"
    const { page } = this.state
    const apiSearch = this.state.newText
    const releaseType = 'master'
    const url = `https://api.discogs.com/database/search?&q=${apiSearch}&page=${page}&per_page=25&key=${apiKey}&secret=${apiSecret}`
    this.setState({ loading: true })
    axios.get(url)
      .then(res => {
        this.setState({
          albums:page === 1 ? res.data.results : [...this.state.albums, ...res.data.results],
          error: res.error || null,
          loading: false,
          refreshing: false
        })
      })
      .catch(error => {
        this.setState({ error, loading: false })
      })
  }
   clearTextInput = () => {
     this._textInput.setNativeProps({ text: '' })
     this.setState({ text: '', albums: [] })
   }

   handleRefresh = () => {
     this.setState(
       {
         page: 1,
         seed: this.state.seed + 1,
         refreshing: true
       },
       () => {
         this.searchDiscogs
       }
     )
   }
   handleLoadMore = () => {
     this.setState(
       {
         page: this.state.page + 1
       },
       () => {
         this.searchDiscogs
       }
     )
   }
   renderFooter = () => {
     if (!this.state.loading) return null
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
     )
   }


   renderInputButton = () => {
     return <ClearText onPress={this.clearTextInput.bind(this)} />
   }

   renderScrollContent = (item) => {
     const { albums, userData } = this.state
       if (item.type === 'master') {
         return (
           <TouchableOpacity onPress={() => {
           this.props.navigation.navigate('ReleaseList', {
           item: item,
           userData: userData
          })
        }}>
           <MasterReleaseResult
             item={item}
             key={item.id}
             records={albums}
             userData={userData}
            />
          </TouchableOpacity>

         )
       }
       if (item.type === 'release') {
         return (
           <SearchResultItem
             records={albums}
             userData={userData}
             item={item}
             key={item.id}
             onSwipeStart={() => this.setState({isSwiping: true})}
             onSwipeRelease={() => this.setState({isSwiping: false})}
            />
         )
       } else {
         return;
       }
   }




   _keyExtractor = (item, index) => item.id + index

  render() {
    const { userData, albums } = this.state
  let records = _.uniqBy(albums, 'thumb')
    return (
      <View style={styles.container}>
        <StatusBar barStyle="light-content" />
        <View style={styles.inputStyleContainer}>
        <TextInput
          ref={text => this._textInput = text}
          style={styles.inputStyle}
          autoFocus={false}
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
          data={records}
          renderItem={({ item }) => this.renderScrollContent(item)}
          keyExtractor={this._keyExtractor}
          ListFooterComponent={this.renderFooter}
          refreshing={this.state.refreshing}
          onEndReached={this.handleLoadMore}
          onEndReachedThreshold={15}
          style={styles.renderAlbums}
          scrollEnabled={!this.state.isSwiping}
          style={styles.renderAlbums}
        />
    </View>
    )
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
    flex: 1,
    backgroundColor: '#000'
  },
  inputStyleContainer: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    height: 40,
    borderBottomWidth: 1,
    borderBottomColor: "#ffffff",
    marginBottom: 0,
    marginTop:40,
    backgroundColor: '#000'
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
}

export default DiscogsSearch
