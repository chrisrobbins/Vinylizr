import React from 'react';
import { Text, View, Image, Linking, ListView } from 'react-native';
import { CardSection } from './CardSection';
import { Button } from './Button';
import { SwipeListView } from 'react-native-swipe-list-view';


const AlbumDetail = ({ album }) => {
  const { title } = album;
  const {
    imageView,
    textView,
    imageStyle,
    titleTextStyle,
    artistTextStyle
  } = styles;


  const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
  return (
    <SwipeListView
      dataSource={ds.cloneWithRows(dataSource)}
			renderRow={ data => (
				<View style={styles.rowFront}>
					<Text>I am {data} in a SwipeListView</Text>
				</View>
			)}
			renderHiddenRow={ data => (
				<View style={styles.rowBack}>
					<Text>Left</Text>
					<Text>Right</Text>
				</View>
			)}
			leftOpenValue={75}
			rightOpenValue={-75}
    >
      <CardSection>
        <View style={imageView}>
          <Image
            style={imageStyle}
            source={{ uri: album.cover }}
          />
      </View>

      <View style={textView}>
          <Text style={titleTextStyle}>{album.title}</Text>
          <Text style={artistTextStyle}>{album.artist.name}</Text>
        </View>
      </CardSection>
    </SwipeListView>
  );
};

const styles = {
  textView: {
    justifyContent: 'center'
  },
  titleTextStyle: {
    fontSize: 16,
    color: "#DADADA",
    marginLeft: 10
  },
  artistTextStyle: {
    fontSize: 14,
    color: "rgba(217,217,217,.6)",
    marginLeft: 10,
    marginTop: 5
  },
  imageStyle: {
    height: 80,
    width: 80
  }
};

export { AlbumDetail };
