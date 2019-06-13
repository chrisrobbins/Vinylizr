// SECTIONLIST RENDERITEM COMPONENT (FLATLIST)
import React, { Component } from 'react';
import { FlatList, View } from 'react-native';
import { isEqual } from 'lodash';
import { RecordItem } from './';

class SectionFlatList extends Component {
  shouldComponentUpdate(nextProps, nextState) {
    if (!isEqual(this.props.item, nextProps.item)) {
      return true;
    }
    return false;
  }
  listKey = (item, index) => 'D' + index.toString();

  _endReached = () => {
    console.log('END REACHED');
  };

  render() {
    console.log('FLATLIST RENDERING');
    console.log('FLAT LIST PROPS', this.props);
    const {
      section,
      navigation,
      screenProps: {
        user: {
          accessData: { userMeta },
        },
      },
    } = this.props;
    return (
      <FlatList
        data={section}
        bounces={false}
        renderItem={({ index, item }) => (
          <RecordItem
            item={item}
            key={item.instance_id}
            navigation={navigation}
            userMeta={userMeta}
          />
        )}
        keyExtractor={this.listKey}
        contentContainerStyle={styles.contentContainerStyle}
        numColumns={3}
        scrollEnabled={false}
        onEndReached={this._endReached}
      />
    );
  }
}

const styles = {
  contentContainerStyle: {
    flexDirection: 'column',
  },
};

export { SectionFlatList };
