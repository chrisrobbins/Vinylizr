import React, { PureComponent } from 'react';
import { TouchableOpacity, View, Image } from 'react-native';
class RecordItem extends PureComponent {
  // shouldComponentUpdate(nextProps, nextState) {
  //   if (this.props.item.instance_id === nextProps.item.instance_id)
  //     return false;
  // }
  render() {
    const { item } = this.props;
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
          <Image
            style={styles.albumCovers}
            source={{ uri: item.basic_information.cover_image }}
          />
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
