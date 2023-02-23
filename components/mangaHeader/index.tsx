import { type FC } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { AntDesign } from '@expo/vector-icons';

import { Manga } from '../../repository/Mangadex';

interface HeaderProps {
  navigation: any,
  show: boolean,
  manga: Manga,
}

const Header: FC<HeaderProps> = ({ navigation, show, manga }) => {
  const handlePress = () => {
    navigation.goBack();
  };

  return (
    <View 
      style={[
        style.header,
        { backgroundColor: show ? 'rgba(0, 0, 0, 0.8)' : 'transparent' }
      ]}
    >
      <TouchableOpacity onPress={handlePress}>
        <View style={style.button}>
          <AntDesign name="arrowleft" color="#FFFFFF" size={25} />
        </View>
      </TouchableOpacity>

      {
        show ? (
          <Text numberOfLines={1} style={style.title}>{manga.getTitle()}</Text>
        ) : null
      }
    </View>
  );
};

const style = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',

    padding: 10,
  },

  button: {
    alignItems: 'center',
    justifyContent: 'center',

    padding: 5,
    
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    borderRadius: 100,
  },

  title: {
    color: "#FFF",
    fontSize: 15,
    paddingHorizontal: 10,
  }
});

export default Header;
