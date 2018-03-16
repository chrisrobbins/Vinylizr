import React, { Component } from 'react'
import { Text, View, Image, FlatList, Dimensions, AsyncStorage } from 'react-native'
const windowSize = Dimensions.get('window')
import ReleaseResultItem from '../components/ReleaseResultItem'
import axios from 'axios'
import VersionsBadge from '../components/VersionsBadge'
import CollectionBadge from '../components/CollectionBadge'


export default class ReleaseList extends Component {
constructor(props) {
  super(props)

  this.state = {
    loading: false,
    records: [],
    page: 1,
    seed: 1,
    error: null,
    refreshing: false,
    isSwiping: null,
    collectionRecords: [],
    releasesOwned: []
  }
}



  static navigationOptions = {
    drawerLabel: 'ReleaseList',
    header: null
  }

  componentWillMount() {
    this.getMasterReleases()
    this.getUserCollection()
  }

  componentDidMount() {
    setTimeout(this.getReleasesOwned, 1000)
    this.getReleasesOwned()

  }

  getUserCollection() {
    const { userData } = this.props.navigation.state.params
    const { page } = this.state
    AsyncStorage.multiGet(['oauth_token', 'oauth_secret']).then((values) => {
      const user_token = values[0][1]
      const user_secret = values[1][1]
      const user_name = userData.username

        axios({method:'GET', url:`https://api.discogs.com/users/${user_name}/collection/folders/0/releases?page=${page}&per_page=25`,
        headers:{
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization':`OAuth oauth_consumer_key="jbUTpFhLTiyyHgLRoBgq",oauth_nonce="${Date.now()}",oauth_token="${user_token}",oauth_signature="LSQDaLpplgcCGlkzujkHyUkxImNlWVoI&${user_secret}",oauth_signature_method="PLAINTEXT",oauth_timestamp="${Date.now()}"`,
        'User-Agent': 'Mozilla/5.0 (Macintosh Intel Mac OS X 10_12_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/61.0.3163.100 Safari/537.36'
       }
      })

      .then((response) => {
        this.setState({collectionRecords: response.data.releases})

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

getReleasesOwned = () => {
  const { records, collectionRecords, releasesOwned } = this.state
  let ownedReleases = []
  collectionRecords.map((collectionRecord) => {
    return (records.map((releaseItem) => {
      if (collectionRecord.basic_information.id === releaseItem.id) {
        console.log("Collection item: ", collectionRecord, "RElease Item: ", releaseItem);
        return (
          ownedReleases.push(collectionRecord)

        )
      }
    })
  )
  })
  this.setState({ releasesOwned: ownedReleases })
}

  getMasterReleases = () => {
    const { userData, item } = this.props.navigation.state.params
    const { page } = this.state
    value = AsyncStorage.multiGet(['oauth_token', 'oauth_secret']).then((values) => {
      const user_token = values[0][1]
      const user_secret = values[1][1]
      const master_id = item.id

      axios({method:'GET', url:`https://api.discogs.com/masters/${master_id}/versions?format=vinyl&sort=year&sort_order=asc&page=${page}&per_page=30`,
      headers:{
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization':`OAuth oauth_consumer_key="jbUTpFhLTiyyHgLRoBgq",oauth_nonce="${Date.now()}",oauth_token="${user_token}",oauth_signature="LSQDaLpplgcCGlkzujkHyUkxImNlWVoI&${user_secret}",oauth_signature_method="PLAINTEXT",oauth_timestamp="${Date.now()}"`,
      'User-Agent': 'Mozilla/5.0 (Macintosh Intel Mac OS X 10_12_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/61.0.3163.100 Safari/537.36'
     }
    })
    .then((response) => {
      this.setState({records: response.data.versions})

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


  _keyExtractor = (item, index) => item.id + index





  render() {
    const { item, userData } = this.props.navigation.state.params
    const { records, collectionRecords, releasesOwned } = this.state
    let discogsString = item.title.split('-')
    const title = discogsString[1]
    const artist = discogsString[0]
    const label = item.label



    return(
      <View style={styles.container}>

        <View style={styles.imagesContainer}>

          <Image
            source={{ uri: item.thumb }}
            style={styles.detailThumb}
          >
          </Image>
          <View style={styles.headerContainer}>
          <Text numberOfLines={1} ellipsifyMode={'tail'} style={styles.detailTitle}>{title}</Text>
          <Text style={styles.detailArtist}>{artist}</Text>
          <View style={styles.badgeContainer}>
          <VersionsBadge>{records.length} VERSIONS</VersionsBadge>
          {!releasesOwned ? <Text></Text> : <CollectionBadge style={styles.badge}>{releasesOwned.length}</CollectionBadge>}
          </View>
          </View>
          </View>
          <FlatList
            data={records}
            renderItem={({ item }) => (
              <ReleaseResultItem
                userData={userData}
                item={item}
                key={item.id}
                artist={artist}
                collectionRecords={collectionRecords}
                onSwipeStart={() => this.setState({isSwiping: true})}
                onSwipeRelease={() => this.setState({isSwiping: false})}

               />
            )}
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
  container: {
    flex: 1,
    backgroundColor: '#000'
  },
  badgeContainer: {
    flexDirection: 'row',
    marginBottom: 10
  },
  imagesContainer: {
    width: windowSize.width,
    height: 145,
    flexDirection: 'row',
    backgroundColor: '#000',
    alignItems: 'flex-end',
    borderBottomWidth: 4,
    borderBottomColor: '#d3d3d3'
  },
  detailThumb: {
    height: 100,
    width: 100,
    marginBottom: 0,
    marginLeft: 0,
    marginRight: 20

  },
  headerContainer: {
    justifyContent: 'center',
  },
  detailTitle: {
    color: '#fff',
    fontSize: 20,
    backgroundColor: 'transparent',
    fontFamily: 'Lato-Regular',
    lineHeight: 28,
  },
  detailArtist: {
    color: '#777777',
    marginBottom: 10,
    backgroundColor: 'transparent',
    fontFamily: 'Lato-Regular',
    lineHeight: 24,
    fontSize: 16


  },
  btnContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignSelf: 'stretch',
    marginBottom: 45

  },
  btnCollText: {
    fontFamily: 'Lato-Regular',
    color: '#0967EE',
    backgroundColor: 'transparent'
  },
  btnWantText: {
    fontFamily: 'Lato-Regular',
    color: '#D400FF',
    backgroundColor: 'transparent'

  },
  renderAlbums: {
    flex: 1,
    marginTop: -3,
    backgroundColor: '#000'
  },
  detailCollectionBtnFalse: {
    borderWidth: 1,
    borderColor: '#0967EE',
    borderRadius: 99,
    height: 44,
    width: 165,
    justifyContent: 'center',
    alignItems: 'center'
  },
  detailWantlistBtnFalse: {
    borderWidth: 1,
    borderColor: '#D400FF',
    borderRadius: 99,
    height: 44,
    width: 165,
    justifyContent: 'center',
    alignItems: 'center'
  },
  detailStaticTxt: {
    color: 'rgba(217,217,217,.35)',
    width: 90,
    fontFamily: 'Lato-Regular',
    fontSize: 14,
    lineHeight: 18

  },
  detailDynTxt: {
    color: '#fff',
    fontFamily: 'Lato-Bold',
    fontSize: 14,
    lineHeight: 18
  },
  detailContain: {
    height: 32,
    alignSelf: 'stretch',
    flexDirection: 'row',
    justifyContent: 'space-around', borderBottomWidth: .5,
    borderColor: 'rgba(217,217,217,.35)', justifyContent: 'flex-start',
    marginBottom: 10

  },
  starTxt: {
    color: 'rgba(217,217,217,.35)',
    alignSelf:'flex-start',
    marginBottom: 8,
    lineHeight: 17,
    fontFamily: 'Lato-Regular',
    fontSize: 14

  },
  starContainer: {
    alignItems: 'flex-start',
    marginLeft: 20,
    marginTop: 25,
    marginBottom: 25
  }
}
