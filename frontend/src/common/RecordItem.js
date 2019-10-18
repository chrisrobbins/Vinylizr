import React, { PureComponent } from 'react';
import { TouchableOpacity, View, Image } from 'react-native';
import { Spinner } from './';
import noImage from '/assets/images/n-a.png';

const RecordItem = ({
  isFetching,
  navigation,
  userMeta,
  inWantlist,
  inCollection,
  routeBack,
  item,
}) => {
  console.log('RECORD ITEM', item.basic_information.cover_image);

  const displayRecord = () => {
    switch (isFetching) {
      case false:
        return (
          <View>
            <TouchableOpacity
              key={item.basic_information.cover_image}
              onPress={() => {
                navigation.navigate('AlbumDetail', {
                  item,
                  inCollection,
                  inWantlist,
                  userData: userMeta,
                  routeBack,
                });
              }}
            >
              {!item.basic_information.cover_image ? (
                <Image style={styles.albumCovers} source={noImage} />
              ) : (
                <Image
                  style={styles.albumCovers}
                  source={{ uri: item.basic_information.cover_image }}
                />
              )}
            </TouchableOpacity>
          </View>
        );

        break;

      default:
        return <Spinner />;
        break;
    }
  };

  return displayRecord();
};

const styles = {
  albumCovers: {
    height: 110,
  },
};

export default RecordItem;
