import React, { Component } from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  Linking
} from 'react-native';
import { Header } from '../components/common';
import { connect } from 'react-redux';
import { fetchWantlist } from '../actions/wantlist-action.js';
import DeepLinking from 'react-native-deep-linking'
import {linking} from 'react-native'
class Wantlist extends Component {

  static navigationOptions = {
    header: null,
    tabBarIcon: ({ tintColor }) => (tintColor == '#e91e63' ?
    <Image
      source={require('../img/wantlistIcon_select.png')}
    />
    :
    <Image
      source={require('../img/wantlistIcon.png')}
    />
  ),
};

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

    if (routeName === 'wantlist') {
      navigate('vinylizr')
    };
  }



  // componentDidMount() {
  //   this.props.fetchWantlist();
  //
  // }

  // {this.props.wantlist.wantlist.albums.map((album) => {
  //   // console.log("WANTLIST: ", album)
  //   let newRecord = album
  //   return (<Image style={styles.albumCovers} key={newRecord.key} source={{ uri: newRecord.album.thumb }} />)
  // })
  // }

  render() {
    return (
      <View style={styles.wantlistContainer}>
      <View style={styles.headerContainer}>
      <Header headerText={"Wantlist"} />
      </View>
        <ScrollView
          automaticallyAdjustContentInsets={false}
          contentContainerStyle={styles.textContainer}>

        </ScrollView>
      </View>
    );
  }
}

const styles = {
  wantlistContainer: {
    flex: 1,
    backgroundColor: '#000'
  },
  textContainer: {
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  albumCovers: {
    height: 124,
    width: 124,
    marginLeft: .5,
    marginRight: .5,
    marginTop: .5,
    marginBottom: .5,
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
        fetchWantlist: () => {
            dispatch(fetchWantlist())
        },

      }
    }



export default connect(mapStateToProps, mapDispatchToProps)(Wantlist);
