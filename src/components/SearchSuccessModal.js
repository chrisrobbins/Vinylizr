
import React, { Component } from 'react'
import { Text, TouchableOpacity, View, Image } from 'react-native'
import Modal from 'react-native-modal'

export default class SearchSuccessModal extends Component {


renderText() {
  if(this.props.leftSwiped === true) {
    return <Text style={styles.text}>Added to collection!</Text>
  }
  if(this.props.rightSwiped === true) {
    return <Text style={styles.text}>Added to wantlist!</Text>
  }
}

  render () {
    return (
      <View style={styles.mainContainer}>
        <View style={styles.mainContainer}>{this.props.children}</View>
        <View style={styles.modalContainer}>
        <Modal
          style={styles.modal}
          isVisible={this.props.isModalVisible}
          backDropOpacity={0.30}
          animationIn={'zoomIn'}
          animationOut={'fadeOutDown'}
          animationInTiming={500}
          >

          <View style={styles.textBox}>
            <Image
              style={styles.imageStyles} source={require('../img/modal-check.png')} />
            {this.renderText()}
          </View>
        </Modal>
        </View>
      </View>
    )
  }

}

const styles = {
  mainContainer: {
    flex:1,
  },
  modalContainer: {
    maxHeight: 100,
    width: 100,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    borderRadius: 4
  },
  imageStyles: {
    alignSelf: 'center',
    marginBottom: 5,
  },
  modal: {
    maxHeight: 150,
    width: 150,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    backgroundColor: 'rgba(0,0,0,.4)',
    top: 250
  },
  textBox: {

  },
  text: {
    color: '#fff',
    fontSize: 20
  }
};
