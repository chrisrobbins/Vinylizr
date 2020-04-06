// SECTION LIST COMPONENT
import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { View, Text } from 'react-native';
import { SectionGrid } from 'react-native-super-grid';
import { Header, RecordItem, Spinner } from '#common';
import { GET_COLLECTION } from './resolvers';

export default function UserCollections({
  screenProps: {
    accessData: { token = '', tokenSecret = '' },
    username = '',
  },
  navigation,
}) {
  const [page, setPage] = React.useState('1');

  const folder = '1';
  const { loading: collectionLoading, error, data } = useQuery(GET_COLLECTION, {
    variables: { username, token, tokenSecret, page, folder },
  });
  if (collectionLoading) {
    return <Spinner />;
  }
  if (error) {
    console.error('COLLECTION QUERY ERROR', error);
  }
  if (!data || !data.collection) {
    console.error('NO DATA');
    return (
      <View>
        <Text>{error.message}</Text>
      </View>
    );
  }
  return (
    <View style={styles.mainContainer}>
      <View style={styles.headerContainer}>
        <Header headerText={'Collection'} />
      </View>
      <View style={styles.contentContainer}>
        <SectionGrid
          itemDimension={110}
          spacing={2}
          sections={data.collection}
          style={{ flex: 1 }}
          renderItem={({ item, section, index }) => (
            <RecordItem
              item={item}
              navigation={navigation}
              releaseId={item.basic_information.id}
              username={username}
              inCollection={true}
              routeBack={'UserCollections'}
              isFetching={collectionLoading}
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

UserCollections.navigationOptions = {
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
