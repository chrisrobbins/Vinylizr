import React, { Component } from 'react';
import { Text, TouchableOpacity, View, Image } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';


export default class AlbumDetail extends Component {


  render() {
    let item = this.props.album.album;
    let discogsString = item.title.split('-');
    const title = discogsString[1];
    const artist = discogsString[0];
    console.log(this.props, 'ALBUM DEETSS');
    return(
      <View style={styles.detailContainer}>
        <LinearGradient
          colors={['rgba(0, 0, 0, .9)', 'rgba(0, 0, 0, .2)']}
          style={styles.LinearGradient}>
        <Image
          style={styles.backgroundImage}
          source={{ uri: this.props.album.album.thumb }}
          blurRadius={4}
          resizeMode={'cover'}
        >
          <Image source={{ uri: this.props.album.album.thumb }} style={styles.detailThumb} />
          <Text style={styles.detailTitle}>{title}</Text>
          <Text style={styles.detailArtist}>{artist}</Text>

        </Image>
        </LinearGradient>
        </View>
    )
  }
}

const styles = {
  detailContainer: {
    flex: 1
  },
  backgroundImage: {
    flex:1,
    justifyContent: 'flex-end'
  },
  detailText: {
    color: '#fff'
  },
  LinearGradient: {
    flex: 1,
    maxHeight: 585,
    width: 365,
    borderLeftWidth: 0,
    borderTopWidth: 0,
    borderBottomWidth: 0,
    borderRightWidth: 0,
    alignSelf: 'center',
  },
  detailThumb: {
    height: 125,
    width: 125,
    marginBottom: 5,
    marginLeft: 20,
  },
  detailTitle: {
    color: '#fff',
    fontSize: 18,
    marginLeft: 16,
    fontWeight: 'bold'
  },
  detailArtist: {
    color: '#fff',
    marginLeft: 20,
    marginBottom: 20
  }
}
