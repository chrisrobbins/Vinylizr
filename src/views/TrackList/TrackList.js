import React, { Component } from 'react'
import { Text, View } from 'react-native'

class TrackList extends Component {


  getTrackLetter = (track) => {
    let letter
    switch (track.position) {
    case "1":
        letter = "A1";
        break;
    case "2":
        letter = "A2";
        break;
    case "3":
        letter = "A3";
        break;
    case "4":
        letter = "B1";
        break;
    case "5":
        letter = "B2";
        break;
    case "6":
        letter = "B3";
        break;
    case "7":
        letter = "C1";
        break;
    case "8":
        letter = "C2";
        break;
    case "9":
        letter = "C3";
        break;
    case "10":
        letter = "D1";
        break;
    case "11":
        letter = "D2";
        break;
    case "12":
        letter = "D3";
        break;
    case "13":
        letter = "E1";
        break;
    case "14":
        letter = "E2";
        break;
    case "15":
        letter = "E3";
        break;
    case "16":
        letter = "F1";
        break;
    case "17":
        letter = "F2";
        break;
    case "18":
        letter = "F3";
      default:
      return track.position

    }
    return letter
  }


  render() {
    const { tracklist } = this.props
    return(
      <View style={styles.container}>
        <Text style={styles.trackTitle}>Tracklist:</Text>
        {tracklist.map((track) => {
          return (
            <View key={track.position} style={styles.trackTextContainer}>
              <View style={styles.textStart}>
                <Text style={styles.posText}>{this.getTrackLetter(track)}</Text>
                <Text style={styles.text}>{track.title}</Text>
              </View>
              <View style={styles.duratContainer}>
              <Text style={styles.duration}>{track.duration}</Text>
              </View>
            </View>
          )
        })}
      </View>

    )
  }
}

const styles = {
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-start',
    backgroundColor: 'transparent',
    marginTop: 35,
    alignSelf: 'center',
    flexDirection: 'column',
    marginBottom: 45
  },
  trackTitle: {
    fontSize: 14,
    color: '#9D9D9D'
  },
  textStart: {
    alignSelf: 'flex-start',
    flexDirection: 'row',
  },
  trackTextContainer: {
    borderBottomWidth: 1,
    borderColor: '#979797',
    height: 32,
    width: 327,
    flex: 1,
    flexDirection: 'row',
  },
  text: {
    color: '#ffffff',
    fontSize: 16,
    marginTop: 8,
    fontFamily: 'Lato-Regular',
    lineHeight: 18

  },
  posText: {
    color: '#9D9D9D',
    fontSize: 14,
    marginTop: 8,
    width: 30,
    marginRight: 5,
    fontFamily: 'Lato-Regular',
    lineHeight: 18


  },
  duratContainer: {
    flex: 1,
    alignItems: 'flex-end'
  },
  duration: {
    color: '#9D9D9D',
    flexDirection: 'row',
    marginTop: 10,
    fontSize: 14,
    fontFamily: 'Lato-Regular',
    lineHeight: 18

  }
}



export default TrackList
