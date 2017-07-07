import React, { Component } from 'react';
import {
  View,
  Text,
  Image,
  ScrollView
} from 'react-native';
import { Header } from '../components/common';
import { connect } from 'react-redux';
import * as actions from '../actions';
import { fetchAlbums } from '../actions/index';
import _ from 'lodash';
import fire from '../fire.js';

class UserCollections extends Component {


  componentWillMount() {
    this.props.fetchAlbums();
  }
componentDidMount() {
  console.log(this.props.albums);
}

  renderCollection() {
    return
  }

  render() {
    return (
      <View>
      <View style={styles.headerContainer}>
      <Header headerText={"Collection"} />
      </View>


        <ScrollView contentContainerStyle={styles.textContainer}>
          {this.props.albums.albums.map((album, key) => {
            console.log(this.props.albums)
            let newRecord = album
            return (<Image style={styles.albumCovers} key={key} id={key} source={{ uri: newRecord }} />)
          })
          }
        </ScrollView>
      </View>
    );
  }
}

const styles = {
  textContainer: {
    flex: 1,
    justifyContent: 'flex-start',
    alignSelf: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 10,
    marginLeft: 5,
    marginRight: 5
  },
  albumCovers: {
    height: 85,
    width: 85,
    marginLeft: 1,
    marginRight: 1,
    marginTop: 1,
    marginBottom: 1
  },
  container: {
    flex: 1
  },
};

const mapStateToProps = (state) => {
    return {
      ...state
    }
}
// for click events so that dispatches can happen
const mapDispatchToProps = (dispatch) => {
    return {
        fetchAlbums: () => {
            dispatch(fetchAlbums())
        },
      }
    }



export default connect(mapStateToProps, mapDispatchToProps)(UserCollections);
