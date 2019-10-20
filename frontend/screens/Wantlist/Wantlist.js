// SECTION LIST COMPONENT
import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { View, Text } from 'react-native';
import { SectionGrid } from 'react-native-super-grid';
import { Header, RecordItem, Spinner } from '#common';
import { GET_WANTLIST } from './resolvers';

export default function UserWantlist(props) {
  const [page, setPage] = React.useState('1');
  const {
    accessData: { token = '', tokenSecret = '' },
    userMeta = {},
  } = props.screenProps.user;
  const { username = '' } = userMeta;

  const { navigation, isFetching } = props;
  const { loading, error, data } = useQuery(GET_WANTLIST, {
    variables: { token, tokenSecret, username, folder: '1', page },
  });
  if (loading) {
    return <Spinner />;
  }
  if (error) {
    console.error('WANTLIST QUERY ERROR', error);
    return (
      <View>
        <Text>{error.message}</Text>
      </View>
    );
  }
  return (
    <View style={styles.mainContainer}>
      <View style={styles.headerContainer}>
        <Header headerText={'Wantlist'} />
      </View>
      <View style={styles.contentContainer}>
        <SectionGrid
          itemDimension={90}
          sections={data.wantlist}
          style={{ flex: 1 }}
          renderItem={({ item, section, index }) => (
            <RecordItem
              item={item}
              navigation={navigation}
              userMeta={userMeta}
              inCollection={true}
              routeBack={'App'}
              isFetching={loading}
            />
          )}
          renderSectionHeader={({ section }) => (
            <Text
              style={{
                fontSize: 16,
                color: '#fff',
                padding: 10,
                fontWeight: 'bold',
                marginLeft: 6,
                backgroundColor: 'rgba(0,0,0,.7)',
              }}
            >
              {section.title}
            </Text>
          )}
        />
      </View>
    </View>
  );
}

UserWantlist.navigationOptions = {
  header: null,
};

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
