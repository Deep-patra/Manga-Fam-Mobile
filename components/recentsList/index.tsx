import { type FC, useCallback } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  StyleSheet,
  Dimensions,
} from 'react-native';
import { useSelector } from 'react-redux';
import { primaryColor } from '../../constants/Colors';

import ReadManga from '../../storage/readManga';

interface RecentListProps {
  navigation: any;
}

interface RecentItemProps {
  label: string;
  navigate: (mangaID: string) => void;
  mangas: ReadManga[];
}

function getTimeStamps() {
  const get_millis_till_now = () => {
    const time = new Date();

    const millis =
      time.getHours() * 60 * 60 * 1000 +
      time.getMinutes() * 60 * 1000 +
      time.getSeconds() * 1000;

    return millis;
  };

  const ONE_DAY_MILLIS = 24 * 60 * 60 * 1000;
  const time = Date.now();
  const millis = get_millis_till_now();

  const timeStamps = {
    Today: time - millis,
    Yesterday: time - ONE_DAY_MILLIS - millis,
    '2 Days Ago': time - 2 * ONE_DAY_MILLIS - millis,
    '3 Days Ago': time - 3 * ONE_DAY_MILLIS - millis,
    'One Week Ago': time - 7 * ONE_DAY_MILLIS - millis,
  };

  return timeStamps;
}

interface MangaItemProps {
  readManga: ReadManga;
  navigateToManga: (mangaID: string) => void;
}

const MangaItem: FC<MangaItemProps> = ({ readManga, navigateToManga }) => {
  const cover = readManga.relationships.find((item) => item.type === 'cover_art');
  const author = readManga.relationships.find((item) => item.type === 'author');

  const title = readManga.title;
  const fileName = `https://uploads.mangadex.org/covers/${readManga.mangaID}/${cover?.attributes?.fileName}.256.jpg`;
  const authorName = author?.attributes?.name;
  return (
    <TouchableOpacity
      onPress={() => {
        navigateToManga(readManga.mangaID);
      }}
    >
      <View style={MangaItemStyle.itemContainer}>
        <Image
          source={{
            uri: fileName,
            cache: 'force-cache',
            headers: { 'Referrer-Policy': 'no-referrer' },
          }}
          style={MangaItemStyle.image}
        />
        <View style={MangaItemStyle.titleContainer}>
          <Text numberOfLines={2} style={MangaItemStyle.title}>
            {title}
          </Text>
          <Text numberOfLines={1} style={MangaItemStyle.author}>
            {authorName}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const MangaItemStyle = StyleSheet.create({
  itemContainer: {
    flexDirection: 'column',
    alignItems: 'center',

    padding: 5,
  },

  image: {
    width: 100,
    height: 140,
  },

  titleContainer: {
    flexDirection: 'column',
  },

  title: {
    color: 'black',
    fontSize: 12,
    width: 100,
  },

  author: {
    color: 'gray',
    fontSize: 10,
  },
});

const RecentItem: FC<RecentItemProps> = ({ label, mangas, navigate }) => {
  return (
    <View style={itemStyle.itemContainer}>
      <View style={itemStyle.labelContainer}>
        <Text style={itemStyle.label}>{label}</Text>
      </View>

      <View style={itemStyle.mangaContainer}>
        {mangas.map((item: ReadManga, index: number) => (
          <MangaItem key={index} readManga={item} navigateToManga={navigate} />
        ))}
      </View>
    </View>
  );
};

const itemStyle = StyleSheet.create({
  itemContainer: {
    flexDirection: 'column',
  },

  labelContainer: {
    flexDirection: 'row',
    borderLeftWidth: 5,
    borderLeftColor: primaryColor,

    paddingHorizontal: 8,
    marginHorizontal: 10,
    marginVertical: 5,
  },

  label: {
   fontSize: 16,
   fontWeight: 'bold',
   color: 'gray',
  },

  mangaContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',

    paddingHorizontal: 10,
  },
});

const NoRecentText = () => {
 return (
  <View style={NoRecentStyle.container}>
   <Text style={NoRecentStyle.text}>No Recents !!</Text>
  </View>
 )
}

const NoRecentStyle = StyleSheet.create({
 container: {
  width: "100%",
  height: Dimensions.get('screen').height - 200,

  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'center'
 },

 text: {
  color: 'gray',
  fontSize: 16,
 }
})

const groupMangas = (readMangas: ReadManga[]) => {
  const timeStamps = getTimeStamps();

  const groupedMangas: Record<string, ReadManga[]> = {
    Today: [],
    Yesterday: [],
    '2 Days Ago': [],
    '3 Days Ago': [],
    'A Week Ago': [],
    'A While Ago': [],
  };

  if (readMangas.length === 0) return groupedMangas;

  readMangas.forEach((value) => {
    const time = value.lastRead ? new Date(value.lastRead).getTime() : null;

    if (!time) return;

    if (time > timeStamps['Today']) groupedMangas['Today'].push(value);
    else if (time > timeStamps['Yesterday'] && time < timeStamps['Today'])
      groupedMangas['Yesterday'].push(value);
    else if (time > timeStamps['2 Days Ago'] && time < timeStamps['Yesterday'])
      groupedMangas['2 Days Ago'].push(value);
    else if (time > timeStamps['3 Days Ago'] && time < timeStamps['2 Days Ago'])
      groupedMangas['3 Days Ago'].push(value);
    else if (time > timeStamps['One Week Ago'] && time < timeStamps['3 Days Ago'])
      groupedMangas['A Week Ago'].push(value);
    else groupedMangas['A While Ago'].push(value);
  });

  return groupedMangas;
};

const RecentList: FC<RecentListProps> = ({ navigation }) => {
  const readMangas: ReadManga[] = useSelector((state: any) => state.readManga.mangas);

  const navigate = useCallback((mangaID: string) => {
    navigation.navigate('Manga', { mangaID });
  }, []);

  const groupedMangas = groupMangas(readMangas);

  return (
    <ScrollView>
      { readMangas && readMangas.length > 0 ? (
       Object.entries(groupedMangas).map(
        ([key, mangas]: [string, ReadManga[]], index: number) =>
          mangas && mangas.length > 0 ? (
            <RecentItem key={index} label={key} mangas={mangas} navigate={navigate} />
          ) : null
      )
      ) : (
       <NoRecentText/>
      )}
    </ScrollView>
  );
};

export default RecentList;
