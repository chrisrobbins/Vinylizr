import React, { Component } from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  Linking,
  AsyncStorage
} from 'react-native';
import { Header } from '../components/common';
import { connect } from 'react-redux';
import { fetchCollection } from '../actions/collection-action.js';
import _ from 'lodash';
import { NavigationActions } from 'react-navigation'
import axios from 'axios'


class UserCollections extends Component {
constructor(props) {
  super(props)

  this.getSecret = this.getSecret.bind(this)
  this.getToken = this.getToken.bind(this)
}

  static navigationOptions = ({screenProps}) => ({
    header: null,
    tabBarIcon: ({ tintColor }) => (tintColor == '#e91e63'
    ?
    <Image source={require('../img/collection_select.png')} />
    :
    <Image source={require('../img/collectionIcon.png')} />
    )
  })

 getSecret() {
  AsyncStorage.getItem('oauth_token').then((value) => {
    console.log(value, "this SHOULD BE THE TOKEN");
  })
  .catch((error) => {
    console.log(error, " ERROR GETTING TOKEN FROM LOCAL DISK");
  })
}

getToken() {
  AsyncStorage.getItem('oauth_secret').then((value) => {
    console.log(value, "this SHOULD BE THE TOKEN");
  })
 .catch((error) => {
   console.log(error, " ERROR GETTING TOKEN FROM LOCAL DISK");
 })
}




componentDidMount() {
  let secret = this.getSecret()
  let token = this.getToken()

  axios({method:'GET', url:`https://api.discogs.com/oauth/identity`,
  headers:{
  'Content-Type': 'application/x-www-form-urlencoded',
  'Authorization':`OAuth oauth_consumer_key="jbUTpFhLTiyyHgLRoBgq",oauth_nonce="${Date.now()}",oauth_token="${token}",oauth_signature="LSQDaLpplgcCGlkzujkHyUkxImNlWVoI&${secret}",oauth_signature_method="PLAINTEXT",oauth_timestamp="${Date.now()}"`,
  'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/61.0.3163.100 Safari/537.36'
 }
})
  .then((response) => {
    console.log(response, "SECRET IDENTITY OF BATMAN!");

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
});
}

  // {this.props.collection.collection.albums.map((album) => {
  //   let newRecord = album
  //   console.log(newRecord);
  //   return (
  //     <TouchableOpacity key={newRecord.key} onPress={() => {
  //     this.props.navigation.navigate('AlbumDetail', {
  //     title: newRecord.album.title,
  //     thumb: newRecord.album.thumb,
  //     label: newRecord.album.label[0],
  //     catno: newRecord.album.catno,
  //     year: newRecord.album.year,
  //     genre: newRecord.album.genre[0]
  //    })
  //  }}>
  //
  //
  //     <Image
  //       style={styles.albumCovers}
  //       source={{ uri: newRecord.album.thumb }}
  //     />
  //     </TouchableOpacity>
  //   )
  //  })
  // }

  render() {

    return (
      <View style={styles.mainContainer}>
      <View style={styles.headerContainer}>
      <Header headerText={"Collection"} />
    </View>
      <View style={styles.contentContainer}>
      <ScrollView
        automaticallyAdjustContentInsets={false}
        contentContainerStyle={styles.textContainer}>

        </ScrollView>
        </View>
      </View>
    );
  }
}

const styles = {
  textContainer: {
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingBottom: 50,
  },
  contentContainer: {
    flex: 1,
    backgroundColor: '#000'

  },
  mainContainer: {
    flex: 1,
  },
  albumCovers: {
    height: 124,
    width: 124,
    marginLeft: .5,
    marginRight: .5,
    marginTop: .5,
    marginBottom: .5
  }
};

const mapStateToProps = (state) => {
    return {
      ...state,
    }
}
// for click events so that dispatches can happen
const mapDispatchToProps = (dispatch) => {
    return {
        fetchCollection: () => {
            dispatch(fetchCollection())
        },

      }
    }



export default connect(mapStateToProps, mapDispatchToProps)(UserCollections);
