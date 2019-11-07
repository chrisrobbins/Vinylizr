import React, { useState } from 'react';
import { useMutation } from '@apollo/react-hooks';
import {
  Text,
  View,
  Image,
  ImageBackground,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import Stars from 'react-native-stars';
import {
  ADD_TO_COLLECTION,
  REMOVE_FROM_COLLECTION,
} from '../UserCollections/resolvers';
import { DetailButton, Spinner } from '#common';
import TrackList from '#views/TrackList/TrackList';
import albumGradient from '/assets/images/album_gradient_BG.png';
import starFull from '/assets/images/star-full.png';
import starEmpty from '/assets/images/empty-star.png';
import goTo from '/assets/images/goto-icon.png';
import { styles } from './styles';

const AlbumDetail = ({ navigation, screenProps }) => {
  const [avgRating, setAvgRating] = useState('');
  const [tracklist, setTracklist] = useState([]);
  const [low, setLow] = useState('');
  const [median, setMedian] = useState('');
  const [high, setHigh] = useState('');
  const [record, setRecord] = useState(navigation.state.params.item || {});
  const [inCollection, setInCollection] = useState(
    navigation.state.params.inCollection ? true : false
  );
  const [inWantlist, setInWantlist] = useState(
    navigation.state.params.inWantlist ? true : false
  );
  const [goBack, setGoBack] = useState(navigation.state.params.routeBack || '');
  const [numForSale, setNumForSale] = useState('');
  const {
    accessData: { token, tokenSecret },
    userMeta: { username },
  } = screenProps.user;

  const returnToPreviousScreen = () => {
    navigation.navigate(goBack);
  };
  const { item } = navigation.state.params;
  const roundedRating = Math.round(avgRating * 10) / 10;
  const roundedMedian = !median ? 0 : median.toFixed(2);
  const roundedLow = !low ? 0 : low.toFixed(2);
  const roundedHigh = !high ? 0 : high.toFixed(2);
  const { title, artists, labels, year, id } = item.basic_information;
  const { instance_id } = item;
  const [addToCollection, { loading: addCollectionLoading }] = useMutation(
    ADD_TO_COLLECTION
  );
  const [
    removeFromCollection,
    { loading: removeCollectionLoading },
  ] = useMutation(REMOVE_FROM_COLLECTION);

  if (addCollectionLoading || removeCollectionLoading) return <Spinner />;
  const addCollect = () => {
    addToCollection({
      variables: {
        token,
        tokenSecret,
        username,
        release: id,
        folder: '1',
      },
    });
    setInCollection(true);
  };
  const removeCollect = () => {
    removeFromCollection({
      variables: {
        username,
        token,
        tokenSecret,
        release: id,
        folder: '1',
        instance: instance_id,
      },
    });
    setInCollection(false);
  };
  const toggleInCollection = !inCollection ? addCollect : removeCollect;

  return (
    <View style={styles.detailScrollView}>
      <ScrollView contentContainerStyle={styles.scrollViewChild}>
        <View style={styles.imagesContainer}>
          <ImageBackground
            style={styles.backgroundImage}
            source={{
              uri: item.basic_information.cover_image,
            }}
            blurRadius={1}
            resizeMode="cover"
          >
            <ImageBackground
              source={albumGradient}
              resizeMode="cover"
              style={styles.album_gradient}
            >
              <View style={styles.backTextContainer}>
                <TouchableOpacity onPress={returnToPreviousScreen}>
                  <Text style={styles.backText}>BACK</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.infoContainer}>
                <Image
                  source={{
                    uri: item.basic_information.cover_image,
                  }}
                  style={styles.detailThumb}
                />
                <View
                  style={{
                    width: 350,
                    marginBottom: 80,
                  }}
                >
                  <Text
                    numberOfLines={1}
                    ellipsifyMode={'tail'}
                    style={styles.detailTitle}
                  >
                    {title}
                  </Text>
                  <Text style={styles.detailText}>{artists[0].name}</Text>
                  <Text style={styles.detailText}>{labels[0].name}</Text>
                  <Text style={styles.detailText}>{year}</Text>
                </View>
              </View>
              <View style={styles.btnContainer}>
                <DetailButton
                  btnStyle={
                    inCollection
                      ? styles.detailCollectionTrue
                      : styles.detailCollectionBtnFalse
                  }
                  txtStyle={styles.btnCollText}
                  onPress={toggleInCollection}
                >
                  {inCollection ? 'In Collection' : 'Add to Collection'}
                </DetailButton>
                <DetailButton
                  btnStyle={
                    inWantlist
                      ? styles.detailWantlistBtnTrue
                      : styles.detailWantlistBtnFalse
                  }
                  onPress={() => {}}
                  txtStyle={styles.btnWantText}
                >
                  {inWantlist ? 'In Wantlist' : 'Add to Wantlist'}
                </DetailButton>
              </View>
            </ImageBackground>
          </ImageBackground>
        </View>
        <View style={styles.midContainer}>
          <View style={styles.avgRatingContainer}>
            <Text style={styles.midTitle}>AVG. RATING</Text>
            <View style={styles.ratingContainer}>
              <Text style={styles.bigRate}>{roundedRating}</Text>
              <Text style={styles.littleRate}>/5</Text>
            </View>
            <View style={styles.starContainer}>
              <Text style={styles.rateAlbumTitle}>Rate Album</Text>
              <Stars
                half={false}
                rating={3}
                update={val => changeRating(val)}
                spacing={4}
                starSize={30}
                count={5}
                fullStar={starFull}
                emptyStar={starEmpty}
              />
            </View>
          </View>
          <View style={styles.midDivider} />
          <View style={styles.valueContainer}>
            <Text style={styles.midTitle}>MEDIAN VALUE</Text>
            <Text style={styles.median}>${roundedMedian}</Text>
            <View style={styles.lowHiContainer}>
              <View style={styles.lowContainer}>
                <Text style={styles.lowTitle}>Low</Text>
                <Text style={styles.loHiPrice}>${roundedLow}</Text>
              </View>
              <View style={styles.hiContainer}>
                <Text style={styles.lowTitle}>High</Text>
                <Text style={styles.loHiPrice}>${roundedHigh}</Text>
              </View>
            </View>
            <View>
              <TouchableOpacity style={styles.buyLinkContainer}>
                <Text style={styles.buyLink}>{numForSale} for sale</Text>
                <Image source={goTo} />
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <View style={styles.endDivider} />
        <TrackList tracklist={tracklist} />
      </ScrollView>
    </View>
  );
};

AlbumDetail.navigationOptions = {
  drawerLabel: 'AlbumDetail',
  header: null,
};

export default AlbumDetail;
