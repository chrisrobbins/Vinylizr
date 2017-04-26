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

  var swipeoutBtns = [
  {
    text: 'Button'
  }
]

  return (
    <Swipeout
      right={swipeoutBtns}
      backgroundColor='rgba(0,0,0,.1)'
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
  }
};

export { AlbumDetail };
