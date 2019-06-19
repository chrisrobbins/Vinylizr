import React, { Component } from 'react';
import { View, Image } from 'react-native';
import Swipeable from 'react-native-swipeable';

import {
  MasterReleaseResult,
  SearchResultItem,
} from '#src/views/SearchResults';
import wantlistIcon from '/assets/images/wantlistButton.png';
import collectionIcon from '/assets/images/collectionButton.png';

class SearchSwiper extends Component {
  state = {
    leftActionActivated: false,
    rightActionActivated: false,
    isModalVisible: false,
    leftSwiped: false,
    rightSwiped: false,
  };

  toggleLeftAction = () => {
    this.setState({ leftActionActivated: !this.state.leftActionActivated });
  };
  toggleRightAction = () => {
    this.setState({ rightActionActivated: !this.state.rightActionActivated });
  };

  renderItem = () => {
    const { item } = this.props;
    console.log('ITEM FOR SWIPER', item);
    if (item.type === 'master') return <MasterReleaseResult item={item} />;
    if (item.type === 'release') return <SearchResultItem item={item} />;
    return;
  };

  render() {
    const {
      item,
      onSwipeStart,
      onSwipeRelease,
      addToCollection,
      addToWantlist,
    } = this.props;
    const { leftActionActivated, rightActionActivated } = this.state;

    const leftContent = [
      <View
        key={item.id}
        style={[
          styles.leftSwipeItem,
          { backgroundColor: leftActionActivated ? '#0967EE' : '#000' },
        ]}
      >
        <Image style={styles.leftIconStyles} source={collectionIcon} />
      </View>,
    ];
    const rightContent = [
      <View
        key={item.id}
        style={[
          styles.rightSwipeItem,
          { backgroundColor: rightActionActivated ? '#D400FF' : '#000' },
        ]}
      >
        <Image style={styles.rightIconStyles} source={wantlistIcon} />
      </View>,
    ];

    return (
      <Swipeable
        key={item.id}
        leftContent={leftContent}
        rightContent={rightContent}
        leftActionActivationDistance={100}
        rightActionActivationDistance={100}
        onLeftActionActivate={this.toggleLeftAction}
        onLeftActionDeactivate={this.toggleLeftAction}
        onRightActionActivate={this.toggleRightAction}
        onRightActionDeactivate={this.toggleRightAction}
        onLeftActionRelease={() => addToCollection(item)}
        onRightActionRelease={() => addToWantlist(item)}
        onSwipeStart={onSwipeStart}
        onSwipeRelease={onSwipeRelease}
      >
        {this.renderItem()}
      </Swipeable>
    );
  }
}

const styles = {
  container: {
    flexDirection: 'column',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(217,217,217,.6)',
  },

  textView: {
    justifyContent: 'center',
    width: 250,
  },
  titleTextStyle: {
    fontSize: 20,
    color: '#DADADA',
    marginLeft: 5,
    fontFamily: 'Lato-Regular',
  },
  artistTextStyle: {
    fontSize: 16,
    color: 'rgba(217,217,217,.6)',
    marginLeft: 10,
    marginTop: 1,
    fontFamily: 'Lato-Regular',
  },
  leftSwipeItem: {
    flex: 1,
    alignItems: 'flex-end',
    justifyContent: 'center',
    paddingRight: 20,
  },
  rightSwipeItem: {
    flex: 1,
    alignItems: 'flex-start',
    justifyContent: 'center',
    paddingLeft: 20,
  },
  searchModal: {
    justifyContent: 'center',
    height: 90,
    width: 90,
  },
};

export default SearchSwiper;
