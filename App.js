import React, { Component } from "react";
import { View, StatusBar } from "react-native";
import AppNavigator from "./src/navigation/AppNavigator";
import { Font } from "expo";

console.disableYellowBox = true;

class App extends Component {
  componentDidMount() {
    Font.loadAsync({
      Lato: require("./assets/fonts/Lato-Black.ttf"),
      "Lato-Regular": require("./assets/fonts/Lato-Regular.ttf"),
      "Lato-Bold": require("./assets/fonts/Lato-Bold.ttf"),
      "Lato-Light": require("./assets/fonts/Lato-Light.ttf")
    });
  }
  render() {
    return (
      <View style={styles.container}>
        <StatusBar barStyle="light-content" />
        <AppNavigator />
      </View>
    );
  }
}

const styles = {
  container: {
    flex: 1
  }
};

export default App;
