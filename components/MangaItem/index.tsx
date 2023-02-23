import { type FC } from 'react';
import { Pressable, View, Text, Image, StyleSheet } from 'react-native';

import Colors from '../../constants/Colors';
import { Manga } from '../../repository/Mangadex';

interface MangaItemProps {
 navigation: any;
 mode: 'light' | 'dark';
 manga: Manga;
}

const MangaItem: FC<MangaItemProps> = ({ navigation, mode, manga }) => {
 const title = manga.getTitle();
 const image_url = manga.getCover()?.small;
 const author = manga.getAuthorName();

 const handlePress = () => {
  navigation.navigate('Manga', { mangaID: manga.id });
 };
 const handleLongPress = () => {};
 const handleError = (error: any) => {
  console.log(error);
 };

 return (
  <Pressable onPress={handlePress} onLongPress={handleLongPress}>
   <View style={style.container}>
    <Image
     progressiveRenderingEnabled
     resizeMode="cover"
     source={{ 
      uri: image_url, 
      headers: { 'Referrer-Policy': 'no-referrer' },
      cache: 'force-cache', 
    }}
     onError={handleError}
     style={style.image}
    />

    {/**TITLE OF THE MANGA */}
    <Text
     numberOfLines={2}
     ellipsizeMode="tail"
     style={[style.title, { color: Colors[mode].text }]}
    >
     {title ? title : "No Title"}
    </Text>

    {/**AUTHOR OF THE MANGA */}
    <Text numberOfLines={1} ellipsizeMode="tail" style={style.author}>
     {author}
    </Text>
   </View>
  </Pressable>
 );
};

const style = StyleSheet.create({
 container: {
  flexDirection: 'column',
  padding: 7,
 },

 image: {
  width: 100,
  height: 140,
  borderWidth: 1,
  borderColor: '#A4A4A4',
 },

 title: {
  fontSize: 12,
  width: 80,
 },

 author: {
  width: 80,
  fontSize: 10,
  color: '#A4A4A4',
 },
});

export default MangaItem;
