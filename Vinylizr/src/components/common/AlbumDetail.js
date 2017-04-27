import React from 'react';
import { Text, View, Image, Linking, ListView } from 'react-native';
import { CardSection } from './CardSection';
import { Button } from './Button';
import Swipeout from 'react-native-swipeout';


const AlbumDetail = ({ album }) => {
  const { title } = album;
  const {
    imageView,
    textView,
    imageStyle,
    titleTextStyle,
    artistTextStyle
  } = styles;

  const wantListIcon = require('../../img/wantlistIcon.png');
  const collectionIcon = require('../../img/collectionIcon.png');


  var swipeoutBtnRight = [
    {
      text: '',
      backgroundColor: '#F4702E'

    },
  {
    text: <Image source={wantListIcon} />,
    backgroundColor: '#F4702E'
  }
]

var swipeoutBtnLeft = [
{
  text: <Image source={collectionIcon} />,
  backgroundColor: '#2EF470',
},
{
  text: '',
  backgroundColor: '#2EF470'

}
]

  return (
    <Swipeout
      right={swipeoutBtnRight}
      left={swipeoutBtnLeft}
      sensitivity={3}
      backgroundColor='rgba(0,0,0,.1)'
      autoClose={true}
      close={true}
    >
      <CardSection>
        <View style={imageView}>
          <Image
            style={imageStyle}
            source={{ uri: album.cover }}
          />
      </View>

      <View style={textView}>
          <Text style={titleTextStyle}>{album.title}</Text>
          <Text style={artistTextStyle}>{album.artist.name}</Text>
        </View>
      </CardSection>
    </Swipeout>
  );
};

const styles = {
  textView: {
    justifyContent: 'center'
  },
  titleTextStyle: {
    fontSize: 16,
    color: "#DADADA",
    marginLeft: 10
  },
  artistTextStyle: {
    fontSize: 14,
    color: "rgba(217,217,217,.6)",
    marginLeft: 10,
    marginTop: 5
  },
  imageStyle: {
    height: 80,
    width: 80
  },
  btn: {
    width: 50
  }
};

export { AlbumDetail };
