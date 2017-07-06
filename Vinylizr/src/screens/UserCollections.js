import React, { Component } from 'react';
import {
  View,
  Text,
  Image
} from 'react-native';
import { Header } from '../components/common';
import { connect } from 'react-redux';
import * as actions from '../actions';
import { fetchAlbums } from '../actions/index';
import _ from 'lodash';
import fire from '../fire.js';

class UserCollections extends Component {
  constructor(props) {
    super(props);
    this.state = { albums: [] }
  }

  componentWillMount() {
    this.props.fetchAlbums();
    this.setState({albums: this.props.albums})
    console.log(this.state.albums);
  }


  renderCollection() {
    return _.map(this.props.albums, (album, key) => {
      let newRecord = album
      return <Image key={key} id={key} source={{uri:`${newRecord}`}} />
    });
      console.log("HELLOOOOO ", newRecord);
  }

  render() {
    return (

      <View style={styles.container}>
        <View style={styles.headerContainer}>
        <Header headerText={"Collection"} />
        </View>
        <View style={styles.textContainer}>
          {this.renderCollection()}
        </View>
      </View>
    );
  }
}

const styles = {
  textContainer: {
    flex: 1,
    justifyContent: 'center',
    alignSelf: 'center'
  },
  text: {
    color: '#fff'
  },
  container: {
    flex: 1
  },
  collectImage: {
    height: 85,
    width: 85
  },
  albumStyles: {
    color: '#fff',
    fontSize: 20,
    alignSelf: 'flex-end'
  }
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
