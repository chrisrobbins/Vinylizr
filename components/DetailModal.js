import React, { Component } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import Modal from "react-native-modal";
import AlbumDetail from "../screens/AlbumDetail";

export default class DetailModal extends Component {
  state = {
    isModalVisible: false
  };

  static navigationOptions = {
    tabBarIcon: ({ tintColor }) =>
      tintColor == "#e91e63" ? (
        <Image source={require("../assets/images/search_select.png")} />
      ) : (
        <Image source={require("../assets/images/search.png")} />
      )
  };

  componentWillMount() {
    console.log(this.props, "modal props bro!!");
  }

  _showModal = () => {
    this.setState({ isModalVisible: true });
  };

  _hideModal = () => this.setState({ isModalVisible: false });

  render() {
    return (
      <View style={styles.detailModalContainer}>
        <TouchableOpacity onPress={this._showModal}>
          {this.props.children}
        </TouchableOpacity>
        <Modal
          isVisible={this.state.isModalVisible}
          animationIn={"zoomInUp"}
          animationOut={"zoomOutDown"}
          animationInTiming={800}
          onBackdropPress={() => this._hideModal()}
        >
          <AlbumDetail {...this.props} />
        </Modal>
      </View>
    );
  }
}

const styles = {
  detailModalContainer: {}
};
