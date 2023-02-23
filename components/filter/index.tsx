import { type FC, useState, useCallback } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Pressable,
  type LayoutChangeEvent
} from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { useDispatch, useSelector } from 'react-redux';

import FilterPopup from './filterPopup';

import Colors, { primaryColor } from '../../constants/Colors';
import { toggleGenre } from '../../redux/actions/filter.action';
import { useGetMode } from '../../hooks/useGetMode';

interface FilterProps {
  navigation: any;
  refresh: () => void;
  showElevation: boolean;
}

interface TagsListProps {
  refreshManga: () => void;
}

const TagsList: FC<TagsListProps> = ({ refreshManga }) => {
  const dispatch = useDispatch();
  const genre = useSelector((state: any) => state.filter.genre);

  const toggleTag = useCallback((tag: string) => {
    dispatch(toggleGenre(tag));
    refreshManga() // refresh the manga
  }, []);

  return (
    <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
      {Object.entries(genre as Record<string, boolean>).map(
        ([value, selected]: [string, boolean], index: number) => (
          <Pressable
            key={index}
            onPress={() => {
              toggleTag(value);
            }}
          >
            <View
              style={[
                style.tag,
                {
                  backgroundColor: selected ? primaryColor : '#ecf0f1',
                },
              ]}
            >
              <Text
                style={{
                  fontSize: 10,
                  color: selected ? '#FFF' : '#000',
                }}
              >
                {value}
              </Text>
            </View>
          </Pressable>
        )
      )}
    </ScrollView>
  );
};

const Filter: FC<FilterProps> = ({ navigation, refresh, showElevation }) => {
  const mode = useGetMode();

  const [open, toggle] = useState<boolean>(false);

  const openPopup = () => {
    toggle(true);
  };
  const closePopup = () => {
    toggle(false);
  };

  const handlePress = () => {
    openPopup();
  };

  return (
    <>
      <View style={[style.container , { elevation: showElevation ? 5 : 0 }]}>
        <TouchableOpacity onPress={handlePress}>
          <View style={style.touchable}>
            <AntDesign name="filter" size={15} color={'#FFF'} />
            <Text style={{ fontSize: 12, color: '#FFF' }}>Filter</Text>
          </View>
        </TouchableOpacity>

        {/**Tags list**/}
        <TagsList refreshManga={refresh}/>
      </View>

      {/**FILTER BOTTOM SHEET**/}
      <FilterPopup {...{ open, close: closePopup, refresh }} />
    </>
  );
};

const style = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',

    width: '100%',

    padding: 10,
    backgroundColor: '#FFFFFF',
  },

  touchable: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: primaryColor,
    padding: 5,
    borderRadius: 20,
  },

  tag: {
    justifyContent: 'center',
    alignItems: 'center',

    padding: 5,
    borderRadius: 10,
    marginHorizontal: 2.5,
  }
});

export default Filter;
