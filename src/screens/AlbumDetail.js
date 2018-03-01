import React, { Component } from 'react'
import { Text, View, Image, ScrollView, Dimensions } from 'react-native'
import { DetailButton } from '../components/common'
import Stars from 'react-native-stars-rating'
const windowSize = Dimensions.get('window')


export default class AlbumDetail extends Component {
  static navigationOptions = {
    drawerLabel: 'AlbumDetail',
    header: null
  }


  render() {
    const item = this.props.navigation.state.params
    console.log(item, " DETAIL ITEM")
    let discogsString = item.title.split('-')
    const title = discogsString[1]
    const artist = discogsString[0]
    const label = item.label
    return(
      <View style={styles.detailScrollView}>

      <ScrollView contentContainerStyle={styles.scrollViewChild}>
        <View style={styles.imagesContainer}>
         <Image
          style={styles.backgroundImage}
          source={{ uri: item.thumb }}
          blurRadius={1}
          resizeMode='cover'
         >
          <Image
            source={require('../img/album_gradient_BG.png')}
            resizeMode="cover"
            style={styles.album_gradient}>
          <View style={styles.infoContainer}>
          <Image
            source={{ uri: item.thumb }}
            style={styles.detailThumb}
          >
          </Image>
          <View style={{width: 350}}>
          <Text numberOfLines={1} ellipsifyMode={'tail'} style={styles.detailTitle}>{title}</Text>
          <Text style={styles.detailArtist}>{artist}</Text>
          </View>
          </View>
        <View style={styles.btnContainer}>
          <DetailButton btnStyle={styles.detailCollectionBtnFalse} txtStyle={styles.btnCollText}><Image source={require('../img/detail-collection-icon-inactive.png')}/> in collection</DetailButton>
          <DetailButton btnStyle={styles.detailWantlistBtnFalse} txtStyle={styles.btnWantText}><Image source={require('../img/detail-wantlist-icon-inactive.png')}/> in wantlist</DetailButton>
        </View>
        </Image>
      </Image>
      </View>
          <View>
            <View style={styles.detailContain}>
            <Text
              style={styles.detailStaticTxt}>
              Label
            </Text>
            <Text style={styles.detailDynTxt}>
              {label}
            </Text>
          </View>
            <View style={styles.detailContain}>
            <Text
              style={styles.detailStaticTxt}>
              Catalog #
            </Text>
            <Text style={styles.detailDynTxt}>
              {item.catno}
            </Text>
          </View>
            <View style={styles.detailContain}>
            <Text
              style={styles.detailStaticTxt}>
              Year
            </Text>
            <Text style={styles.detailDynTxt}>
              {item.year}
            </Text>
          </View>
            <View style={styles.detailContain}>
            <Text
              style={styles.detailStaticTxt}>
              Genre
            </Text>
            <Text style={styles.detailDynTxt}>
              {item.genre}
            </Text>
            </View>
          </View>
          <View style={styles.starContainer}>
            <Text style={styles.starTxt}>Rate this Record:</Text>
          <Stars
            isActive={true}
            rateMax={5}
            isHalfStarEnabled={false}
            onStarPress={(rating) => console.log(rating)}
            rate={3}
            size={30}
            color={'#F42E4A'}
/>
</View>
        </ScrollView>
        </View>
    )
  }
}

const styles = {
  detailScrollView: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#000',
    flexDirection: 'column'


  },
  imagesContainer: {
    width: windowSize.width,
    height: windowSize.height,
    justifyContent: 'flex-end'
  },
  scrollViewChild: {

  },
  backgroundImage: {
    flex: 1,
    backgroundColor: '#000',
    justifyContent: 'flex-end',
  },
  album_gradient: {
    flex: 1,
    width: null,
    alignSelf: 'stretch',
    justifyContent: 'flex-end'
  },
  infoContainer: {
    justifyContent: 'flex-end',
  },
  detailThumb: {
    height: 180,
    width: 180,
    marginBottom: 5,
    marginLeft: 20,
  },
  detailTitle: {
    color: '#fff',
    fontSize: 20,
    marginLeft: 16,
    fontWeight: 'bold',
    backgroundColor: 'transparent',
    fontFamily: 'Lato-Regular',
    lineHeight: 28
  },
  detailArtist: {
    color: '#777777',
    marginLeft: 20,
    marginBottom: 20,
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
    color: '#7ED321',
    backgroundColor: 'transparent'
  },
  btnWantText: {
    fontFamily: 'Lato-Regular',
    color: '#F4702E',
    backgroundColor: 'transparent'

  },
  detailCollectionBtnFalse: {
    borderWidth: 1,
    borderColor: '#7ED321',
    borderRadius: 99,
    height: 44,
    width: 165,
    justifyContent: 'center',
    alignItems: 'center'
  },
  detailWantlistBtnFalse: {
    borderWidth: 1,
    borderColor: '#F4702E',
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
    marginLeft: 17,
    marginRight: 17,
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
