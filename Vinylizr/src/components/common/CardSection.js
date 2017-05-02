
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
    paddingLeft: 0,
    marginTop: 0,
    backgroundColor: 'rgba(26, 26, 26, .1)',
    justifyContent: 'flex-start',
    flexDirection: 'row',
    position: 'relative',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(151,151,151,.3)'

  }
};

export { CardSection };
