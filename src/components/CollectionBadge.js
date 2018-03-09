import React, { Component } from 'react'
import { Text, View } from 'react-native'

class CollectionBadge extends Component {

  render() {





    return(
      <View style={styles.container}>
        <Text style={styles.text}>{this.props.children}</Text>
      </View>

    )
  }
}

const styles = {
  container: {
    height: 10,
    width: 105,
    justifyContent: 'center',
    alignItems: 'center'
  },
  text: {
    color: '#ffffff',

  }
}



export default CollectionBadge
