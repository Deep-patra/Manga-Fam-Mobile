import { useEffect, type FC } from 'react';
import { useDispatch } from 'react-redux';
import {
  SafeAreaView,
  StyleSheet,
  ActivityIndicator,
  View,
  Dimensions,
} from 'react-native';

import ChapterPage from '../components/chapterPage';
import { useGetPages } from '../hooks/useGetPages';
import { updateChapterBeingRead } from '../redux/actions/readManga.action'
import { Chapter, Manga } from '../repository/Mangadex';

interface ScreenProps {
  navigation: any;
  route: any;
}

const useUpdateReadManga = (manga: Manga | null, chapter: Chapter | null) => {
 const dispatch = useDispatch()
 
 useEffect(() => {
  if (manga && chapter) {
   dispatch(updateChapterBeingRead(manga, chapter.id))
  }
 }, [manga, chapter])
}

const Screen: FC<ScreenProps> = ({ navigation, route }) => {
  const { loading, manga, chapter } = useGetPages(
    route.params?.mangaID,
    route.params?.chapterID
  );

  // update the read manga
  useUpdateReadManga(manga, chapter)

  return (
    <SafeAreaView style={style.container}>
      {loading ? (
        <View style={style.loadingContainer}>
          <ActivityIndicator size="large" color="#FFF" />
        </View>
      ) : chapter && manga ? (
        <ChapterPage {...{ manga, chapter, navigation }} />
      ) : null}
    </SafeAreaView>
  );
};

const style = StyleSheet.create({
  container: {
    backgroundColor: 'gray',

    minHeight: Dimensions.get('screen').height,
  },

  loadingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',

    height: Dimensions.get('screen').height,
  },
});

export default Screen;
