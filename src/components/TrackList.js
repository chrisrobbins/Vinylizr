import React, { Component } from 'react'
import { Text, View } from 'react-native'

class TrackList extends Component {

  render() {
    const { tracklist } = this.props
    console.log(tracklist, "THIS IS THE TRACK LIST NOT GETTING PROPS");
    return(
      <View style={styles.container}>
        {tracklist.map((track) => {
          return (
            <Text style={styles.text}>{track.title}</Text>
          )
        })}
      </View>

    )
  }
}

const styles = {
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#D400FF',
    marginLeft: 8,
    backgroundColor: '#D400FF',
    borderRadius: 2,
    marginBottom: 1,
    alignSelf: 'flex-end'
  },
  text: {
    color: '#ffffff',
    fontSize: 16
  }
}



export default TrackList
