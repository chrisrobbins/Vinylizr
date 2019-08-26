import React from 'react';
import { Text, View } from 'react-native';
import { CardSection } from '#common/';
import { CollectionBadge, WantlistBadge } from '#common/Badges';
const ReleaseResultItem = ({
  artist,
  item: {
    id,
    title,
    label,
    country,
    year,
    stats: {
      user: { in_collection, in_wantlist },
    },
  },
}) => {
  const {
    textView,
    titleTextStyle,
    artistTextStyle,
    badgeContainer,
    labelTextStyle,
  } = styles;
  return (
    <CardSection key={id}>
      <View style={textView}>
        <Text ellipsizeMode={'tail'} numberOfLines={1} style={titleTextStyle}>
          {title}
        </Text>
        <Text ellipsizeMode={'tail'} numberOfLines={1} style={artistTextStyle}>
          {artist}
        </Text>
        <View style={badgeContainer}>
          <Text key={id} style={labelTextStyle}>
            {label} - {country || ''} - {year || ''}
          </Text>
          {in_collection > 0 && <CollectionBadge>1</CollectionBadge>}
          {in_wantlist > 0 && <WantlistBadge>1</WantlistBadge>}
        </View>
      </View>
    </CardSection>
  );
};

const styles = {
  badgeContainer: {
    flexDirection: 'row',
    marginBottom: 3,
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
    marginBottom: 7,
    marginLeft: 6,
    fontFamily: 'Lato-Regular',
  },
  imageStyle: {
    height: 85,
    width: 85,
  },
};

export default ReleaseResultItem;
