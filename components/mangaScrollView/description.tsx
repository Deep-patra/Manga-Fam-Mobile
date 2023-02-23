import { type FC, useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  type NativeSyntheticEvent,
  type TextLayoutEventData,
} from 'react-native';
import { primaryColor } from '../../constants/Colors';

import { Manga } from '../../repository/Mangadex';

interface DescriptionProps {
  manga: Manga;
}

const Description: FC<DescriptionProps> = ({ manga }) => {
  const description = manga.getDescripiton();

  const [lines, setLines] = useState<number>(0);
  const [hide, change] = useState<boolean>(true);

  const handleTextLayout = (event: NativeSyntheticEvent<TextLayoutEventData>) => {
    const lines = event.nativeEvent.lines;
    setLines(lines.length);
  };

  const handlePress = () => {
    if (hide) change(false)
    else change(true)
  };

  return (
    <View style={style.description}>
      <Text numberOfLines={hide ? 5 : 0} onTextLayout={handleTextLayout} style={style.text}>
        {description}
      </Text>
      {lines > 5 ? 
      <Pressable onPress={handlePress}>
        <Text style={style.textHide} >
          {hide ? "Show more" : "Show less"}
        </Text>
      </Pressable> : null}
    </View>
  );
};

const style = StyleSheet.create({
  description: {
    paddingVertical: 10,
  },

  text: {
    fontSize: 12,
    color: 'gray',
  },

  textHide: {
    color: primaryColor,
    fontSize: 10,
    fontWeight: "600",
    textDecorationLine: 'underline',
  }
});

export default Description;
