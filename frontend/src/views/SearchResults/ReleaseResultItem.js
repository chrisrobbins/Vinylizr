import React from 'react';
import { Text, View } from 'react-native';
import { CardSection } from '#common/';

const ReleaseResultItem = ({ item: { id, title, artist } }) => {
  const { textView, titleTextStyle, artistTextStyle } = styles;

  return (
    <CardSection key={id}>
      <View style={textView}>
        <Text ellipsizeMode={'tail'} numberOfLines={1} style={titleTextStyle}>
          {title}
        </Text>
        <Text ellipsizeMode={'tail'} numberOfLines={1} style={artistTextStyle}>
          {artist}
        </Text>
        {/* <View style={styles.badgeContainer} key={id}>
                <CollectionBadge>1</CollectionBadge>;
                <WantlistBadge>1</WantlistBadge>;
              </View> */}
      </View>
    </CardSection>
  );
};

const styles = {
  container: {
    flexDirection: 'column',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(217,217,217,.6)',
  },
  badgeContainer: {
    flexDirection: 'row',
  },

  textView: {
    justifyContent: 'center',
    width: 250,
    height: 125,
    marginLeft: 15,
  },
  titleTextStyle: {
    fontSize: 18,
    color: '#ffffff',
    marginLeft: 5,
    fontFamily: 'Lato-Regular',
    lineHeight: 22,
    letterSpacing: 1,
  },
  labelTextStyle: {
    fontSize: 16.5,
    fontFamily: 'Lato-Regular',
    marginLeft: 5,
    marginTop: 3,
    color: 'rgba(217,217,217,.6)',
  },
  artistTextStyle: {
    fontSize: 16.5,
    color: 'rgba(217,217,217,.6)',
    marginLeft: 5,
    marginTop: 1,
    marginBottom: 15,
    fontFamily: 'Lato-Regular',
  },
  imageStyle: {
    height: 85,
    width: 85,
  },
};

export default ReleaseResultItem;
