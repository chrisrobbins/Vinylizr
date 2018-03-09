//
// import React, { Component } from 'react'
// import {
//   Text,
//   View,
//   Image,
//   Linking,
//   TouchableHighlight,
//   AsyncStorage,
//   FlatList
// } from 'react-native'
// import _ from 'lodash'
//
// import { CardSection } from '../components/common/CardSection'
// import { Button } from '../components/common/Button'
// import axios from 'axios'
// import SearchResultItem  from './SearchResultItem'
// import Accordion from 'react-native-collapsible/Accordion';
//
// class ArtistResult extends Component {
// constructor(props) {
//   super(props)
//
//   this.state = {
//     loading: false,
//     artistReleases: [],
//     page: 1,
//     error: null,
//     refreshing: false,
//     isSwiping: null,
//     isModalVisible: false,
//   }
// }
//
// componentDidMount() {
//   this.getArtistReleases()
// }
//
// getArtistReleases = () => {
//   const { userData, item } = this.props
//   const { page } = this.state
//   value = AsyncStorage.multiGet(['oauth_token', 'oauth_secret']).then((values) => {
//     const user_token = values[0][1]
//     const user_secret = values[1][1]
//     const artist_id = item.id
//
//
//     axios({method:'GET', url:`https://api.discogs.com/artists/${artist_id}/releases?sort=year&sort_order=asc&page=${page}&per_page=100`,
//     headers:{
//     'Content-Type': 'application/x-www-form-urlencoded',
//     'Authorization':`OAuth oauth_consumer_key="jbUTpFhLTiyyHgLRoBgq",oauth_nonce="${Date.now()}",oauth_token="${user_token}",oauth_signature="LSQDaLpplgcCGlkzujkHyUkxImNlWVoI&${user_secret}",oauth_signature_method="PLAINTEXT",oauth_timestamp="${Date.now()}"`,
//     'User-Agent': 'Mozilla/5.0 (Macintosh Intel Mac OS X 10_12_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/61.0.3163.100 Safari/537.36'
//    }
//   })
//   .then((response) => {
//     console.log(response, " DROP DOWN ACCORDION RESPONSE")
//     this.setState({artistReleases: response.data.releases})
//
// })
//
//
//       .catch( (error) => {
//       if (error.response) {
//         // The request was made and the server responded with a status code
//         // that falls out of the range of 2xx
//         console.log(error.response.data)
//         console.log(error.response.status)
//         console.log(error.response.headers)
//       } else if (error.request) {
//         // The request was made but no response was received
//         // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
//         // http.ClientRequest in node.js
//         console.log(error.request)
//       } else {
//         // Something happened in setting up the request that triggered an Error
//         console.log('Error', error.message)
//       }
//       console.log(error.config)
//     })
//   })
// }
//
//
//  handleRefresh = () => {
//    this.setState(
//      {
//        page: 1,
//        seed: this.state.seed + 1,
//        refreshing: true
//      },
//      () => {
//        this.searchDiscogs
//      }
//    )
//  }
//  handleLoadMore = () => {
//    this.setState(
//      {
//        page: this.state.page + 1
//      },
//      () => {
//        this.searchDiscogs
//      }
//    )
//  }
//  renderFooter = () => {
//    if (!this.state.loading) return null
//    return (
//      <View
//        style={{
//          paddingVertical: 20,
//          borderTopWidth: 1,
//          borderColor: "#CED0CE"
//        }}
//      >
//        <ActivityIndicator animating size="large" />
//      </View>
//    )
//  }
//
//  _renderHeader(item) {
//    let discogsRecord = item.thumb
//    let discogsString = item.title.split('-')
//    const title = discogsString[1]
//    const artist = discogsString[0]
//    return (
//  <View>
//  <CardSection>
//    <View style={styles.imageView}>
//      {!discogsRecord ? <Image
//        style={styles.imageStyle}
//        source={require('../img/n-a.png')}
//      /> : <Image
//        style={styles.imageStyle}
//        source={{ uri: discogsRecord }}
//      />}
//    </View>
//
//  <View style={styles.textView}>
//      <Text ellipsizeMode={'tail'} numberOfLines={1} style={styles.titleTextStyle}>{title}</Text>
//      <Text ellipsizeMode={'tail'} numberOfLines={1} style={styles.artistTextStyle}>{artist}</Text>
//    </View>
//  </CardSection>
// </View>
// )
// }
//
//  _renderContent() {
//    const { artistReleases } = this.state
//      <FlatList
//        data={artistReleases}
//        renderItem={({ item, index }) => (
//          <SearchResultItem
//           item={item}
//           key={item.id + index}
          // onSwipeStart={() => this.setState({isSwiping: true})}
          // onSwipeRelease={() => this.setState({isSwiping: false})}
//         />
//     )}
       // keyExtractor={this._keyExtractor}
       // ListFooterComponent={this.renderFooter}
       // refreshing={this.state.refreshing}
       // onEndReached={this.handleLoadMore}
       // onEndReachedThreshold={10}
       // style={styles.renderAlbums}
       // scrollEnabled={!this.state.isSwiping}
//      />
// }
//  _keyExtractor = (item, index) => item.id + index
//
//
//
// render() {
//   console.log(this.state, " ARTIST RETURN STATE")
//
//   const {
//     onSwipeStart,
//     onSwipeRelease,
//     userData,
//     records,
//     item
//   } = this.props
//
//   let discogsRecord = item.thumb
//   let discogsString = item.title.split('-')
//   const title = discogsString[1]
//   const artist = discogsString[0]
//
//   const {
//     imageView,
//     textView,
//     imageStyle,
//     titleTextStyle,
//     artistTextStyle,
//     container,
//     collectionSavedTextStyle,
//     wantlistSavedTextStyle
//   } = styles
//
//
//
//
//
//   return (
//     <View style={container}>
//
//       <Accordion
//         sections={records}
//         renderHeader={this._renderHeader}
//         renderContent={this._renderContent}
//       />
// </View>
//
//     )
//   }
// }
//
// const styles = {
//   container: {
//     flex: 1,
//     flexDirection: 'column'
//   },
//
//   textView: {
//     justifyContent: 'center',
//     width: 250
//   },
//   titleTextStyle: {
//     fontSize: 20,
//     color: "#DADADA",
//     marginLeft: 5,
//     fontFamily: 'Lato-Regular'
//   },
//   artistTextStyle: {
//     fontSize: 16,
//     color: "rgba(217,217,217,.6)",
//     marginLeft: 10,
//     marginTop: 1,
//     fontFamily: 'Lato-Regular'
//   },
//   leftSwipeItem: {
//     flex: 1,
//     alignItems: 'flex-end',
//     justifyContent: 'center',
//     paddingRight: 20
//   },
//   // collectionSavedTextStyle: {
//   //   color: '#2EF470',
//   //   marginLeft: 12,
//   //   marginTop: 9,
//   //   fontSize: 10
//   // },
//   // wantlistSavedTextStyle: {
//   //   color: '#F4702E',
//   //   marginLeft: 12,
//   //   marginTop: 9,
//   //   fontSize: 10
//   // },
//   imageStyle: {
//     height: 85,
//     width: 85
//   },
//   rightSwipeItem: {
//       flex: 1,
//       alignItems: 'flex-start',
//       justifyContent: 'center',
//       paddingLeft: 20
//     },
//     contentText: {
//     paddingTop: 15,
//     paddingRight: 15,
//     paddingBottom: 15,
//     paddingLeft: 15,
//     color: '#fff',
//   },
//     searchModal: {
//       justifyContent: 'center',
//       height: 90,
//       width: 90
//     }
// }
//
//
// export default ArtistResult
