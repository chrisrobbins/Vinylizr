import React, { Component } from 'react';
import { Text, View, TouchableOpacity, TextInput, Keyboard, KeyboardAvoidingView, ScrollView } from 'react-native';
import fire from './fire';
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

    fire.auth().signInWithEmailAndPassword(email, password)
      .then(this.onLoginSuccess.bind(this))
      .catch((error) => {
// Handle Errors here.
let errorCode = error.code;
let errorMessage = error.message;
if (errorCode) {
this.setState({ error: error.message, loading: false });
};
})
  }

  onCreateButtonPress() {
    const { email, password } = this.state;

    this.setState({ error: '', loading: true });
        fire.auth().createUserWithEmailAndPassword(email, password)
          .then(this.onLoginSuccess.bind(this))

}

//   onLoginFail() {
//     .catch(function(error) {
//   // Handle Errors here.
//   var errorCode = error.code;
//   var errorMessage = error.message;
//   if (errorCode === 'auth/wrong-password') {
//     alert('Wrong password.');
//   } else {
//     alert(errorMessage);
//   }
//   console.log(error);
// });
//     this.setState({ error: 'Authentication Failed', loading: false });
//   }

  onLoginSuccess() {
    this.setState({
      email: '',
      password: '',
      loading: false,
      error: ''
    });
  }

  forgotPassword() {
    fire.auth().sendPasswordResetEmail(this.state.email)
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
      <Button
        style={styles.buttonSection} onPress={this.onButtonPress.bind(this)}>
        Log in
      </Button>
    );
  }

  render() {
    return (
      <View
        onCLick={() => Keyboard.dismiss} 
        style={styles.sectionContainer}>

      <View style={styles.containerLogo}>
        <Logo />
      </View>
      <View style={styles.form}>
        <KeyboardAvoidingView
      behavior="padding"
      style={styles.textInputContainerStyle}
    >
      <ScrollView scrollEnabled={false}>
          <TextInput
            autoCapitalize={"none"}
            placeholderTextColor={"white"}
            style={styles.TextInputStyle}
            multiline={true}
            numberOfLines={1}
            placeholder={"Email"}
            value={this.state.email}
            onChangeText={email => this.setState({ email })}
            onSubmitEditing={Keyboard.dismiss}
          />



          <TextInput
            autoCapitalize={"none"}
            style={styles.TextInputStyle}
            placeholderTextColor={"white"}
            numberOfLines={1}
            secureTextEntry={true}
            placeholder={"password"}
            value={this.state.password}
            multiline={true}
            onChangeText={password => this.setState({ password })}
            onSubmitEditing={Keyboard.dismiss}

          />

          <TouchableOpacity
            onPress={this.forgotPassword.bind(this)} style={styles.forgotContainer}
          >
            <Text style={styles.forgotTextStyle}>
            Forgot?
            </Text>
          </TouchableOpacity>


        <Text style={styles.errorTextStyle}>
          {this.state.error}
        </Text>


        <CardSection>
        {this.renderButton()}
        </CardSection>

        <TouchableOpacity style={styles.createButton} onPress={this.onCreateButtonPress.bind(this)}>
          <Text style={styles.textStyle}>
          Create Account
          </Text>
        </TouchableOpacity>
        <View style={{ height: 60 }} />
        </ScrollView>
    </KeyboardAvoidingView>
        </View>
      </View>
    );
  }
}

const styles = {
  containerLogo: {
    flex: 1,
    justifyContent: 'center',
    flexDirection: 'column'
  },
  form: {
    flex: 1,
  },

  errorTextStyle: {
    fontSize: 20,
    alignSelf: 'center',
    color: 'red'
  },
  sectionContainer: {
    flex: 1,
    marginLeft: 20,
    marginRight: 20,
    flexDirection: 'column',
    marginTop: 45,


  },
  textStyle: {
    alignSelf: 'center',
    color: 'white',
    fontSize: 16,
  },
  forgotTextStyle: {
    color: 'white',
    alignSelf: 'flex-end',
    bottom: 25

  },
  createButton: {
    flex:1,
    alignSelf: 'stretch',
    backgroundColor: 'transparent',
    height: 20,
  },
  buttonSection: {
    marginTop: 25
  },
  TextInputStyle: {
    color: '#fff',
    fontSize: 18,
    borderBottomWidth: 1,
    borderBottomColor: '#fff',
    paddingBottom: 7,
    height: 40,
    marginTop: 40
  },
  textInputContainerStyle: {
    flexDirection: 'column',

  }
  };

export default LoginForm;
