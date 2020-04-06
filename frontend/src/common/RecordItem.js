import React from 'react';
import { TouchableOpacity, View, Image } from 'react-native';
import { Spinner } from './';
import noImage from '/assets/images/n-a.png';

const RecordItem = ({
  isFetching,
  navigation,
  username,
  inWantlist,
  inCollection,
  routeBack,
  item,
}) => {
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
                username: username,
                routeBack,
                releaseId: item.basic_information.id,
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

const styles = {
  albumCovers: {
    height: 110,
  },
};

export default RecordItem;
