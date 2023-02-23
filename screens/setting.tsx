import type { FC } from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { MaterialIcons } from '@expo/vector-icons'

import { primaryColor } from '../constants/Colors'

interface SettingProps {
 navigation: any
}

interface SettingHeaderProps {
 goBack: () => void
}

const SettingHeader: FC<SettingHeaderProps> = ({ goBack }) => {
 return (
  <View style={style.settingHeader}>
   <TouchableOpacity onPress={goBack}>
    <MaterialIcons
     name="arrow-back-ios"
     color={primaryColor}
     size={23}
    />
   </TouchableOpacity>

   <Text style={style.settingHeaderText}>
    Settings
   </Text>

   <View style={{ width: 23, height: 23 }}></View>
  </View>
 )
}

const Setting: FC<SettingProps> = ({ navigation }) => {
 
 const goBack = () => {
  navigation.goBack()
 }
 
 return (
    <SafeAreaView style={style.container}>
      <SettingHeader {...{ goBack }} />
    </SafeAreaView>
  )
}

const style = StyleSheet.create({
 container: {
  flex: 1,
 },

 settingHeader: {
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',

  padding: 10,
  height: 50,
 },

 settingHeaderText: {
  color: primaryColor,
  fontSize: 16,
  fontWeight: 'bold',
 }
})

export default Setting
