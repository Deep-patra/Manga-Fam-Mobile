import { type FC } from 'react';
import {
  SafeAreaView,
  ActivityIndicator,
  View,
  ScrollView,
  StyleSheet,
  Dimensions,
} from 'react-native';
import {} from '@react-navigation/native-stack';

import { useGetMangaWithVolume } from '../hooks/useGetMangaAndChapters';
import { primaryColor } from '../constants/Colors';

import MangaScrollView from '../components/mangaScrollView';

interface ScreenProps {
  navigation: any;
  route: any;
}

const Screen: FC<ScreenProps> = ({ navigation, route }) => {
  const { manga, loading } = useGetMangaWithVolume(route.params?.mangaID);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#FFFFFF" }}>
      {loading && !manga ? (
        <View style={style.loadingContainer}>
          <ActivityIndicator size="large" color={primaryColor} />
        </View>
      ) : manga ? (
        <MangaScrollView {...{ navigation, manga }} />
      ) : null}
    </SafeAreaView>
  );
};

const style = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',

    minHeight: Dimensions.get('screen').height - 100,
  },
});

export default Screen;
