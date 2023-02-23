import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";

import BottomNavigation from "./bottomTabs";
import MangaScreen from '../screens/manga'
import ChapterScreen from '../screens/chapter'

const RootStack = createNativeStackNavigator();

export const Navigation = () => {
  return (
    <NavigationContainer>
      <RootStack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        <RootStack.Screen name="Root" component={BottomNavigation} />
        <RootStack.Screen name="Manga" component={MangaScreen} />
        <RootStack.Screen name="Chapter" component={ChapterScreen} />
      </RootStack.Navigator>
    </NavigationContainer>
  );
};


