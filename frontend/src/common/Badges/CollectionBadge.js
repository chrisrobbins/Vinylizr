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
    alignSelf: 'flex-end'
  },
  text: {
    color: '#ffffff',

  }
}



export default CollectionBadge
