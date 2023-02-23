import { type FC, useRef, useEffect } from 'react';
import { View, Image, StyleSheet, Animated } from 'react-native';
import { Manga } from '../../repository/Mangadex';

interface CoverProps {
  manga: Manga;
  animation: Animated.Value,
}

const Cover: FC<CoverProps> = ({ manga, animation }) => {
  const cover = manga.getCover()?.small;

  const scaleAnimation = animation.interpolate({
    inputRange: [0, 250],
    outputRange: [1, 0.5],
    extrapolate: 'clamp',
  })

  return (
    <View style={style.imageContainer}>
      <Animated.View 
        style={[
          style.shadowProp,
          { transform: [{ scale: scaleAnimation }] }
        ]}
      >
        <Image
          source={{
            uri: cover,
            cache: 'force-cache',
          }}
          style={style.image}
        />
      </Animated.View>
    </View>
  );
};

const style = StyleSheet.create({
  imageContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',

    marginTop: 20,
  },

  image: {
    width: 120,
    height: 180,
  },

  shadowProp: {
    shadowColor: 'rgba(0, 0, 0, 0.8)',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 1,
    shadowRadius: 4,
    elevation: 10,
    backgroundColor: "#000"
  },
});

export default Cover;
