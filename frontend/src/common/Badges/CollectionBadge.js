import React from 'react';
import { Text, View } from 'react-native';

const CollectionBadge = ({ children }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{children}</Text>
    </View>
  );
};

const styles = {
  container: {
    height: 20,
    width: 20,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#005EFF',
    marginLeft: 8,
    backgroundColor: '#005EFF',
    borderRadius: 2,
    marginBottom: 1,
    alignSelf: 'flex-end',
  },
  text: {
    color: '#ffffff',
  },
};

export default CollectionBadge;
