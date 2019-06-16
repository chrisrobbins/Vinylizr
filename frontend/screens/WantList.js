// SECTION LIST COMPONENT
import React, { Component } from 'react';
import { View, Text, AsyncStorage } from 'react-native';
import { connect } from 'react-redux';
import { SectionGrid } from 'react-native-super-grid';
import { getReleases } from '#modules/Wantlist/actions';
import { Header, RecordItem } from '#common/';
class UserWantlist extends Component {
  static navigationOptions = {
    header: null,
  };
  state = {
    refreshing: false,
    page: 1,
    isLoading: false,
  };

  componentDidMount() {
    this.getUserWantlist();
  }

  getUserWantlist = async release => {
    const token = await AsyncStorage.getItem('access_token');
    const tokenSecret = await AsyncStorage.getItem('access_secret');
    const user = await AsyncStorage.getItem('userMeta');
    const userMeta = JSON.parse(user);
    const { username } = userMeta;
    const { page } = this.state;
    const accessData = {
      token,
      tokenSecret,
    };
    try {
      await this.props.dispatch(
        getReleases(accessData, username, release, page)
      );
    } catch (error) {
      console.log('ERROR', error);
    }
  };

  removeFromWantlist = () => {
    console.log('remove');
  };

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
          <Header headerText={'Wantlist'} />
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
                removeFromWantlist={this.removeFromWantlist}
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
    releases: state.UserWantlist.releases,
    isFetching: state.UserWantlist.isFetching,
  };
};

export default connect(mapStateToProps)(UserWantlist);
