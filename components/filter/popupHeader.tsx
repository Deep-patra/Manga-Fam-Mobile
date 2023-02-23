import { type FC } from 'react';
import { AntDesign } from '@expo/vector-icons';
import { useDispatch } from 'react-redux';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

import Colors from '../../constants/Colors';
import { resetFilter } from '../../redux/actions/filter.action';

interface PopupHeaderProps {
  mode: 'light' | 'dark';
}

const PopupHeader: FC<PopupHeaderProps> = ({ mode }) => {
  const dispatch = useDispatch();

  const handleReset = () => {
    dispatch(resetFilter());
  };

  return (
    <View style={[style.header, { borderBottomColor: Colors[mode].tabIconDefault }]}>
      <View style={{ flexDirection: 'row' }}>
        <AntDesign name="filter" color={Colors[mode].tabIconDefault} size={25} />

        <Text style={[style.headerText, { color: Colors[mode].text }]}>Filters</Text>
      </View>

      {/**Reset button*/}
      <TouchableOpacity onPress={handleReset}>
        <Text style={[style.resetText, { color: Colors[mode].primaryColor }]}>Reset</Text>
      </TouchableOpacity>
    </View>
  );
};

const style = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',

    padding: 5,
    paddingVertical: 10,
    borderBottomWidth: 1,
  },

  headerText: {
    fontSize: 15,
    marginHorizontal: 5,
  },

  resetText: {
    fontSize: 15,
  },
});

export default PopupHeader;
