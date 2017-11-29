import React, { Component } from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  Linking
} from 'react-native';
import { Header } from '../components/common';
import { connect } from 'react-redux';
import { fetchCollection } from '../actions/collection-action.js';
import _ from 'lodash';
import fire from '../components/fire.js';
import { NavigationActions } from 'react-navigation'


class UserCollections extends Component {

//   static navigationOptions = {
//     header: null,
//     tabBarIcon: ({ tintColor }) =>
//     (tintColor == '#e91e63' ?
//     <Image
//       source={require('../img/collection_select.png')}
//       style={[{tintColor: '#F42E4A'}]}
//     />
//     :
//     <Image
//       source={require('../img/collectionIcon.png')}
//       style={[{tintColor: 'grey'}]}
//     />
//   ),
// };

  // componentWillMount() {
  //   this.props.fetchCollection();
  //   console.log(this.props);
  //
  // }

componentDidMount() {
  Linking.addEventListener('url', this.handleOpenURL);

}

componentWillUnmount() { // C
    Linking.removeEventListener('url', this.handleOpenURL);
  }
  handleOpenURL = (event) => { // D
    this.navigate(event.url);
  }
  navigate = (url) => { // E
    const { navigate } = this.props.navigation;
    const route = url.replace(/.*?:\/\//g, '');
    const routeName = route.split('/')[0];

    if (routeName === 'collection') {
      navigate('vinylizr')
    };
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
