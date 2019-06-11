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
    const {
      section: { data },
      navigation,
      screenProps: {
        user: {
          accessData: { userMeta },
        },
      },
    } = this.props;
    return (
      <View style={{ flex: 1 }}>
        <FlatList
          data={data}
          bounces={false}
          renderItem={({ item }) => (
            <RecordItem
              item={item}
              key={data.instance_id}
              navigation={navigation}
              userMeta={userMeta}
            />
          )}
          keyExtractor={this.listKey}
          contentContainerStyle={styles.contentContainerStyle}
          numColumns={3}
          onEndReached={this._endReached}
        />
      </View>
    );
  }
}

const styles = {
  contentContainerStyle: {
    flexDirection: 'column',
  },
};

export { SectionFlatList };
