import React, { Component } from 'react';
import {
  View,
  Text,
  Image,
  ScrollView
} from 'react-native';
import { Header } from '../components/common';
import { connect } from 'react-redux';
import { fetchWantlist } from '../actions/wantlist-action.js';
import _ from 'lodash';
import fire from '../components/fire.js';

class Wantlist extends Component {



  componentWillMount() {
    this.props.fetchWantlist();
  }


  render() {
    return (
      <View style={styles.wantlistContainer}>
      <View style={styles.headerContainer}>
      <Header headerText={"Wantlist"} />
      </View>
        <ScrollView
          automaticallyAdjustContentInsets={false}
          contentContainerStyle={styles.textContainer}>
          {this.props.wantlist.wantlist.albums.map((album, key) => {
            // console.log("WANTLIST: ", album)
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
  wantlistContainer: {
    flex: 1
  },
  textContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-start',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  albumCovers: {
    height: 85,
    width: 85,
    marginLeft: 1,
    marginRight: 1,
    marginTop: 1,
    marginBottom: 1,
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
        fetchWantlist: () => {
            dispatch(fetchWantlist())
        },

      }
    }



export default connect(mapStateToProps, mapDispatchToProps)(Wantlist);
