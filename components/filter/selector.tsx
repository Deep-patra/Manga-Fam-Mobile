import { type FC, memo } from 'react'
import { View, Text, Pressable, StyleSheet } from 'react-native'
import { Entypo, AntDesign } from '@expo/vector-icons'

import Colors, { primaryColor } from '../../constants/Colors'

interface SelectorProps {
  mode: 'light' | 'dark',
  header: string,
  items: Record<string, boolean>,
  toggle: (value: string) => void,
}

const FilterSelector: FC<SelectorProps> = ({ mode, header, items, toggle }) => {

  if (items === null) return null

  return (
    <View style={style.selectorContainer}>
      <Text style={style.header}>
        {header}
      </Text>

      {
        Object.entries(items).map(([value, selected]: [string, boolean]) => (
          <Pressable key={value} onPress={() => { toggle(value) }}>
            <View style={style.checkbox}>
              {
                selected ? 
                <AntDesign name="checkcircle" size={25} color={primaryColor} /> :
                <Entypo name="circle" size={25} color={Colors[mode].tabIconDefault} />
              }
              <Text 
                style={[ 
                  style.checkboxLabel,
                  { color: selected ? primaryColor : Colors[mode].text }  
                ]}
              >
                {value}
              </Text>
            </View>
          </Pressable>
        ))
      }
    </View>
  )
}

const style = StyleSheet.create({
  selectorContainer: {
    flexDirection: 'column',
    paddingVertical: 5,
    paddingHorizontal: 5,
  },

  header: {
    color: primaryColor,

    borderLeftWidth: 2,
    borderLeftColor: primaryColor,

    fontSize: 15,
    fontWeight: "600",
    
    paddingLeft: 10,
  },

  checkbox: {
    flexDirection: 'row',
    alignItems: 'center',
    
    marginVertical: 5,
    paddingHorizontal: 5,
  },

  checkboxLabel: {
    padding: 5,
  }
})

export default memo(FilterSelector)