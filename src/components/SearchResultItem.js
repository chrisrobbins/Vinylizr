import React, { Component } from 'react'
import {
  Text,
  View,
  Image,
  Linking,
  TouchableHighlight,
  AsyncStorage
} from 'react-native'

import axios from 'axios'

import { CardSection } from '../components/common/CardSection'
import { Button } from '../components/common/Button'
import Swipeable from 'react-native-swipeable'
import SearchSuccessModal from '../components/SearchSuccessModal'

class SearchResultItem extends Component {
constructor(props) {
	super(props)
	this.state = {
    leftActionActivated: false,
    rightActionActivated: false,
    isModalVisible: false,
    leftSwiped: false,
    rightSwiped: false
    }
}

saveToCollection = () => {
  const { userData } = this.props
  value = AsyncStorage.multiGet(['oauth_token', 'oauth_secret']).then((values) => {
    const user_token = values[0][1]
    const user_secret = values[1][1]
    const user_name = userData.username
    const release_id = this.props.item.id

      axios({method:'POST', url:`https://api.discogs.com/users/${user_name}/collection/folders/1/releases/${release_id}`,
      headers:{
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization':`OAuth oauth_consumer_key="jbUTpFhLTiyyHgLRoBgq",oauth_nonce="${Date.now()}",oauth_token="${user_token}",oauth_signature="LSQDaLpplgcCGlkzujkHyUkxImNlWVoI&${user_secret}",oauth_signature_method="PLAINTEXT",oauth_timestamp="${Date.now()}"`,
      'User-Agent': 'Mozilla/5.0 (Macintosh Intel Mac OS X 10_12_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/61.0.3163.100 Safari/537.36'
     }
    })
    .then((response) => {
      this.setState({items: response.data.releases})

  })
  .then(() => {
    this._showLeftModal()
  })


      .catch( (error) => {
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.log(error.response.data)
        console.log(error.response.status)
        console.log(error.response.headers)
      } else if (error.request) {
        // The request was made but no response was received
        // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
        // http.ClientRequest in node.js
        console.log(error.request)
      } else {
        // Something happened in setting up the request that triggered an Error
        console.log('Error', error.message)
      }
      console.log(error.config)
    })
  })
}
saveToWantlist = () => {
  const { userData, item } = this.props
  value = AsyncStorage.multiGet(['oauth_token', 'oauth_secret']).then((values) => {
    const user_token = values[0][1]
    const user_secret = values[1][1]
    const user_name = userData.username
    const release_id = item.id

      axios({method:'PUT',
      url:`https://api.discogs.com/users/${user_name}/wants/${release_id}`,
      headers:{
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization':`OAuth oauth_consumer_key="jbUTpFhLTiyyHgLRoBgq",oauth_nonce="${Date.now()}",oauth_token="${user_token}",oauth_signature="LSQDaLpplgcCGlkzujkHyUkxImNlWVoI&${user_secret}",oauth_signature_method="PLAINTEXT",oauth_timestamp="${Date.now()}"`,
      'User-Agent': 'Mozilla/5.0 (Macintosh Intel Mac OS X 10_12_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/61.0.3163.100 Safari/537.36'
     }
    })
    .then((response) => {
      this.setState({records: response.data.wants})
      })


  .then(() => {
    this._showRightModal()
  })


      .catch( (error) => {
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.log(error.response.data)
        console.log(error.response.status)
        console.log(error.response.headers)
      } else if (error.request) {
        // The request was made but no response was received
        // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
        // http.ClientRequest in node.js
        console.log(error.request)
      } else {
        // Something happened in setting up the request that triggered an Error
        console.log('Error', error.message)
      }
      console.log(error.config)
    })
  })
}

// saveToCollection = () => {
//   let discogsRecord = this.props.item
//   this.props.saveCollectionItem(discogsRecord)
//   this.setState({ leftSwiped: true })
//   setTimeout(() => this._hideModal(), 2000)
//  }
//
// saveToWantlist = () => {
//   let discogsRecord = this.props.item
//   this.props.saveWantlistItem(discogsRecord)
//   this.setState({ rightSwiped: true })
//   setTimeout(() => this._hideModal(), 2000)
//  }

_showLeftModal = () => {
  this.setState({leftSwiped: true})
  setTimeout(() => this.setState({ isModalVisible: true }), 300 )
  setTimeout(() => this._hideModal(), 2000)
}
_showRightModal = () => {
  this.setState({rightSwiped: true })
  setTimeout(() => this.setState({ isModalVisible: true }), 300 )
  setTimeout(() => this._hideModal(), 2000)
}

  _hideModal = () => {
     this.setState({ isModalVisible: false })
}


render() {
  const { item, onSwipeStart, onSwipeRelease } = this.props
  let discogsRecord = item.thumb
  const title = item.title
  const artist = item.artist

  const {
    imageView,
    textView,
    imageStyle,
    titleTextStyle,
    artistTextStyle,
    collectionSavedTextStyle,
    wantlistSavedTextStyle
  } = styles
  const { leftActionActivated, rightActionActivated, toggle } = this.state
  const wantlistIcon = require('../img/wantlistButton.png')
  const collectionIcon = require('../img/collectionButton.png')
  const check = require('../img/checkmark.png')

  const leftContent = [
    <View key={item.id} style={[styles.leftSwipeItem, {backgroundColor: leftActionActivated ? '#2EF470' : '#000'}]}>
      <Image style={styles.leftIconStyles} source={collectionIcon} />
    </View>
  ]
  const rightContent = [
    <View key={item.id} style={[styles.rightSwipeItem, {backgroundColor: rightActionActivated ? '#F4702E' : '#000'}]}>
        <Image style={styles.rightIconStyles} source={wantlistIcon} />
    </View>
  ]

  return (
    <SearchSuccessModal
       isModalVisible={this.state.isModalVisible}
       leftSwiped={this.state.leftSwiped}
       rightSwiped={this.state.rightSwiped}
    >
    <Swipeable
      key={item.id}
      leftContent={leftContent}
      rightContent={rightContent}
      leftActionActivationDistance={100}
      rightActionActivationDistance={100}
      onLeftActionActivate={() =>
        this.setState({leftActionActivated: true})
    }
      onLeftActionDeactivate={() =>
        this.setState({leftActionActivated: false})
    }
      onRightActionActivate={() =>
        this.setState({rightActionActivated: true})
    }
      onRightActionDeactivate={() =>
        this.setState({rightActionActivated: false})
    }
      onLeftActionRelease={this.saveToCollection}
      onLeftActionComplete={() => this.setState({isModalVisible: true})}
      onRightActionComplete={() => this.setState({isModalVisible: true})}
      onRightActionRelease={this.saveToWantlist}
      onSwipeStart={onSwipeStart}
      onSwipeRelease={onSwipeRelease}

      >
      <CardSection>
        <View style={imageView}>
          {!discogsRecord ? <Image
            style={imageStyle}
            source={require('../img/n-a.png')}
          /> : <Image
            style={imageStyle}
            source={{ uri: discogsRecord }}
          />}
        </View>

      <View style={textView}>
          <Text ellipsizeMode={'tail'} numberOfLines={1} style={titleTextStyle}>{title}</Text>
          <Text ellipsizeMode={'tail'} numberOfLines={1} style={artistTextStyle}>{artist}</Text>
        </View>
      </CardSection>
    </Swipeable>
  </SearchSuccessModal>

    )
  }
}

const styles = {
  container: {
    flexDirection: 'column'
  },

  textView: {
    justifyContent: 'center',
    width: 250
  },
  titleTextStyle: {
    fontSize: 20,
    color: "#DADADA",
    marginLeft: 5,
    fontFamily: 'Lato-Regular'
  },
  artistTextStyle: {
    fontSize: 16,
    color: "rgba(217,217,217,.6)",
    marginLeft: 10,
    marginTop: 1,
    fontFamily: 'Lato-Regular'
  },
  leftSwipeItem: {
    flex: 1,
    alignItems: 'flex-end',
    justifyContent: 'center',
    paddingRight: 20
  },
  // collectionSavedTextStyle: {
  //   color: '#2EF470',
  //   marginLeft: 12,
  //   marginTop: 9,
  //   fontSize: 10
  // },
  // wantlistSavedTextStyle: {
  //   color: '#F4702E',
  //   marginLeft: 12,
  //   marginTop: 9,
  //   fontSize: 10
  // },
  imageStyle: {
    height: 85,
    width: 85
  },
  rightSwipeItem: {
      flex: 1,
      alignItems: 'flex-start',
      justifyContent: 'center',
      paddingLeft: 20
    },
    searchModal: {
      justifyContent: 'center',
      height: 90,
      width: 90
    }
}


export default SearchResultItem
