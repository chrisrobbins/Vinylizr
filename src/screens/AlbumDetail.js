import React, {Component} from 'react'
import {Text, View, Image, ScrollView, Dimensions, TouchableOpacity} from 'react-native'
import {DetailButton} from '../components/common'
import Stars from 'react-native-stars-rating'
const windowSize = Dimensions.get('window')

class AlbumDetail extends Component {
  static navigationOptions = {
    drawerLabel: 'AlbumDetail',
    header: null
  }

  render() {
    const {item} = this.props.navigation.state.params
    console.log(item, " DETAIL ITEM")
    const title = item.basic_information.title
    const artist = item.basic_information.artists[0].name
    const label = item.basic_information.labels[0].name
    const year = item.basic_information.year

    return (<View style={styles.detailScrollView}>

      <ScrollView contentContainerStyle={styles.scrollViewChild}>
        <View style={styles.imagesContainer}>
          <Image style={styles.backgroundImage} source={{
              uri: item.basic_information.cover_image
            }} blurRadius={1} resizeMode='cover'>
            <Image source={require('../img/album_gradient_BG.png')} resizeMode="cover" style={styles.album_gradient}>
              <View style={styles.infoContainer}>
                <Image source={{
                    uri: item.basic_information.cover_image
                  }} style={styles.detailThumb}></Image>
                <View style={{
                    width: 350
                  }}>
                  <Text numberOfLines={1} ellipsifyMode={'tail'} style={styles.detailTitle}>{title}</Text>
                  <Text style={styles.detailArtist}>{artist}</Text>
                  <Text style={styles.detailLabel}>{label}</Text>
                  <Text style={styles.detailYear}>{year}</Text>
                </View>
              </View>
              <View style={styles.btnContainer}>
                <DetailButton btnStyle={styles.detailCollectionBtnFalse} txtStyle={styles.btnCollText}>Add to Collection</DetailButton>
                <DetailButton btnStyle={styles.detailWantlistBtnFalse} txtStyle={styles.btnWantText}>Add to Wantlist</DetailButton>
              </View>
            </Image>
          </Image>
        </View>
        <View style={styles.midContainer}>
          <View style={styles.avgRatingContainer}>
            <Text style={styles.midTitle}>AVG. RATING</Text>
            <View style={styles.ratingContainer}>
              <Text style={styles.bigRate}>3.9</Text>
              <Text style={styles.littleRate}>/5</Text>
            </View>
            <View style={styles.starContainer}>
              <Text style={styles.rateAlbumTitle}>Rate Album</Text>
            <Stars isActive={true} rateMax={5} isHalfStarEnabled={true} onStarPress={(rating) => console.log(rating)} rate={3} size={30} color={'#F8E71C'}/>
            </View>
          </View>
          <View style={styles.midDivider}></View>
          <View style={styles.valueContainer}>
            <Text style={styles.midTitle}>MEDIAN VALUE</Text>
            <Text style={styles.median}>$17.21</Text>
            <View style={styles.lowHiContainer}>
              <View style={styles.lowContainer}>
                <Text style={styles.lowTitle}>Low</Text>
                <Text style={styles.loHiPrice}>$12.99</Text>
              </View>
              <View style={styles.hiContainer}>
                <Text style={styles.lowTitle}>High</Text>
                <Text style={styles.loHiPrice}>$30.99</Text>
              </View>
            </View>
            <View>
              <TouchableOpacity>
                <Text style={styles.buyLink}>39 for sale</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <View style={styles.endDivider}></View>
      </ScrollView>
    </View>)
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
  midContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  lowContainer: {
    flexDirection: 'row'
  },
  lowHiContainer: {
    flexDirection: 'row',
    marginTop: 10,
  },
  ratingContainer: {
    flexDirection: 'row',
  },
  avgRatingContainer: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
  },
  valueContainer: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center'
  },
  median: {
    fontFamily: 'Lato-Regular',
    fontSize: 36,
    color: '#ffffff',
    lineHeight: 44,
    marginTop: 10
  },
  imagesContainer: {
    width: windowSize.width,
    height: windowSize.height,
    justifyContent: 'flex-end'
  },
  scrollViewChild: {},
  backgroundImage: {
    flex: 1,
    backgroundColor: '#000',
    justifyContent: 'flex-end'
  },
  album_gradient: {
    flex: 1,
    width: null,
    alignSelf: 'stretch',
    justifyContent: 'flex-end'
  },
  bigRate: {
    fontFamily: 'Lato-Light',
    fontSize: 64,
    color: '#ffffff',
    lineHeight: 77
  },
  littleRate: {
    fontFamily: 'Lato-Light',
    fontSize: 24,
    color: '#666666',
    lineHeight: 77,
    marginTop: 16,
    marginLeft: 4
  },
  buyLink: {
    fontFamily: 'Lato-Regular',
    fontSize: 16,
    color: '#F42E4A',
    lineHeight: 19,
    marginTop: 25
  },
  rateAlbumTitle: {
    fontFamily: 'Lato-Regular',
    fontSize: 12,
    color: '#666666',
    lineHeight: 15,
    marginBottom: 5
  },
  lowTitle: {
    fontFamily: 'Lato-Regular',
    fontSize: 12,
    color: '#666666',
    lineHeight: 15,
    marginBottom: 2
  },
  loHiPrice: {
    fontFamily: 'Lato-Regular',
    fontSize: 16,
    color: '#ffffff',
    lineHeight: 19
  },
  lowContainer: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 19
  },
  hiContainer: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 19
  },
  starContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  midDivider: {
    height: 204,
    width: 1,
    backgroundColor: '#666666',
    marginTop: -10
  },
  endDivider: {
    height: 1,
    width: 343,
    backgroundColor: '#666666',
    alignSelf: 'center',
    marginTop: 10
  },

  infoContainer: {
    justifyContent: 'flex-end'
  },
  detailThumb: {
    height: 208,
    width: 208,
    marginBottom: 5,
    marginLeft: 20
  },
  detailTitle: {
    color: '#fff',
    fontSize: 24,
    marginLeft: 20,
    backgroundColor: 'transparent',
    fontFamily: 'Lato-Bold',
    lineHeight: 29
  },
  midTitle: {
    fontFamily: 'Lato-Bold',
    fontSize: 16,
    color: '#9B9B9B',
    lineHeight: 19,
    marginBottom: 5
  },
  detailArtist: {
    color: '#777777',
    marginLeft: 20,
    backgroundColor: 'transparent',
    fontFamily: 'Lato-Regular',
    lineHeight: 29,
    fontSize: 16,
    letterSpacing: 1

  },
  detailLabel: {
    color: '#777777',
    marginLeft: 20,
    backgroundColor: 'transparent',
    fontFamily: 'Lato-Regular',
    lineHeight: 29,
    fontSize: 16,
    letterSpacing: 1

  },
  detailYear: {
    color: '#777777',
    marginLeft: 20,
    marginBottom: 20,
    backgroundColor: 'transparent',
    fontFamily: 'Lato-Regular',
    lineHeight: 29,
    fontSize: 16,
    letterSpacing: 1

  },
  btnContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignSelf: 'stretch',
    marginBottom: 45

  },
  btnCollText: {
    fontFamily: 'Lato-Regular',
    color: '#fff',
    backgroundColor: 'transparent',
    fontSize: 14,
    lineHeight: 15

  },
  btnWantText: {
    fontFamily: 'Lato-Regular',
    color: '#ffffff',
    backgroundColor: 'transparent',
    fontSize: 14,
    lineHeight: 15

  },
  detailCollectionBtnFalse: {
    borderWidth: 2,
    borderColor: '#0967EE',
    borderRadius: 1,
    height: 44,
    width: 165,
    justifyContent: 'center',
    alignItems: 'center'
  },
  detailWantlistBtnFalse: {
    borderWidth: 2,
    borderColor: '#D400FF',
    borderRadius: 1,
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
    justifyContent: 'space-around',
    borderBottomWidth: .5,
    borderColor: 'rgba(217,217,217,.35)',
    justifyContent: 'flex-start',
    marginLeft: 17,
    marginRight: 17,
    marginBottom: 10

  },

}

export default AlbumDetail
