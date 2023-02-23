import type { FC } from 'react'
import { Ionicons, AntDesign } from '@expo/vector-icons';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import Home from '../screens/home'
import Setting from '../screens/setting'
import Library from '../screens/library';
import Recents from '../screens/recents';

import Colors, { primaryColor } from "../constants/Colors";
import { useGetMode } from "../hooks/useGetMode";

type TabBarIconProps = {
  focused: boolean,
  name: any,
  mode: 'light' | 'dark'
}


const BottomTabs = createBottomTabNavigator()

const TabBarIcon: FC<TabBarIconProps> = ({ focused, name, mode }) => {
  return (
    <Ionicons
      name={name}
      size={20}
      color={ focused ? Colors[mode].primaryColor : Colors[mode].tabIconDefault }
    />
  )
}


const BottomNavigation = () => {
  const mode = useGetMode()

  return (
    <BottomTabs.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: primaryColor
      }}
    >
      <BottomTabs.Screen 
        name="Home" 
        component={Home}
        options={{
          tabBarIcon: ({ focused }) => (
            <TabBarIcon {...{ focused, mode, name: focused ? 'home' : 'home-outline' }} />
          )
        }}
      />
      <BottomTabs.Screen 
        name="Library"
        component={Library}
        options={{
          tabBarIcon: ({ focused }) => (
            <TabBarIcon {...{ focused, mode, name: focused ? 'library' : 'library-outline' }} />
          )
        }} 
      />
      <BottomTabs.Screen 
        name="Recents" 
        component={Recents}
        options={{
          tabBarIcon: ({ focused }) => (
            <AntDesign
              name={ focused ? 'clockcircle' : 'clockcircleo' }
              size={20}
              color={ focused ? Colors[mode].primaryColor : Colors[mode].tabIconDefault }
            />
          )
        }} 
      />
      <BottomTabs.Screen 
        name="Setting" 
        component={Setting}
        options={{
          tabBarIcon: ({ focused }) => (
            <TabBarIcon {...{ focused, mode, name: focused ? 'settings' : 'settings-outline' }} />
          )
        }}
      />
    </BottomTabs.Navigator>
  )
}

export default BottomNavigation