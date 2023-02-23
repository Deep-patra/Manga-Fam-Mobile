import { type FC, memo, useState } from 'react';
import { useSelector } from 'react-redux';
import {
  View,
  Text,
  TouchableOpacity,
  TouchableNativeFeedback,
  StyleSheet,
  Dimensions,
  Pressable,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

import { Chapter, Manga, Volume } from '../../repository/Mangadex';
import { primaryColor } from '../../constants/Colors';
import ReadManga from '../../storage/readManga';

interface ChaptersProps {
  manga: Manga;
  navigation: any;
}

interface VolumeCompProps {
  navigation: any;
  volume: Volume;
  manga: Manga;
  storedData: ReadManga | null;
}

interface ChapterCompProps {
  navigation: any;
  manga: Manga;
  chapter: Chapter;
  storedData: ReadManga | null;
}

interface SortDropDownProps {
  handleAsc: () => void;
  handleDesc: () => void;
}

const SortDropDown: FC<SortDropDownProps> = ({ handleAsc, handleDesc }) => {
  return (
    <View style={style.shadow}>
      <View style={style.sortDropDown}>
        <TouchableNativeFeedback
          onPress={handleAsc}
          background={TouchableNativeFeedback.Ripple(primaryColor, false)}
        >
          <View style={style.sortButton}>
            <Text style={style.sortButtonText}>Ascending</Text>
          </View>
        </TouchableNativeFeedback>

        <TouchableNativeFeedback
          background={TouchableNativeFeedback.Ripple(primaryColor, false)}
          onPress={handleDesc}
        >
          <View style={style.sortButton}>
            <Text style={style.sortButtonText}>Descending</Text>
          </View>
        </TouchableNativeFeedback>
      </View>
    </View>
  );
};

const ChapterComp: FC<ChapterCompProps> = ({ navigation, chapter, manga, storedData }) => {
  const number = chapter.number === 'none' ? 'TBD' : chapter.number;
  const chapterID = chapter.id;
  const mangaID = manga.id;
  
  const isAlreadyRead = (): boolean => {
   if (!storedData) return false
   if (storedData.readChapters.length === 0) return false

   const found = storedData.readChapters.findIndex((ch) => ch === chapter.id)
   if (found === -1) return false

   return true
  }

  const onPress = () => {
    // navigate to the "Chapter" page
    navigation.navigate('Chapter', { chapterID, mangaID });
  };

  return (
    <Pressable style={style.chapter} onPress={onPress}>
      <Text
       style={{ color: isAlreadyRead() ? "gray" : "black"}}
      >Chapter {number}</Text>
    </Pressable>
  );
};

const VolumeComp: FC<VolumeCompProps> = ({ navigation, volume, manga, storedData }) => {
  const number = volume.name === 'none' ? 'TBD' : volume.name;
  const chapters = volume.chapters;

  return (
    <View style={style.volumeContainer}>
      <Text style={style.volumeHeading}>Volume {number}</Text>
      {chapters.map((chapter: Chapter) => (
        <ChapterComp key={chapter.id} {...{ navigation, chapter, manga, storedData }} />
      ))}
    </View>
  );
};

const Chapters: FC<ChaptersProps> = ({ navigation, manga }) => {
  const storedData = useSelector((state: any) => {
    const mangas = state.readManga.mangas;

    const found: ReadManga | null = mangas.find(
      (item: ReadManga) => item.mangaID === manga.id
    );
    return found;
  });

  const [volumes, setVolumes] = useState<Volume[]>(manga.sortChapters());
  const [open, toggle] = useState<boolean>(false);

  const handleAscSort = () => {
    setVolumes([...manga.sortChapters('asc')]);
  };
  const handleDescSort = () => {
    setVolumes([...manga.sortChapters('desc')]);
  };

  const toggleDropDown = () => {
    toggle(!open);
  };

  return (
    <View style={style.container}>
      <View style={style.chapterHeader}>
        <Text style={style.chapterHeaderText}>Chapters</Text>

        <View style={{ position: 'relative' }}>
          <TouchableOpacity onPress={toggleDropDown}>
            <MaterialIcons name="sort" size={20} color="gray" />
          </TouchableOpacity>

          {open ? (
            <SortDropDown handleAsc={handleAscSort} handleDesc={handleDescSort} />
          ) : null}
        </View>
      </View>

      {volumes && volumes.length > 0
        ? volumes.map((volume: Volume) => (
            <VolumeComp key={volume.name} {...{ navigation, volume, manga, storedData }} />
          ))
        : null}
    </View>
  );
};

const style = StyleSheet.create({
  container: {
    flexDirection: 'column',
    width: Dimensions.get('screen').width,

    paddingHorizontal: 10,
    paddingTop: 20,

    borderTopWidth: 1,
    borderTopColor: '#cccccc',
  },

  chapterHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',

    marginHorizontal: 5,
  },

  chapterHeaderText: {
    fontSize: 16,
    color: 'gray',
  },

  volumeContainer: {
    padding: 5,
    marginTop: 20,
  },

  volumeHeading: {
    color: primaryColor,
  },

  chapter: {
    padding: 5,
    paddingVertical: 10,
  },

  sortDropDown: {
    flexDirection: 'column',

    width: 100,
    backgroundColor: '#FFF',
  },

  shadow: {
    position: 'absolute',
    bottom: -80,
    right: 0,

    elevation: 5,
    backgroundColor: '#000',
    shadowColor: '#000',
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 1,
    zIndex: 10,
  },

  sortButton: {
    paddingHorizontal: 10,
    paddingVertical: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },

  sortButtonText: {
    color: '#000',
  },
});

export default memo(Chapters);
