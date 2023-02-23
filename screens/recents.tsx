import type { FC } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialIcons } from '@expo/vector-icons';
import { primaryColor } from '../constants/Colors';

import RecentList from '../components/recentsList';

interface RecentsProps {
  navigation: any;
}

interface RecentHeaderProps {
  goBack: () => void;
}

const RecentHeader: FC<RecentHeaderProps> = ({ goBack }) => {
  return (
    <View style={style.headerContainer}>
      <TouchableOpacity onPress={goBack}>
        <MaterialIcons name="arrow-back-ios" color={primaryColor} size={23} />
      </TouchableOpacity>

      <Text style={style.headerText}>Recents</Text>

      <TouchableOpacity>
        <MaterialIcons name="filter-list" color={primaryColor} size={25} />
      </TouchableOpacity>
    </View>
  );
};

const Recents: FC<RecentsProps> = ({ navigation }) => {
  const goBack = () => {
    navigation.goBack();
  };

  return (
    <SafeAreaView style={style.container}>
      <RecentHeader {...{ goBack }} />
      <RecentList navigation={navigation} />
    </SafeAreaView>
  );
};

const style = StyleSheet.create({
  container: {
    flex: 1,
  },

  headerContainer: {
    height: 50,
    padding: 10,

    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  headerText: {
    color: primaryColor,
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default Recents;
