import { type FC, useState } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';

import { Chapter, Manga } from '../../repository/Mangadex';

import ChapterComp from './chapter';

interface ChapterPageProps {
  navigation: any;
  manga: Manga;
  chapter: Chapter;
}

const ChapterPage: FC<ChapterPageProps> = ({ navigation, manga, chapter }) => {
  const [chapters, setChapters] = useState<Chapter[]>([chapter]);

  const getPreviousChapter = () => {
    const prevChapter = manga.getPreviousChapter(chapter);

    prevChapter && setChapters([prevChapter, ...chapters]);
  };

  const getNextChapter = () => {
    const nextChapter = manga.getNextChapter(chapter);

    nextChapter && setChapters([...chapters, nextChapter]);
  };

  return (
    <View style={style.mainContainer}>
      {chapters.map((value: Chapter) => (
        <ChapterComp key={value.id} {...{ navigation, manga, chapter: value }} />
      ))}
    </View>
  );
};

const style = StyleSheet.create({
  mainContainer: {
    position: 'relative',
    height: Dimensions.get('screen').height,
  },
});

export default ChapterPage;
