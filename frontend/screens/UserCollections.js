import React, { Component } from 'react';
import {
  View,
  SectionList,
  ActivityIndicator,
  Text,
  AsyncStorage,
} from 'react-native';
import { Header, SectionFlatList } from '#common/';
import vinylAxios from 'axios';
class UserCollections extends Component {
  static navigationOptions = {
    header: null,
  };
  state = { records: [], refreshing: false, userData: {}, page: 1 };

  async componentDidMount() {
    await this.getUserCollection();
  }

  getUserCollection = async () => {
    const token = await AsyncStorage.getItem('access_token');
    const tokenSecret = await AsyncStorage.getItem('access_token');
    const user = await AsyncStorage.getItem('userMeta');
    const userMeta = JSON.parse(user);
    const { username } = userMeta;
    const folder = 0;
    const accessData = {
      token,
      tokenSecret,
    };

    const url = `http://localhost:3000/collection?folder=${folder}&user=${username}`;
    vinylAxios
      .post(url, accessData)
      .then(response => {
        const { releases } = response.data;
        const vinylData = releases.reduce((arrangedData, data) => {
          // c[0] should be the first letter of an entry
          let record = data.basic_information.artists[0].name[0].toLocaleUpperCase();

          // either push to an existing dict entry or create one
          if (arrangedData[record]) arrangedData[record].push(data);
          else arrangedData[record] = [data];

          return arrangedData;
        }, {});

        const collectionSections = Object.entries(vinylData).map(vinyl => {
          return {
            title: vinyl[0],
            data: vinyl[1],
          };
        });
        this.setState({ records: collectionSections });
      })
      .catch(err => console.log('ERROR', err));
  };

  handleRefresh = () => {
    this.setState(
      {
        page: 1,
        seed: this.state.seed + 1,
        refreshing: true,
      },
      () => {
        this.getUserCollection();
      }
    );
  };
  handleLoadMore = () => {
    this.setState(
      {
        page: this.state.page + 1,
      },
      () => {
        this.getUserCollection();
      }
    );
  };
  renderFooter = () => {
    if (!this.state.loading) return null;
    return (
      <View
        style={{
          paddingVertical: 20,
          borderTopWidth: 1,
          borderColor: '#CED0CE',
        }}
      >
        <ActivityIndicator animating size="large" />
      </View>
    );
  };

  _keyExtractor = (item, index) => index;
  _sectionKeyExtractor = (section, index) => index;

  render() {
    const { records } = this.state;

    return (
      <View style={styles.mainContainer}>
        <View style={styles.headerContainer}>
          <Header headerText={'Collection'} />
        </View>
        <View style={styles.contentContainer}>
          <SectionList
            sections={records}
            windowSize={15}
            renderItem={({ section }) => (
              <SectionFlatList
                {...this.props}
                section={section}
                keyExtractor={this._keyExtractor}
              />
            )}
            renderSectionHeader={({ section: { title } }) => (
              <Text style={{ fontWeight: 'bold', color: '#fff' }}>{title}</Text>
            )}
            keyExtractor={this._sectionKeyExtractor}
            refreshing={this.state.refreshing}
            onRefresh={this.handleRefresh}
            onEndReached={this.handleLoadMore}
            onEndReachedThreshold={40}
          />
        </View>
      </View>
    );
  }
}

const styles = {
  textContainer: {
    paddingBottom: 50,
  },
  contentContainer: {
    flex: 1,
    backgroundColor: '#000',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  contentContainerStyle: {
    flexDirection: 'column',
  },
  mainContainer: {
    flex: 1,
  },
};

export default UserCollections;
