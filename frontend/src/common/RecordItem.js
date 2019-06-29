import React, { PureComponent } from 'react';
import { TouchableOpacity, View, Image } from 'react-native';
import { Spinner } from '#common/';
import noImage from '/assets/images/n-a.png';
class RecordItem extends PureComponent {
  displayRecord = () => {
    const {
      isFetching,
      navigation,
      userMeta,
      inWantlist,
      inCollection,
      routeBack,
      item,
    } = this.props;
    const { cover_image } = item.basic_information;

    switch (isFetching) {
      case false:
        return (
          <View>
            <TouchableOpacity
              key={item.instance_id}
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
              {!cover_image ? (
                <Image style={styles.albumCovers} source={noImage} />
              ) : (
                <Image
                  style={styles.albumCovers}
                  source={{ uri: cover_image }}
                />
              )}
            </TouchableOpacity>
          </View>
        );

        break;

      default:
        return <Spinner sise={'medium'} />;
        break;
    }
  };
  render() {
    const { item } = this.props;
    {
      return this.displayRecord();
    }
  }
}

const styles = {
  albumCovers: {
    height: 110,
  },
};

export { RecordItem };
