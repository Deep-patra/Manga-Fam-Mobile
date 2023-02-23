import { type FC, useCallback } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { primaryColor } from '../../constants/Colors';

import { Manga } from '../../repository/Mangadex';

interface TagsProps {
  navigation: any;
  manga: Manga;
}

const Tags: FC<TagsProps> = ({ navigation, manga }) => {
  const tags = manga.getTags();

  const pressHandler = useCallback((tag: string) => {
    console.log(tag)
  }, [])

  return (
    <View style={style.container}>
      {tags && tags.length
        ? tags.map((tag: string) => (
            <TouchableOpacity key={tag} onPress={() => { pressHandler(tag) }}>
              <View style={style.tag} >
                <Text style={style.tagText}>{tag}</Text>
              </View>
            </TouchableOpacity>
          ))
        : null}
    </View>
  );
};

const style = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',

    padding: 10,
  },

  tag: {
    borderRadius: 5,
    paddingVertical: 5,
    paddingHorizontal: 5,
    margin: 5,

    backgroundColor: '#ecf0f1',
  },

  tagText: {
    color: primaryColor,
    fontSize: 10,
  },
});

export default Tags;
