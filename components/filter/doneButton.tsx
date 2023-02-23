import { type FC } from 'react'
import { TouchableOpacity, Text, StyleSheet } from 'react-native'

import Colors, { primaryColor } from '../../constants/Colors'

interface DoneButtonProps {
  refresh: () => void;
  close: () => void;
}

const DoneButton: FC<DoneButtonProps> = ({ refresh, close }) => {
  const handlePress = () => {
    close() // Close the filter popup
    refresh() // Refresh the manga
  }

  return (
    <TouchableOpacity style={style.container} onPress={handlePress}>
      <Text style={style.buttonText}>Done</Text>
    </TouchableOpacity>
  )
}

const style = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',

    paddingVertical: 5,
    backgroundColor: primaryColor,

    margin: 5,
    borderRadius: 5,
  },

  buttonText: {
    fontSize: 15,
    color: 'white'
  }
})

export default DoneButton