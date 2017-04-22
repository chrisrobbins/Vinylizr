import React from 'react';
import { View } from 'react-native';

const CardSection = (props) => {
  return (
    <View style={styles.containerStyle}>
      {props.children}
    </View>
  );
};

const styles = {
  containerStyle: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(151,151,151,.6)'
  }
};

export { CardSection };
