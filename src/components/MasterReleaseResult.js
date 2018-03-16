
import React, { Component } from 'react'
import {
  Text,
  View,
  Image,
  Linking,
  TouchableHighlight,
  AsyncStorage,
  FlatList,
  TouchableOpacity
} from 'react-native'
import _ from 'lodash'

import { CardSection } from '../components/common/CardSection'
import { Button } from '../components/common/Button'
import axios from 'axios'
import SearchResultItem  from './SearchResultItem'
import Collapsible from 'react-native-collapsible/Accordion';
import { NavigationActions } from 'react-navigation'


class MasterReleaseResult extends Component {




render() {
  const {
    item,
  } = this.props

  let discogsRecord = item.thumb
  let discogsString = item.title.split('-')
  const title = discogsString[1]
  const artist = discogsString[0]

  const {
    imageView,
    textView,
    imageStyle,
    titleTextStyle,
    artistTextStyle,
    container,
    collectionSavedTextStyle,
    wantlistSavedTextStyle
  } = styles


  return (
    <View style={container}>

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

    </View>
    )
  }
}

const styles = {
  container: {
    flex: 1,
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
  //   color: '#0967EE',
  //   marginLeft: 12,
  //   marginTop: 9,
  //   fontSize: 10
  // },
  // wantlistSavedTextStyle: {
  //   color: '#D400FF',
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
    contentText: {
    paddingTop: 15,
    paddingRight: 15,
    paddingBottom: 15,
    paddingLeft: 15,
    color: '#fff',
  },
    searchModal: {
      justifyContent: 'center',
      height: 90,
      width: 90
    }
}


export default MasterReleaseResult
