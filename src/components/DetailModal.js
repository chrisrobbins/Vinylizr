
import React, { Component } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import Modal from 'react-native-modal';
import AlbumDetail from './AlbumDetail'

export default class DetailModal extends Component {
  state = {
    isModalVisible: false
  }

  componentWillMount() {
    console.log(this.props, "modal props bro!!");
  }

  _showModal = () => {
  this.setState({ isModalVisible: true })
}

  _hideModal = () => this.setState({ isModalVisible: false })

  render () {
    return (
      <View style={styles.detailModalContainer}>
        <TouchableOpacity onPress={this._showModal}>
          {this.props.children}
        </TouchableOpacity>
        <Modal
          isVisible={this.state.isModalVisible}
          animationIn={'zoomInUp'}
          animationOut={'zoomOutDown'}
          animationInTiming={800}
          onBackdropPress={() => this._hideModal()}
          >
          <AlbumDetail {...this.props} />
        </Modal>
      </View>
    )
  }

}

const styles = {
  detailModalContainer: {
    
  }
}
