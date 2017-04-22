import React, { Component } from 'react';
import { View } from 'react-native';
import firebase from 'firebase';
import { Spinner, SearchResults } from './components/common';
import LoginForm from './components/LoginForm';
import DiscogsSearch from './components/DiscogsSearch';


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
        return (
          <SearchResults />
        );
      case false:
        return <LoginForm />;
      default:
        return <Spinner size="large" />;
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <DiscogsSearch />
        {this.renderContent()}
      </View>
    );
  }
}

const styles = {
  container: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: '#000000'
  }
};

export default App;
