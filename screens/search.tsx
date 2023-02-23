import type { FC } from 'react';
import { useState } from 'react';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import {
  View,
  TextInput,
  Text,
  StyleSheet,
  TouchableOpacity,
  Pressable,
  ScrollView,
  Image,
  type NativeSyntheticEvent,
  type TextInputChangeEventData,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Manga } from '../repository/Mangadex';

import Colors, { iconColor, primaryColor } from '../constants/Colors';
import { useGetMode } from '../hooks/useGetMode';
import { useSearchManga } from '../hooks/useSearchManga';
import { placeholder } from '@babel/types';

type SearchProps = {
  navigation: any;
};

interface SearchHeaderProps {
  goBack: () => void;
}

interface SearchInputProps {
  value: string;
  setValue: (value: string) => void;
}

interface ResultMangaListProps {
 mangas: Manga[],
 navigate: (mangaID: string) => void
}

const ResultMangaList: FC<ResultMangaListProps> = ({ mangas, navigate }) => {
 return (
  <ScrollView style={listStyle.scrollContainer}>
   {
    mangas && mangas.length > 0 ? (
     mangas.map((manga: Manga, index: number) => (
      <TouchableOpacity 
       key={index}
       onPress={() => { navigate(manga.id) }}
      >
       <View style={listStyle.item}>
        <Image
           source={{
            uri: manga.getCover()?.small,
           }}
           style={{ width: 70, height: 100 }}
        />
        <View style={listStyle.titleContainer}>
         <Text numberOfLines={2} style={listStyle.title} >{manga.getTitle() || "No Title is available"}</Text>
         <Text numberOfLines={1} style={listStyle.author}>{manga.getAuthorName() || "Author Name is not available"}</Text>
        </View>
       </View>
      </TouchableOpacity>
     ))
    ) : null
   }
  </ScrollView>
 )
}

const listStyle = StyleSheet.create({
 scrollContainer: {
  width: "100%",
 },

 item: {
  flexDirection: 'row',
  padding: 5,
 },

 titleContainer: {
  flexDirection: 'column',

  paddingHorizontal: 10,
 },

 title: {
  color: "black",
  fontSize: 12,
  width: 200,
 },

 author: {
  color: "gray",
  fontSize: 10,
 }
})

const SearchInput: FC<SearchInputProps> = ({ value, setValue }) => {
  const changeHandler = (e: NativeSyntheticEvent<TextInputChangeEventData>) => {
    const new_value = e.nativeEvent.text

    setValue(new_value);
  };

  const resetHandler = (e: any) => {
    if (value !== '') setValue('');
  };

  return (
    <View style={style.inputContainer}>
      <Ionicons name="ios-search-outline" color={primaryColor} size={23} />

      <TextInput
        value={value}
        onChange={changeHandler}
        placeholder={'Search any manga..'}
        selectionColor={primaryColor}
        style={style.input}
      />

      <Pressable onPress={resetHandler}>
        <Ionicons name="ios-close-outline" color={primaryColor} size={23} />
      </Pressable>
    </View>
  );
};

const SearchHeader: FC<SearchHeaderProps> = ({ goBack }) => {
  return (
    <View style={style.searchHeaderContainer}>
      <TouchableOpacity onPress={goBack}>
        <MaterialIcons name="arrow-back-ios" color={primaryColor} size={23} />
      </TouchableOpacity>

      <Text style={style.headerText}>Search</Text>

      <View style={{ width: 30, height: 30 }}></View>
    </View>
  );
};

const Search: FC<SearchProps> = ({ navigation }) => {
  const [value, changeValue] = useState<string>('');
  const mode = useGetMode();

  const { loading, mangas } = useSearchManga(value)

  const goBack = () => {
    navigation.goBack();
  };

  const goToManga = (mangaID: string) => {
   navigation.navigate("Manga", { mangaID })
  }

  const setValue = (value: string) => {
    changeValue(value);
  };

  return (
    <SafeAreaView style={style.container}>
      <SearchHeader {...{ goBack, value, setValue }} />
      <SearchInput {...{ value, setValue }} />

      {!loading && mangas.length > 0 ? 
       (
        <ResultMangaList {...{ mangas, navigate: goToManga }} />
       )
       : (value !== "" ? 
         <View style={style.placeholder}>
          <Text style={{ color: 'gray' }}>{`Searching for ${value}...`}</Text> 
         </View>
       : null) 
     }
    </SafeAreaView>
  );
};

const style = StyleSheet.create({
  container: {
    flex: 1,
  },

  searchHeaderContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',

    padding: 10,
    width: '100%',
  },

  headerText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: primaryColor,
  },

  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,

    width: '100%',
  },

  input: {
    flexGrow: 1,
    marginHorizontal: 5,
    maxWidth: '100%',
  },

  placeholder: {
   width: "100%",
   height: 200,

   flexDirection: 'row',
   alignItem: 'center',
   justifyContent: 'center',
  }
});

export default Search;
