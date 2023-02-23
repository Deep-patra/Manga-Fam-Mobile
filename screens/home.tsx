import { type FC } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaView } from 'react-native-safe-area-context';

import Search from './search';
import HomeScrollView from '../components/homeScrollView.tsx';

import { useGetMode } from '../hooks/useGetMode';
import { useInitializeReadManga } from '../hooks/useInitializeReadmanga';
import Colors from '../constants/Colors';

const Stack = createNativeStackNavigator();

const Home: FC<{ navigation: any }> = ({ navigation }) => {
  const mode = useGetMode();

  // Initialize the Redux store with read mangas
  useInitializeReadManga();

  return (
    <SafeAreaView>
      <HomeScrollView {...{ navigation }} />
    </SafeAreaView>
  );
};

const Screen = () => {
  return (
    <Stack.Navigator
      initialRouteName="MangaFeed"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="MangaFeed" component={Home} />
      <Stack.Screen name="Search" component={Search} />
    </Stack.Navigator>
  );
};

export default Screen;
