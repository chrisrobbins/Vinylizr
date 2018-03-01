
import React from 'react'
import { View } from 'react-native'

const CardSection = (props) => {
  return (
    <View style={styles.containerStyle}>
      {props.children}
    </View>
  )
}

const styles = {
  containerStyle: {
    justifyContent: 'flex-start',
    flexDirection: 'row',
    flex:1,
    backgroundColor: '#000000'

  }
}

export { CardSection }
