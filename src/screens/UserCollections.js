import React, { Component } from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
} from 'react-native';
import { Header } from '../components/common';
import { connect } from 'react-redux';
import { fetchCollection } from '../actions/collection-action.js';
import _ from 'lodash';
import fire from '../components/fire.js';
import ModalTester from '../components/ModalTester';

class UserCollections extends Component {
  static navigationOptions = {

    tabBarIcon: ({ tintColor }) => (tintColor == '#e91e63' ?
    <Image
      source={require('../img/collection_select.png')}
      style={[{tintColor: '#F42E4A'}]}
    />
    :
    <Image
      source={require('../img/collectionIcon.png')}
      style={[{tintColor: 'grey'}]}
    />
  ),
};


  componentDidMount() {
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

          {this.props.collection.collection.albums.map((album) => {
            let newRecord = album
            return (
              <ModalTester>
              <Image
                style={styles.albumCovers}
                key={newRecord.key}
                source={{ uri: newRecord.value }}
              />
              </ModalTester>
            )
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
