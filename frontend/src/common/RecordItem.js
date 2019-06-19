import React, { PureComponent } from 'react';
import { TouchableOpacity, View, Image } from 'react-native';
import noImage from '/assets/images/n-a.png';
class RecordItem extends PureComponent {
  render() {
    const { item, navigation, userMeta } = this.props;
    const { cover_image } = item.basic_information;

    console.log({ item });

    return (
      <View>
        <TouchableOpacity
          key={item.instance_id}
          onPress={() => {
            navigation.navigate('AlbumDetail', {
              item: item,
              inCollection: true,
              inWantlist: false,
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
    height: 124,
    width: 124,
    marginLeft: 0.5,
    marginRight: 0.5,
    marginTop: 0.5,
    marginBottom: 0.5,
  },
};

export { RecordItem };
