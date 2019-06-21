import React, { PureComponent } from 'react';
import { TouchableOpacity, View, Image } from 'react-native';
import noImage from '/assets/images/n-a.png';
class RecordItem extends PureComponent {
  render() {
    const { item, navigation, userMeta, inWantlist, inCollection } = this.props;
    const { cover_image } = item.basic_information;

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
            });
          }}
        >
          {!cover_image ? (
            <Image style={styles.albumCovers} source={noImage} />
          ) : (
            <Image style={styles.albumCovers} source={{ uri: cover_image }} />
          )}
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = {
  albumCovers: {
    height: 110,
  },
};

export { RecordItem };
