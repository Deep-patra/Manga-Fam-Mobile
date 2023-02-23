import { type FC } from 'react';
import { View, Pressable, Text, StyleSheet } from 'react-native';
import { AntDesign } from '@expo/vector-icons'

interface HeaderProps {
  navigation: any;
}

const Header: FC<HeaderProps> = ({ navigation }) => {
  return (
    <View style={style.header}>
      <Text>Manga Fam</Text>
      <Pressable onPress={() => navigation.navigate('Search')}>
        <AntDesign name="search1" color="#a4a4a4" style={style.searchIcon} size={23} />
      </Pressable>
    </View>
  );
};

const style = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    padding: 10,
  },

  text: {
    color: '#000',
    fontSize: 20,
  },

  searchIcon: {
    opacity: 0.8,
  },
});


export default Header