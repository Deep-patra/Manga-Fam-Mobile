import { type FC, useState } from 'react';
import {
  View,
  Text,
  Pressable,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialIcons, Entypo } from '@expo/vector-icons';

import MangaList from '../components/mangaList';

import { useGetAddedMangas } from '../hooks/useGetAddedMangas';
import { primaryColor } from '../constants/Colors';
import ReadManga from '../storage/readManga';
import { Manga } from '../repository/Mangadex';

interface LibraryProps {
  navigation: any;
}

interface LibrayHeaderProps {
  goBack: () => void;
  order: 'ASC' | 'DESC';
  toggleOrder: () => void;
}

const NoAddedManga = () => {
  return (
    <View style={style.emptyManga}>
      <Text style={style.emptyMangaText}>No Manga in Library !</Text>
    </View>
  );
};

const TotalMangas: FC<{ mangas: Manga[] | null }> = ({ mangas }) => {
  return (
    <>
      {mangas && mangas.length > 0 ? (
        <View style={totalMangasStyle.totalContainer}>
          <Text style={totalMangasStyle.totalText}>Added Mangas: {mangas.length}</Text>
        </View>
      ) : null}
    </>
  );
};

const totalMangasStyle = StyleSheet.create({
  totalContainer: {
    height: 20,
    width: '100%',

    paddingHorizontal: 10,

    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },

  totalText: {
    fontSize: 12,
    color: 'gray',
  },
});

const LibraryHeader: FC<LibrayHeaderProps> = ({ goBack, order, toggleOrder }) => {
  return (
    <View style={style.header}>
      <Pressable onPress={goBack}>
        <MaterialIcons name="arrow-back-ios" color={primaryColor} size={23} />
      </Pressable>

      <Text style={style.headerText}>Library</Text>

      <TouchableOpacity>
        <View>
          <TouchableOpacity onPress={toggleOrder} >
            <View style={libraryHeaderStyle.iconContainer}>
              <Entypo
                name="arrow-long-down"
                size={15}
                color={order === 'ASC' ? primaryColor : 'gray'}
                style={{ marginRight: -3 }}
              />
              <Entypo
                name="arrow-long-up"
                size={15}
                color={order === 'DESC' ? primaryColor : 'gray'}
                style={{ marginLeft: -3 }}
              />
            </View>
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const libraryHeaderStyle = StyleSheet.create({
  iconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

const Library: FC<LibraryProps> = ({ navigation }) => {
  const { loading, mangas, order, toggleOrder } = useGetAddedMangas();

  const goBack = () => {
    navigation.goBack();
  };

  return (
    <SafeAreaView style={style.libraryContainer}>
      <LibraryHeader {...{ goBack, order, toggleOrder }} />
      <TotalMangas mangas={mangas} />
      {!loading && mangas.length > 0 ? (
        <MangaList {...{ navigation, mangas }} />
      ) : (
        <NoAddedManga />
      )}
    </SafeAreaView>
  );
};

const style = StyleSheet.create({
  libraryContainer: {
    flex: 1,
  },

  header: {
    height: 50,
    padding: 10,

    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  headerText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: primaryColor,
  },

  emptyManga: {
    height: Dimensions.get('screen').height - 200,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },

  emptyMangaText: {
    color: 'gray',
    fontSize: 16,
  },
});

export default Library;
