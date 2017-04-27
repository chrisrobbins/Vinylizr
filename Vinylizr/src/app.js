import React, { Component } from 'react';
import { View, StatusBar } from 'react-native';
import firebase from 'firebase';
import { Spinner, Nav } from './components/common';
import LoginForm from './components/LoginForm';
import DeezerSearch from './components/DeezerSearch';




class App extends Component {
  state = { loggedIn: null };

  componentWillMount() {
    firebase.initializeApp({
    apiKey: 'AIzaSyAjlUS9NJoXLm_p-KU01lXcECpnI9AGM0U',
    authDomain: 'vinylizr-e5665.firebaseapp.com',
    databaseURL: 'https://vinylizr-e5665.firebaseio.com',
    projectId: 'vinylizr-e5665',
    storageBucket: 'vinylizr-e5665.appspot.com',
    messagingSenderId: '189276288673'
  });

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
        return <DeezerSearch />;
      case false:
        return <LoginForm />;
      default:
        return <Spinner size="large" />;
    }
  }

  render() {
    console.log(this.state);
    return (
      <View style={styles.container}>
      <StatusBar
       barStyle="light-content"
      />
        {this.renderContent()}
        <Nav />
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

export default App;
