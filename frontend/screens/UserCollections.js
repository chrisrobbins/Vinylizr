// SECTION LIST COMPONENT
import React, { Component } from 'react';
import {
  View,
  SectionList,
  ActivityIndicator,
  Text,
  AsyncStorage,
} from 'react-native';
import { connect } from 'react-redux';
import { isEqual } from 'lodash';
import { getReleases } from '#modules/Collection/actions';
import { Header, SectionFlatList } from '#common/';
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

  shouldComponentUpdate(nextProps, nextState) {
    if (!isEqual(this.props.releases, nextProps.releases)) {
      return true;
    }
    return false;
  }

  getUserCollection = async () => {
    console.log('GETTING USER COLLECTION');
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

  _renderSections = ({ section }) => (
    <SectionFlatList
      {...this.props}
      section={section}
      key={section.sectionId}
    />
  );

  render() {
    console.log('RENDERING SECTION LIST');
    const { releases } = this.props;

    return (
      <View style={styles.mainContainer}>
        <View style={styles.headerContainer}>
          <Header headerText={'Collection'} />
        </View>
        <View style={styles.contentContainer}>
          <SectionList
            sections={releases}
            bounces={false}
            renderItem={this._renderSections}
            renderSectionHeader={({ section: { title } }) => (
              <Text style={{ fontWeight: 'bold', color: '#fff' }}>{title}</Text>
            )}
            keyExtractor={this._sectionKeyExtractor}
            refreshing={this.state.refreshing}
            onRefresh={this.handleRefresh}
            onEndReached={this.handleLoadMore}
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

mapStateToProps = state => {
  console.log('MAP STATE TO PROPAS STATE', state);
  return {
    releases: state.UserCollection.releases,
    isFetching: state.UserCollection.isFetching,
  };
};

export default connect(mapStateToProps)(UserCollections);
