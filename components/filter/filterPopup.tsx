import { type FC } from 'react'
import { View, StyleSheet } from 'react-native'

import { useGetMode } from '../../hooks/useGetMode'

import Modal from '../modal'
import PopupHeader from './popupHeader'
import ScrollContainer from './selectorContainer'
import DoneButton from './doneButton'

interface FilterPopupProps {
  open: boolean;
  close: () => void;
  refresh: () => void;
}

interface PopupProps {
  refresh: () => void;
  close: () => void;
}


const Popup: FC<PopupProps> = ({ refresh, close }) => {
  const mode = useGetMode()
  return (
    <View style={style.container}>
      <PopupHeader {...{ mode }} />
      <ScrollContainer {...{ mode }} />
      <DoneButton {...{ refresh, close }} />
    </View>
  )
}

const FilterPopup: FC<FilterPopupProps> = ({ open, close, refresh }) => {
  return (
    <Modal {...{ open, close }}>
      <Popup {...{ refresh, close }} />
    </Modal>
  )
}

const style = StyleSheet.create({
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    
    flex: 1,
    justifyContent: 'flex-end',
  },

  container: {
    minHeight: 300,
    flex: 1,

    backgroundColor: 'white',
    paddingTop: 12,
    paddingHorizontal: 10,
    borderTopRightRadius: 12,
    borderTopLeftRadius: 12,
  },

  filterHeader: {
    fontSize: 20,
    paddingVertical: 5,
  }
})

export default FilterPopup