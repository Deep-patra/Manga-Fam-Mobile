import { useState, useRef, type FC } from 'react';
import {
  ScrollView,
  View,
  Dimensions,
  StyleSheet,
  Animated,
  type NativeScrollEvent,
  type NativeSyntheticEvent,
} from 'react-native';

import { Manga } from '../../repository/Mangadex';

import MangaBackground from '../mangaBackground';
import MangaHeader from '../mangaHeader';
import Cover from './cover';
import Description from './description';
import Title from './title';
import Status from './statusAndUpdated';
import Tags from './tags';
import Chapters from './chapters';
import MangaBottomBar from '../mangaBottomBar';

interface MangaScrollViewProps {
  navigation: any;
  manga: Manga;
}

const MangaScrollView: FC<MangaScrollViewProps> = ({ navigation, manga }) => {
  const animation = useRef(new Animated.Value(0)).current;

  const [show, changeShow] = useState<boolean>(false);

  const scrollHandler = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const y = event.nativeEvent.contentOffset.y;

    // update the animation
    Animated.event([{ nativeEvent: { contentOffset: { y: animation } } }], {
      useNativeDriver: true,
    });

    if (y < 250) {
      show && changeShow(false);
    } else !show && changeShow(true);
  };

  return (
    <>
      <Animated.ScrollView
        style={{ width: Dimensions.get('screen').width }}
        scrollEventThrottle={16}
        stickyHeaderIndices={[1]}
        onScroll={scrollHandler}
      >
        <MangaBackground {...{ manga }} />
        <MangaHeader {...{ navigation, show, manga }} />
        <Cover {...{ manga, animation }} />
        <Title {...{ manga }} />

        <View style={style.subContainer}>
          <Description {...{ manga }} />
          <Tags {...{ navigation, manga }} />
          <Status {...{ manga }} />
        </View>

        <Chapters {...{ navigation, manga }} />
      </Animated.ScrollView>
      {/**Bottom Bar**/}
      <MangaBottomBar {...{ navigation, manga }} />
    </>
  );
};

const style = StyleSheet.create({
  subContainer: {
    marginVertical: 10,
    paddingVertical: 10,
    paddingHorizontal: 5,
  },
});

export default MangaScrollView;
