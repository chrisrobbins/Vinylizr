import React from 'react';
import { View } from 'react-native';

const Card = (props) => {
  return (
    <View style={styles.containerStyle}>
      <View style={styles.flexContainer}>

      {props.children}
      </View>
    </View>
  );
};

const styles = {
  containerStyle: {
    marginLeft: 5,
    marginTop: 1
  }

};

export { Card };
