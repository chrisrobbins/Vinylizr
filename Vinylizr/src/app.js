import React, { Component } from 'react';
import { View, StatusBar } from 'react-native';
import * as firebase from "firebase";
import { Spinner } from './components/common';
import Nav from './Nav';
import LoginForm from './components/LoginForm';
import * as actions from './actions';
import { connect } from 'react-redux';
import fire from './fire.js';



class App extends Component {
  state = { loggedIn: null };

componentWillMount() {
    fire
    firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      this.setState({ loggedIn: true });
    } else {
      this.setState({ loggedIn: false });
    }
  });
  }

  renderContent() {
    switch (this.state.loggedIn) {
      case true:
        return <Nav />;
      case false:
        return <LoginForm />;
      default:
        return <Spinner size="large" />;
    }
  }

  render() {
    return (

    <View style={styles.container}>
      <StatusBar
       barStyle="light-content"
      />
      {this.renderContent()}
    </View>

    );
  }
}

const styles = {
  container: {
    flex: 1,
    backgroundColor: '#000000'
  },
  status: {
    backgroundColor: '#1a1a1a'
  }
};


function mapStateToProps(state) {
  return {
      ...state
   };
}

export default connect(mapStateToProps, actions)(App)
