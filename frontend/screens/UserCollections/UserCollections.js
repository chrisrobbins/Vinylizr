// SECTION LIST COMPONENT
import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { View, Text } from 'react-native';
import { SectionGrid } from 'react-native-super-grid';
import { Header, RecordItem, Spinner } from '#common';
import { GET_COLLECTION } from './resolvers';

export default function UserCollections(props) {
  const [page, setPage] = React.useState('1');
  const {
    accessData: { token = '', tokenSecret = '' },
    userMeta = {},
  } = props.screenProps.user;
  const { username = '' } = userMeta;
  const folder = '1';
  const { navigation, isFetching } = props;
  const { loading, error, data } = useQuery(GET_COLLECTION, {
    variables: { username, token, tokenSecret, page, folder },
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
          itemDimension={90}
          sections={data.collection}
          style={{ flex: 1 }}
          renderItem={({ item, section, index }) => (
            <RecordItem
              item={item}
              navigation={navigation}
              releaseId={item.basic_information.id}
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

// const Object {
//   "__typename": "CollectionSections",
//   "data": Array [
//     Object {
//       "__typename": "Release",
//       "basic_information": Object {
//         "__typename": "BasicInfo",
//         "artists": Array [
//           Object {
//             "__typename": "Artist",
//             "name": "Blues Traveler",
//           },
//         ],
//         "cover_image": "https://img.discogs.com/stGAe4tPZ-hgOLLihHX9WnkWjmY=/fit-in/468x719/filters:strip_icc():format(jpeg):mode_rgb():quality(90)/discogs-images/R-1044464-1372807318-7569.jpeg.jpg",
//         "id": "1044464",
//         "labels": Array [
//           Object {
//             "__typename": "Label",
//             "name": "A&M Records",
//           },
//         ],
//         "title": "Four",
//         "year": 1994,
//       },
//       "id": "1044464",
//     },
