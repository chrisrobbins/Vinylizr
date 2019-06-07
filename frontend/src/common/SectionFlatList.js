import React, { Component } from 'react';
import { FlatList } from 'react-native';
import { RecordItem } from './';

class SectionFlatList extends Component {
  shouldComponentUpdate(nextProps, nextState) {
    if (this.props.section.data === nextProps.section.data) return false;
    return true;
  }
  render() {
    const {
      section,
      keyExtractor,
      navigation,
      screenProps: {
        user: {
          accessData: { userMeta },
        },
      },
    } = this.props;
    return (
      <FlatList
        data={section.data}
        windowSize={15}
        extraData={this.props}
        renderItem={({ item }) => (
          <RecordItem item={item} navigation={navigation} userMeta={userMeta} />
        )}
        keyExtractor={keyExtractor}
        ListFooterComponent={this.renderFooter}
        contentContainerStyle={styles.contentContainerStyle}
        numColumns={3}
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
