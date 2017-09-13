import React, { Component } from 'react';
import {
  View,
  Image,
  Text
} from 'react-native';

class ListItem extends Component {

  render() {
    const { item } = this.props;
    const discogsString = item.title.split('-');
    const title = discogsString[1];
    const artist = discogsString[0];
    return (
      <View>
        <View style={styles.container}>
          {!item.thumb ? <Image
            style={styles.imageStyle}
            source={require('../img/n-a.png')}
          /> : <Image
            style={styles.imageStyle}
            source={{ uri: item.thumb }}
          />}
        </View>
        <Text>{title}</Text>
        <Text>{artist}</Text>

      </View>
    )
  }
}

const styles = {
  container: {
    flexDirection: 'column',
    padding: 5
  },
  imageStyle: {
    width: 85,
    height: 85
  }
}

export default ListItem;
