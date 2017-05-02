import React from 'react';
import { View } from 'react-native';

const Card = (props) => {
  return (
      <View style={styles.flexContainer}>

      {props.children}
      </View>

  );
};

const styles = {
  flexContainer: {
    margintop: 0,
  }

};

export { Card };
