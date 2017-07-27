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
import fire from '../components/fire.js';

class UserCollections extends Component {



  componentWillMount() {
    this.props.fetchCollection();

  }

  render() {



    return (
      <View style={styles.mainContainer}>
      <View style={styles.headerContainer}>
      <Header headerText={"Collection"} />
      </View>
      <View style={styles.contentContainer}>
      <ScrollView
        automaticallyAdjustContentInsets={false}
        contentContainerStyle={styles.textContainer}>

          {this.props.collection.collection.albums.map((album, key) => {
            let newRecord = album
            return (<Image style={styles.albumCovers} key={key} source={{ uri: newRecord }} />)
          })
          }

        </ScrollView>
        </View>
      </View>
    );
  }
}

const styles = {
  textContainer: {
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingBottom: 50,
  },
  contentContainer: {
    flex: 1,

  },
  mainContainer: {
    flex: 1,
  },
  albumCovers: {
    height: 124,
    width: 124,
    marginLeft: .5,
    marginRight: .5,
    marginTop: .5,
    marginBottom: .5
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
