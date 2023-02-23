import { type FC } from 'react';
import {
  SafeAreaView,
  View,
  StyleSheet,
  ActivityIndicator,
  Dimensions,
} from 'react-native';

import { useGetMode } from '../../hooks/useGetMode';
import MangaItem from '../MangaItem';
import { Manga } from '../../repository/Mangadex';
import { primaryColor } from '../../constants/Colors';

interface MangaListProps {
  navigation: any;
  mangas: Manga[];
}

const MangaList: FC<MangaListProps> = ({ navigation, mangas }) => {
  const mode = useGetMode();

  return (
    <SafeAreaView style={style.mangaContainer}>
      {mangas && mangas.length > 0 ? (
        mangas.map((manga: Manga, index: number) => (
          <MangaItem key={index} navigation={navigation} mode={mode} manga={manga} />
        ))
      ) : (
        <View style={style.loading}>
          <ActivityIndicator size="large" color={primaryColor} />
        </View>
      )}
    </SafeAreaView>
  );
};

const style = StyleSheet.create({
  mangaContainer: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',

    padding: 5,
    paddingBottom: 40,
  },

  loading: {
    flex: 1,
    height: Dimensions.get('screen').height - 200,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default MangaList;
