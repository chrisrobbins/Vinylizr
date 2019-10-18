// SECTION LIST COMPONENT
import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import { View, Text } from 'react-native';
import { SectionGrid } from 'react-native-super-grid';
import { Header, RecordItem, Spinner } from '#common/';

export const GET_COLLECTION = gql`
  query sections(
    $username: String!
    $token: String!
    $tokenSecret: String!
    $page: String
    $folder: String
  ) {
    sections(
      username: $username
      token: $token
      tokenSecret: $tokenSecret
      page: $page
      folder: $folder
    ) {
      title
      data {
        basic_information {
          cover_image
        }
      }
    }
  }
`;

export default function UserCollections(props) {
  const [page, setPage] = React.useState('1');
  const {
    accessData: { token = '', tokenSecret = '' },
    userMeta = {},
  } = props.screenProps.user;
  const { username = '' } = userMeta;

  const { navigation, isFetching } = props;
  const { loading, error, data } = useQuery(GET_COLLECTION, {
    variables: { token, tokenSecret, username, folder: '1', page },
  });
  if (loading) {
    return <Spinner />;
  }
  if (error) {
    console.error('COLLECTION QUERY ERROR', error);
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
          itemDimension={90}
          sections={data.sections}
          style={{ flex: 1 }}
          renderItem={({ item, section, index }) => (
            <RecordItem
              item={item}
              navigation={navigation}
              userMeta={userMeta}
              inCollection={true}
              routeBack={'UserCollections'}
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
