// SECTION LIST COMPONENT
import React, { Component } from 'react';
import { View, ActivityIndicator, Text, AsyncStorage } from 'react-native';
import { connect } from 'react-redux';
import { SectionGrid } from 'react-native-super-grid';
import { getReleases } from '#modules/Collection/actions';
import { Header, RecordItem } from '#common/';
class UserCollections extends Component {
  static navigationOptions = {
    header: null,
  };
  state = {
    records: [],
    refreshing: false,
    userData: {},
    page: 1,
    isLoading: false,
  };

  componentDidMount() {
    this.getUserCollection();
  }

  getUserCollection = async () => {
    const token = await AsyncStorage.getItem('access_token');
    const tokenSecret = await AsyncStorage.getItem('access_token');
    const user = await AsyncStorage.getItem('userMeta');
    const userMeta = JSON.parse(user);
    const { username } = userMeta;
    const { page } = this.state;
    const folder = 0;
    const accessData = {
      token,
      tokenSecret,
    };
    try {
      await this.props.dispatch(
        getReleases(accessData, username, folder, page)
      );
    } catch (error) {
      console.log('ERROR', error);
    }
  };

  handleRefresh = () => {
    console.log('REFRESHING');
    this.setState(
      {
        page: 1,
        refreshing: true,
      },
      () => {
        this.getUserCollection();
        this.setState({ refeshing: false });
      }
    );
  };
  handleLoadMore = () => {
    console.log('END REACHED');
    const { releases, isFetching } = this.props;
    if (!isFetching && releases.length > 0) {
      this.setState(
        {
          page: this.state.page + 1,
        },
        () => {
          this.getUserCollection();
        }
      );
    } else {
      //console.log('waiting end list');
      this.waitingForMoreData();
    }
  };

  waitingForMoreData() {
    setTimeout(() => {
      if (this.state.loading === false && this.props.releases.length > 0) {
        //console.log('getting after waiting end list');

        this.handleLoadMore();
      } else {
        //console.log('waiting again end list');
        this.waitingForMoreData();
      }
    }, 15000);
  }

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

  _sectionKeyExtractor = (section, index) => 'S' + index.toString();

  render() {
    const {
      releases,
      navigation,
      screenProps: {
        user: { userMeta },
      },
    } = this.props;
    console.log(this.props);
    return (
      <View style={styles.mainContainer}>
        <View style={styles.headerContainer}>
          <Header headerText={'Collection'} />
        </View>
        <View style={styles.contentContainer}>
          <SectionGrid
            sections={releases}
            style={{ flex: 1 }}
            renderItem={({ item, section, index }) => (
              <RecordItem
                item={item}
                navigation={navigation}
                userMeta={userMeta}
              />
            )}
            renderSectionHeader={({ section }) => (
              <Text style={{ fontSize: 16, color: '#fff', padding: 10 }}>
                {section.title}
              </Text>
            )}
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
  },
  mainContainer: {
    flex: 1,
  },
};

mapStateToProps = state => {
  return {
    releases: state.UserCollection.releases,
    isFetching: state.UserCollection.isFetching,
  };
};

export default connect(mapStateToProps)(UserCollections);
