import React from 'react';
import { View } from 'react-native';

const InputCardSection = props => {
  return <View style={styles.containerStyle}>{props.children}</View>;
};

const styles = {
  containerStyle: {
    paddingLeft: 0,
    marginLeft: 25,
    marginRight: 25,
    marginBottom: 10,
    backgroundColor: 'rgba(26, 26, 26, .1)',
    justifyContent: 'flex-start',
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: 'white',
  },
};

export default InputCardSection;
