import { type FC, useState, useEffect, useCallback, useRef } from 'react';
import {
  FlatList,
  StyleSheet,
  Dimensions,
  View,
  ActivityIndicator,
  PanResponder,
  type ViewToken,
  type GestureResponderEvent
} from 'react-native';

import MangaPage from './page';
import ChapterHeader from './header';
import BottomBar from './bottomBar';
import { Chapter, Manga } from '../../repository/Mangadex';

interface ChapterCompProps {
  navigation: any;
  manga: Manga;
  chapter: Chapter;
}

type ViewabilityHandler = {
  viewableItems: ViewToken[];
  changed: ViewToken[];
};

const config = {
  viewAreaCoveragePercentThreshold: 60,
};

const ChapterComp: FC<ChapterCompProps> = ({ navigation, chapter, manga }) => {
  const [open, toggle] = useState(false);
  const [active, setActive] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false);


  const handleScroll = () => {
    toggle(false);
  };

  const handlePress = useCallback((event: GestureResponderEvent) => {
    toggle(!open);
  }, [open]);

  const handleViewablityChange = useCallback(
    ({ viewableItems, changed }: ViewabilityHandler) => {
      viewableItems.forEach((item: ViewToken) => {
        item.isViewable && setActive(item.index ? item.index + 1 : 1);
      });
    },
    []
  );

  useEffect(() => {
    const fetchPages = async () => {
      if (chapter.pages === null) {
        setLoading(true);

        await chapter.getPages().catch(console.error);

        setLoading(false);
      }
    };

    fetchPages();
  }, []);

  return (
    <>
      {!loading ? (
        <View style={style.mainContainer}>
          <ChapterHeader {...{ chapter, navigation, open }} />
          <FlatList
            data={chapter.pages}
            onScroll={handleScroll}
            onEndReachedThreshold={0.8}
            initialNumToRender={10}
            viewabilityConfig={config}
            onViewableItemsChanged={handleViewablityChange}
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
            renderItem={({ item, index }) => (
              <MangaPage key={index} {...{ page: item, handlePress }} />
            )}
          />
          <BottomBar {...{ navigation, active, chapter, manga, open }} />
        </View>
      ) : (
        <View style={style.loadingContainer}>
          <ActivityIndicator size="large" color="#000" />
        </View>
      )}
    </>
  );
};

const style = StyleSheet.create({
  mainContainer: {
    height: Dimensions.get('screen').height,
  },

  loadingContainer: {
    width: Dimensions.get('screen').width,
    height: Dimensions.get('screen').height,

    backgroundColor: 'gray',
  },
});

export default ChapterComp;
