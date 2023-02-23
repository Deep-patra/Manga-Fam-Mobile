import { type FC } from 'react';
import { ImageBackground, View, StyleSheet, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

import { Manga } from '../../repository/Mangadex';

interface MangaBackgroundProps {
  manga: Manga;
}

const MangaBackground: FC<MangaBackgroundProps> = ({ manga }) => {
  const cover = manga.getCover()?.small;
  return (
    <View style={style.container}>
      <ImageBackground
        source={{
          uri: cover,
          cache: 'force-cache',
        }}
        resizeMode="cover"
        style={style.imageBackground}
      >
        <LinearGradient
          colors={["#FFFFFF00", "#FFFFFF"]}
          locations={[0.0, 0.8]}
          style={{ width: Dimensions.get("screen").width, height: 400 }}
        >
        </LinearGradient>
      </ImageBackground>
    </View>
  );
};

const style = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
  },

  imageBackground: {
    width: Dimensions.get('screen').width,
    height: 400,
  },
});

export default MangaBackground;
