import React from 'react';
import { View, StatusBar } from 'react-native';
import AppNavigator from '../../navigation/AppNavigator';

const RenderVinylizr = props => {
  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <AppNavigator {...props} />
    </View>
  );
};

const styles = {
  container: {
    flex: 1,
  },
};

export default RenderVinylizr;
