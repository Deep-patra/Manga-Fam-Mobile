import { type FC } from 'react'
import { View, Text, StyleSheet, Dimensions } from 'react-native'

import { Manga } from '../../repository/Mangadex'
import { primaryColor } from '../../constants/Colors'

interface TitleProps {
  manga: Manga
}

const Title: FC<TitleProps> = ({ manga }) => {
  const title = manga.getTitle()
  const author = manga.getAuthorName()
  return (
    <View style={style.titleContainer}>
      <Text style={style.title} >{title}</Text>
      <Text style={style.author} >{author}</Text>
    </View>
  )
}

const style = StyleSheet.create({
  titleContainer: {
    width: Dimensions.get('screen').width,
    marginTop: 10,

    flexDirection: "column",
    justifyContent: 'center',
    alignItems: 'center',
  },

  title: {
    fontSize: 20,
    fontWeight: "600",
    color: primaryColor,
    maxWidth: Dimensions.get('screen').width - 80,
  },

  author: {
    fontSize: 14,
    color: "#A4A4A4",
  }
})

export default Title