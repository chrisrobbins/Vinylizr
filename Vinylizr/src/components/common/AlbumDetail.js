import React from 'react';
import { Text, View, Image, Linking } from 'react-native';
import { CardSection } from './CardSection';
import { Button } from './Button';

const AlbumDetail = ({ album }) => {
  const { title, thumb } = album.results;
  const {
    imageView,
    textView,
    imageStyle,
    artistTextStyle,
    titleTextStyle
  } = styles;

  return (
      <CardSection>
        <View style={imageView}>
          <Image
            style={imageStyle}
            source={{ uri: thumb }}
          />
      </View>

      <View style={textView}>
          <Text style={titleTextStyle}>{title}</Text>
          <Text style={artistTextStyle}>{artist}</Text>
        </View>
      </CardSection>
  );
};

const styles = {
  imageView: {
    backgroundColor: 'green',
    height: 50
  },
  titleTextStyle: {
    fontSize: 16,
    color: "#DADADA"
  },
  artistTextStyle: {
    fontSize: 14,
    color: "rgba(217,217,217,.6)"
  },
  imageStyle: {
    height: 80,
    width: 80
  }
};

export { AlbumDetail };
