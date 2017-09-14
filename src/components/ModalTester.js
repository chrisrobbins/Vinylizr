
import React, { Component } from 'react'
import { Text, TouchableOpacity, View } from 'react-native'
import Modal from 'react-native-modal'

export default class ModalTester extends Component {
  state = {
    isModalVisible: false
  }

  _showModal = (berg) => {
  this.setState({ isModalVisible: true })
  console.log(this.state);
  setTimeout(() => this._hideModal(), 1500);
  console.log(this.state);
}

  _hideModal = () => this.setState({ isModalVisible: false })

  render () {
    return (
      <View>
        <TouchableOpacity onPress={this._showModal}>
          {this.props.children}
        </TouchableOpacity>
        <Modal isVisible={this.state.isModalVisible}>
          <View>
            <Text>Hello!</Text>
          </View>
        </Modal>
      </View>
    )
  }

}
