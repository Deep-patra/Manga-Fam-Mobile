import { type FC, useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Animated,
} from 'react-native';
import { Slider } from '@miblanchard/react-native-slider';
import { MaterialCommunityIcons, Entypo } from '@expo/vector-icons';

import { Chapter, Manga } from '../../repository/Mangadex';
import { primaryColor } from '../../constants/Colors';

interface BottomBarProps {
  navigation: any;
  manga: Manga;
  chapter: Chapter;
  open: boolean;
  active: number;
}

interface PressableProps {
  handlePress: () => void;
}

const lightWhite = 'rgba(255, 255, 255, 0.7)';

const ReadModeButton: FC<PressableProps> = ({ handlePress }) => {
  return (
    <TouchableOpacity onPress={handlePress}>
      <View style={[style.bottomButton]}>
        <Entypo name="open-book" size={20} color={lightWhite} />
        <Text style={{ color: lightWhite, marginHorizontal: 5 }}>Read mode</Text>
      </View>
    </TouchableOpacity>
  );
};

const ChaptersButton: FC<PressableProps> = ({ handlePress }) => {
  return (
    <TouchableOpacity onPress={handlePress}>
      <View style={style.bottomButton}>
        <Entypo name="list" size={20} color={lightWhite} />
        <Text style={{ color: lightWhite, marginHorizontal: 5 }}>Chapters</Text>
      </View>
    </TouchableOpacity>
  );
};

const NextChapterPressable: FC<PressableProps> = ({ handlePress }) => {
  return (
    <TouchableOpacity onPress={handlePress} style={style.chapterNavButton}>
      <MaterialCommunityIcons name="arrow-collapse-right" size={20} color={lightWhite} />
    </TouchableOpacity>
  );
};

const PreviusChapterPressable: FC<PressableProps> = ({ handlePress }) => {
  return (
    <TouchableOpacity onPress={handlePress} style={style.chapterNavButton}>
      <MaterialCommunityIcons name="arrow-collapse-left" size={20} color={lightWhite} />
    </TouchableOpacity>
  );
};

const BottomBar: FC<BottomBarProps> = ({ navigation, manga, chapter, open, active }) => {
  const animation = useRef(new Animated.Value(200)).current;

  const pages = chapter.pages;
  const currentPage = active;

  // Navigate to the Next chapter
  const handleNextChapter = () => {
    const nextCh = manga.getNextChapter(chapter);

    if (nextCh) {
      navigation.pop(); // pop the state
      navigation.push('Chapter', { mangaID: manga.id, chapterID: nextCh.id }); // push the state
    }
  };

  // Navigate to the Previous chapter
  const handlePrevChapter = () => {
    const prevCh = manga.getPreviousChapter(chapter);

    if (prevCh) {
      navigation.pop();
      navigation.push('Chapter', { mangaID: manga.id, chapterID: chapter.id });
    }
  };

  const handleReadMode = () => {};
  const handleChapters = () => {};

  useEffect(() => {
    if (open) {
      Animated.timing(animation, {
        duration: 200,
        useNativeDriver: true,
        toValue: 0,
      }).start();
    } else {
      Animated.timing(animation, {
        duration: 200,
        toValue: 200,
        useNativeDriver: true,
      }).start();
    }
  }, [open]);

  return (
    <Animated.View
      style={[
        style.bottomContainer,
        {
          transform: [
            {
              translateY: animation,
            },
          ],
        },
      ]}
    >
      <View style={style.background}>
        {/**Page Number**/}
        <View style={style.pageNumberContainer}>
          <Text style={style.pageNumber}>{`${currentPage}/${
            pages ? pages.length : 'unknown'
          }`}</Text>
        </View>

        {/**Page Slider And Chapter Navigation Button**/}
        <View style={style.sliderContainer}>
          <PreviusChapterPressable handlePress={handlePrevChapter} />
          <Slider
            thumbStyle={style.thumb}
            trackStyle={style.track}
            containerStyle={style.slider}
            maximumValue={pages ? pages.length : 1}
            minimumValue={1}
            value={currentPage}
          />
          <NextChapterPressable handlePress={handleNextChapter} />
        </View>

        {/**Bottom Buttons**/}
        <View style={style.bottomButtonContainer}>
          <ReadModeButton handlePress={handleReadMode} />
          <ChaptersButton handlePress={handleChapters} />
        </View>
      </View>
    </Animated.View>
  );
};

const style = StyleSheet.create({
  bottomContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    zIndex: 10,

    width: Dimensions.get('screen').width,
  },

  background: {
    backgroundColor: 'rgba(0, 0, 0, 0.8)',

    minHeight: 100,
    padding: 10,
  },

  pageNumberContainer: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },

  pageNumber: {
    color: '#FFF',
    fontSize: 15,
  },

  sliderContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },

  chapterNavButton: {
    margin: 5,
  },

  slider: {
    width: '80%',
    margin: 5,
  },

  thumb: {
    backgroundColor: primaryColor,
  },

  track: {
    backgroundColor: 'gray',
    height: 2,
  },

  bottomButtonContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },

  bottomButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',

    padding: 5,
  },
});

export default BottomBar;
