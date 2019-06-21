// SECTION LIST COMPONENT
import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';
import { UserData } from '#src/contexts';
import { SectionGrid } from 'react-native-super-grid';
import { getReleases } from '#modules/Collection/actions';
import { Header, RecordItem } from '#common/';

class UserCollections extends Component {
  static navigationOptions = {
    header: null,
  };
  state = {
    refreshing: false,
    page: 1,
    isLoading: false,
  };

  componentDidMount() {
    this.getUserCollection();
  }

  getUserCollection = async () => {
    const { token, tokenSecret, user } = await UserData();
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

  render() {
    const {
      releases,
      navigation,
      screenProps: {
        user: { userMeta },
      },
    } = this.props;
    return (
      <View style={styles.mainContainer}>
        <View style={styles.headerContainer}>
          <Header headerText={'Collection'} />
        </View>
        <View style={styles.contentContainer}>
          <SectionGrid
            itemDimension={90}
            sections={releases}
            style={{ flex: 1 }}
            renderItem={({ item, section, index }) => (
              <RecordItem
                item={item}
                navigation={navigation}
                userMeta={userMeta}
                inCollection={true}
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
