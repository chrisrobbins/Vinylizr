import React from 'react';
import { FlatList, Text } from 'react-native';
const Suggestions = ({ results }) => {
  const _keyExtractor = item => item.id.toString();
  return (
    <FlatList
      data={results}
      renderItem={({ item }) => <Text key={item.id}>{item.title}</Text>}
      keyExtractor={_keyExtractor}
      // style={styles.renderAlbums}
      scrollEnabled={false}
    />
  );
};

export default Suggestions;
