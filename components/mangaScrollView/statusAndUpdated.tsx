import { type FC } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { primaryColor } from '../../constants/Colors';

import { Manga } from '../../repository/Mangadex';

interface StatusContainerProps {
  manga: Manga;
}

const StatusContainer: FC<StatusContainerProps> = ({ manga }) => {
  const status = manga.getStatus();
  const updatedAt = new Date(manga.getUpdatedDate());

  return (
    <View style={style.container}>
      <View style={style.subContainer} >
        <Text style={style.headerText}>Status</Text>
        <Text style={style.valueText}>{`${status[0].toUpperCase()}${status.slice(1)}`}</Text>
      </View>

      <View style={style.subContainer}>
        <Text style={style.headerText}>Updated At</Text>
        <Text style={style.valueText}>{`${updatedAt.getDate()}-${updatedAt.getMonth()}-${updatedAt.getFullYear()}`}</Text>
      </View>
    </View>
  );
};

const style = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },

  subContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',

    padding: 20,
  },

  headerText: {
    fontSize: 10,
    color: "#A4A4A4",
  },

  valueText: {
    color: primaryColor,
    fontSize: 16,
  }
})

export default StatusContainer;
