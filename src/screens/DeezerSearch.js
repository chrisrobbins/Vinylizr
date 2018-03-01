import React, { Component } from 'react'
import axios from 'axios'

import {
   Button,
   BarCode,
   ClearText
} from '../components/common'

import SearchResultItem from '../components/SearchResultItem'


import _ from 'lodash'

import {
  View,
  Text,
  TextInput,
  FlatList,
  ActivityIndicator
} from 'react-native'

class DeezerSearch extends Component {
  constructor(props) {
    super(props)
    this.searchDeezer = this.searchDeezer.bind(this)

    this.state = {
      text: '',
      loading: false,
      albums: [],
      page: 1,
      seed: 1,
      error: null,
      refreshing: false,
    }
    this.searchDeezer = _.debounce(this.searchDeezer, 215)
  }


  searchDeezer = () => {
    const { page } = this.state
    const apiSearch = this.state.newText
    const url = `https://api.deezer.com/search/album/?q=${apiSearch}&index=0&limit=40&output=json`
    this.setState({ loading: true })

    axios.get(url)
      .then(res => {
        this.setState({
          albums:page === 1 ? res.data.data : [...this.state.albums, ...res.data.data],
          error: res.error || null,
          loading: false,
          refreshing: false
        })
        console.log(res.data.data)
      })
      .catch(error => {
        this.setState({ error, loading: false })
      })
      console.log(this.state)
  }




 // searchDeezer() {
 //   let apiSearch = this.state.newText
 //   axios.get(
 //     `https://api.deezer.com/search/album/?q=${apiSearch}&index=0&limit=20&output=json`
 //   )
 //   .then((response) => this.setState({ albums: response.data.data }))
 // }

  //  renderAlbums(album) {
  //      <SearchResultItem album={album} />
  //  }



   clearTextInput() {
     this._textInput.setNativeProps({ text: '' })
     this.setState({ text: '', albums: [] })
   }
   renderInputButton() {
     return <ClearText onPress={this.clearTextInput.bind(this)} />
   }

  //  handleRefresh = () => {
  //    this.setState(
  //      {
  //        page: 1,
  //        seed: this.state.seed + 1,
  //        refreshing: true
  //      },
  //      () => {
  //        this.searchDeezer()
  //      }
  //    )
  //  }

   handleLoadMore = () => {
     this.setState(
       {
         page: this.state.page + 1
       },
       () => {
         this.searchDeezer()
       }
     )
   }

   renderFooter = () => {
     if (!this.state.loading) return null
     return (
       <View
         style={{
           paddingVertical: 20,
           borderTopWidth: 1,
           borderColor: "#CED0CE"
         }}
       >
         <ActivityIndicator animating size="large" />
       </View>
     )
   }

   _keyExtractor = (item) => item.id

   _renderItem = ({item}) => (
     <SearchResultItem
      album={item}
      key={item.id}
    />
  )
//   arr.forEach(function(item) {
//     if (names.indexOf(item) === -1) {
//       names.push(item)
//     }
// })
  render() {
    console.log(this.state.albums, 'items')
    return (
      <View style={styles.container}>

        <View style={styles.inputStyleContainer}>


        <TextInput

          ref={text => this._textInput = text}

          style={styles.inputStyle}

          autoFocus={true}

          type="search"

          value={this.state.newText}

          onChangeText={this.searchDeezer}

          onChange={(event) => this.setState({ newText: event.nativeEvent.text })}

          placeholder="Artist or Album"

          placeholderTextColor="#D9D9D9"

          selectionColor={'#F42E4A'}

        />

      </View>

      <View style={styles.inputContainer}>

        {this.renderInputButton()}

      </View>
        <FlatList
          data={this.state.albums}
          renderItem={this._renderItem}
          keyExtractor={this._keyExtractor}
          ListFooterComponent={this.renderFooter}
          refreshing={this.state.refreshing}
          onEndReached={this.handleLoadMore}
          onEndReachedThreshold={10}
          style={styles.renderAlbums}
          scrollEnabled={!this.props.isSwiping}
        />

    </View>
    )
  }
}

const styles = {
  renderAlbums: {
    paddingBottom: 80,
  },
  inputContainer: {
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    height: 5,
    marginRight: 10,
    marginBottom: 0,
  },
  container: {
    flex: 1
  },

  inputStyleContainer: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    marginTop: 25,
    height: 40,
    borderBottomWidth: 1,
    borderBottomColor: "#ffffff",
    marginBottom: 0
  },
  inputStyle: {
    color: '#fff',
    fontSize: 18,
    lineHeight: 23,
    backgroundColor: '#000',
    justifyContent: 'flex-start',
    flex: 1,
    paddingLeft: 7,
    paddingRight: 7,
    paddingBottom: 0,
    marginBottom: 0
  },
}

export default DeezerSearch
