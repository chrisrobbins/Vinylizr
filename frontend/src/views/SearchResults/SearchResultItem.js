import React from 'react';
import { Text, View, Image } from 'react-native';
import { CardSection } from '#common';
import noImage from '/assets/images/empty-star.png';
import { WantlistBadge, CollectionBadge } from '#common/Badges/';

const SearchResultItem = ({
  item: {
    id,
    thumb,
    label,
    country,
    year,
    title,
    user_data: { in_wantlist, in_collection },
  },
}) => {
  const releaseTitle = title.split('-')[1];
  const artist = title.split('-')[0];
  const {
    imageStyle,
    textView,
    titleTextStyle,
    artistTextStyle,
    badgeContainer,
  } = styles;
  return (
    <CardSection>
      <View>
        {!thumb ? (
          <Image style={imageStyle} source={noImage} />
        ) : (
          <Image style={imageStyle} source={{ uri: thumb }} />
        )}
      </View>

      <View style={textView}>
        <Text ellipsizeMode={'tail'} numberOfLines={1} style={titleTextStyle}>
          {releaseTitle}
        </Text>
        <Text ellipsizeMode={'tail'} numberOfLines={1} style={artistTextStyle}>
          {artist}
        </Text>
        <View style={badgeContainer}>
          <Text key={id} style={styles.labelTextStyle}>
            {label[0]} - {country || ''} - {year || ''}
          </Text>
          {in_collection && <CollectionBadge>1</CollectionBadge>}
          {in_wantlist && <WantlistBadge>1</WantlistBadge>}
        </View>
      </View>
    </CardSection>
  );
};

const styles = {
  badgeContainer: {
    flexDirection: 'row',
  },

  textView: {
    flexDirection: 'column',
    justifyContent: 'center',
    flex: 1,
    maxHeight: 86,
  },
  titleTextStyle: {
    fontSize: 18,
    color: '#ffffff',
    fontFamily: 'Lato-Regular',
    lineHeight: 22,
    letterSpacing: 1,
    marginTop: 10,
  },
  labelTextStyle: {
    fontSize: 16.5,
    fontFamily: 'Lato-Regular',
    marginLeft: 6,
    color: 'rgba(217,217,217,.6)',
  },
  artistTextStyle: {
    fontSize: 14,
    color: 'rgba(217,217,217,.6)',
    marginTop: 1,
    marginBottom: 10,
    marginLeft: 6,
    fontFamily: 'Lato-Regular',
  },
  imageStyle: {
    height: 85,
    width: 85,
  },
};

export default SearchResultItem;
