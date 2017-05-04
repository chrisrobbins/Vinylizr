import React, { Component } from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import firebase from 'firebase';
import {
  Button,
  Card,
  CardSection,
  InputCardSection,
  Input,
  Spinner,
  Logo
} from './common';


class LoginForm extends Component {
  state = { email: '', password: '', error: '', loading: false };

  onButtonPress() {
    const { email, password } = this.state;

    this.setState({ error: '', loading: true });

    firebase.auth().signInWithEmailAndPassword(email, password)
      .then(this.onLoginSuccess.bind(this))
      .catch(this.onLoginFail.bind(this));
  }

  onCreateButtonPress() {
    const { email, password } = this.state;

    this.setState({ error: '', loading: true });
        firebase.auth().createUserWithEmailAndPassword(email, password)
          .then(this.onLoginSuccess.bind(this))
          .catch(this.onLoginFail.bind(this));
  }

  onLoginFail() {
    this.setState({ error: 'Authentication Failed', loading: false });
  }

  onLoginSuccess() {
    this.setState({
      email: '',
      password: '',
      loading: false,
      error: ''
    });
  }

  forgotPassword() {
    firebase.auth().sendPasswordResetEmail(this.state.email)
    .then(this.emailSent.bind(this))
    .catch(this.emailNotSent.bind(this));
  }

  emailSent() {
    if (this.state.email) {
      this.setState({ error: 'Email Sent!', loading: false });
    }
  }

  emailNotSent() {
    if (!this.state.email) {
      this.setState({ error: 'Enter Email', loading: false });
  }
}

  renderButton() {
    if (this.state.loading) {
      return <Spinner size="small" />;
  }
    return (
      <Button onPress={this.onButtonPress.bind(this)}>
        Log in
      </Button>
    );
  }

  render() {
    return (
      <View style={styles.sectionContainer}>

      <View style={styles.containerLogo}>
        <Logo />
      </View>
      <Card>
        <InputCardSection>
          <Input
            placeholder="Email"
            value={this.state.email}
            onChangeText={email => this.setState({ email })}
          />
        </InputCardSection>

        <InputCardSection>

          <Input
            secureTextEntry
            placeholder="password"
            value={this.state.password}
            onChangeText={password => this.setState({ password })}
          />
          <TouchableOpacity
            onPress={this.forgotPassword.bind(this)} style={styles.forgotContainer}
          >
            <Text style={styles.forgotTextStyle}>
            Forgot?
            </Text>
          </TouchableOpacity>

        </InputCardSection>

        <Text style={styles.errorTextStyle}>
          {this.state.error}
        </Text>


        <CardSection style={styles.buttonSection}>
          {this.renderButton()}
        </CardSection>

      <CardSection>
        <TouchableOpacity style={styles.createButton} onPress={this.onCreateButtonPress.bind(this)}>
          <Text style={styles.textStyle}>
          Create Account
          </Text>
        </TouchableOpacity>
      </CardSection>


      </Card>
        </View>
    );
  }
}

const styles = {
  containerLogo: {
    flex: 1,
    justifyContent: 'center'
  },
  errorTextStyle: {
    fontSize: 20,
    alignSelf: 'center',
    color: 'red'
  },
  sectionContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    marginLeft: 20,
    marginRight: 20
  },
  textStyle: {
    alignSelf: 'center',
    color: 'white',
    fontSize: 16,
    paddingTop: 10,
    paddingBottom: 10
  },
  forgotTextStyle: {
    color: 'white',

  },
  forgotContainer: {
    marginTop: 17,
    paddingRight: 0
  },
  createButton: {
    flex: 1,
    alignSelf: 'stretch',
    backgroundColor: '#1A1A1A',
  }
};

export default LoginForm;
