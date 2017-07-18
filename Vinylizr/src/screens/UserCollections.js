import React, { Component } from 'react';
import {
  View,
  Text,
  Image,
  ScrollView
} from 'react-native';
import { Header } from '../components/common';
import { connect } from 'react-redux';
import { fetchCollection } from '../actions/collection-action.js';
import _ from 'lodash';
import fire from '../fire.js';

class UserCollections extends Component {
state = { id: '' }

  componentWillMount() {
    this.props.fetchCollection();

  }

componentDidMount() {
  console.log(this.props);
}

  render() {
    return (
      <View>
      <View style={styles.headerContainer}>
      <Header headerText={"Collection"} />
      </View>
        <ScrollView contentContainerStyle={styles.textContainer}>
          {this.props.collection.collection.albums.map((album, key) => {
            console.log("COLLECTION: ", album)
            let newRecord = album
            return (<Image style={styles.albumCovers} key={key} source={{ uri: newRecord }} />)
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
    justifyContent: 'center',
    alignItems: 'flex-start',
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: -17,
    paddingBottom: 30
  },
  albumCovers: {
    height: 85,
    width: 85,
    marginLeft: 1,
    marginRight: 1,
    marginTop: 1,
    marginBottom: 1
  }
};

const mapStateToProps = (state) => {
    return {
      ...state,
    }
}
// for click events so that dispatches can happen
const mapDispatchToProps = (dispatch) => {
    return {
        fetchCollection: () => {
            dispatch(fetchCollection())
        },

      }
    }



export default connect(mapStateToProps, mapDispatchToProps)(UserCollections);
