import { type FC } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  View,
  Text,
  TouchableOpacity,
  TouchableNativeFeedback,
  StyleSheet,
} from 'react-native';

import { toggleMangaInLibrary } from '../../redux/actions/readManga.action';
import { primaryColor } from '../../constants/Colors';
import { Manga } from '../../repository/Mangadex';
import ReadManga from '../../storage/readManga';

interface MangaBottomBarProps {
  navigation: any;
  manga: Manga;
  collapse?: boolean;
}

const MangaBottomBar: FC<MangaBottomBarProps> = ({ manga, navigation, collapse }) => {
  const readMangas: ReadManga[] = useSelector((state: any) => state.readManga.mangas)

  const dispatch = useDispatch()

  const storedmanga = readMangas.find((item: ReadManga) => item.mangaID === manga.id)
  const inLibrary: boolean = storedmanga ? storedmanga.inLibrary : false
  const lastReadChapter: string | null = storedmanga ? storedmanga.chapterBeingRead : null

  const handleAddToLibrary = () => {
    dispatch(toggleMangaInLibrary(manga)) //dispatch the event
  };

  const handleRead = () => {
   let found: string = manga.volumes[0].chapters[0].id

   manga.volumes.forEach((vol) => {
    if (vol.chapters) {
     vol.chapters.forEach((ch) => {
      if (ch.id === lastReadChapter) found = ch.id
     })
    }
   })

   // navigate to the chaper page
   navigation.navigate("Chapter", { mangaID: manga.id, chapterID: found })
  };

  return (
    <View style={style.shadow}>
      <View style={style.bottomBarContainer}>
        <View style={style.pressableContainer}>
          <TouchableNativeFeedback
            onPress={handleAddToLibrary}
            background={TouchableNativeFeedback.Ripple(primaryColor, false)}
          >
            <View style={[style.bottomBarItem]}>
              <Text>
                {inLibrary ? "Added" : "Add to Library"}
              </Text>
            </View>
          </TouchableNativeFeedback>
        </View>

        <TouchableOpacity onPress={handleRead} style={style.pressableContainer}>
          <View style={[style.bottomBarItem, { backgroundColor: primaryColor }]}>
            <Text style={{ color: '#FFF' }}>
             {lastReadChapter ? "Continue" : "Read" }
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const style = StyleSheet.create({
  shadow: {
    elevation: 10,
    backgroundColor: '#000',
  },

  bottomBarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',

    backgroundColor: '#FFF',
  },

  bottomBarItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',

    padding: 15,

    borderWidth: 1,
    borderColor: 'transparent',
  },

  pressableContainer: {
    width: '50%',
  },
});

export default MangaBottomBar;
