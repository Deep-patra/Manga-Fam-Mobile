import { type FC, useRef, useEffect } from 'react'
import { View, StyleSheet, Text, Dimensions, Pressable, Animated } from 'react-native'
import { MaterialIcons } from '@expo/vector-icons'

import { Chapter } from '../../repository/Mangadex'

interface ChapterHeaderProps {
  chapter: Chapter,
  navigation: any,
  open: boolean
}

const ChapterHeader: FC<ChapterHeaderProps> = ({ chapter, navigation, open }) => {
  const animation = useRef(new Animated.Value(-200)).current
  const number = chapter.number

  const handlePress = () => { navigation.goBack() }

  useEffect(() => {
    if (open) {
      Animated.timing(animation, {
        duration: 200,
        toValue: 0,
        useNativeDriver: true
      }).start()
    } else {
      Animated.timing(animation, {
        duration: 200,
        toValue: -200,
        useNativeDriver: true,
      }).start()
    }
  }, [open])

  return (
    <Animated.View 
      style={[
        style.headerContainer,
        { transform: [
          { translateY: animation },
        ]}
      ]}
    >
      <View style={style.wrapper}>
        
        <Pressable onPress={handlePress} style={style.backButton}>
          <MaterialIcons
            name="arrow-back-ios"
            color="#FFF"
            size={25}
          />
        </Pressable>

        <View style={style.centerText}>
          <Text numberOfLines={1} style={style.headerText}>Chapter {number}</Text>
        </View>

      </View>
    </Animated.View>
  )
}

const style = StyleSheet.create({
  headerContainer: {
    position: 'absolute',
    top: 0,
    left: 0,

    width: Dimensions.get('screen').width,
    zIndex: 10,
  },

  wrapper: {
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    paddingVertical: 10,
    paddingHorizontal: 10,

    flexDirection: 'row',
    alignItems: 'center',
  },

  backButton: {
    margin: 5,
  },

  centerText: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },

  headerText: {
    color: "#FFF",
    fontSize: 20,
    marginHorizontal: 10,
  }
})

export default ChapterHeader