import { type FC, useState, useCallback } from 'react';
import { ScrollView, RefreshControl, type NativeSyntheticEvent, type NativeScrollEvent } from 'react-native';
import { useSelector } from 'react-redux';

import Filter from '../filter';
import MangaList from '../mangaList';
import Header from './header';

import Colors, { primaryColor } from '../../constants/Colors';
import { useGetMangas } from '../../hooks/useGetMangas';

interface HomeScrollViewProps {
  navigation: any;
}

const HomeScrollView: FC<HomeScrollViewProps> = ({ navigation }) => {
  const mangas = useSelector((state: any) => state.manga.mangas)

  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [reachBottom, setReachBottom] = useState<boolean>(false);
  const [showElevation, setElevation] = useState<boolean>(false)

  const showFilterElevation = () => {
   setElevation(true)
  }

  const hideFilterElevation = () => {
   setElevation(false)
  }

  // fetch manga hook
  useGetMangas(refreshing, reachBottom, setRefreshing);

  const scrollHandler = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const nativeEvent = event.nativeEvent;

   // if the container scrolled by 70px show elevation
   if (nativeEvent.contentOffset.y >= 70) !showElevation ? showFilterElevation() : null
   else showElevation ? hideFilterElevation() : null

    if (
      nativeEvent.contentOffset.y >=
      nativeEvent.contentSize.height - nativeEvent.layoutMeasurement.height - 400
    ) {
      !reachBottom && setReachBottom(true);
    } else reachBottom && setReachBottom(false);
  };

  const onRefresh = useCallback(() => {
    setRefreshing(true);
  }, []);

  return (
    <ScrollView
      onScroll={scrollHandler}
      stickyHeaderIndices={[1]}
      style={{ backgroundColor: '#FFF' }}
      refreshControl={
        <RefreshControl
          colors={[primaryColor]}
          refreshing={refreshing}
          onRefresh={onRefresh}
        />
      }
    >
      <Header {...{ navigation }} />
      <Filter {...{ navigation, refresh: onRefresh, showElevation, }} />
      <MangaList {...{ navigation, mangas }} />
    </ScrollView>
  );
};

export default HomeScrollView;
