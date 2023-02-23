import { type FC, useState } from 'react';
import {
  Image,
  View,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  ActivityIndicator,
  Text,
  Pressable,
  type NativeSyntheticEvent,
  type ImageLoadEventData,
  type GestureResponderEvent,
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import { Page } from '../../repository/Mangadex';

interface MangaPageProps {
  page: Page;
  handlePress: (event: GestureResponderEvent) => void,
}

interface RetryProps {
  handleRetry: () => void;
}

const Retry: FC<RetryProps> = ({ handleRetry }) => {
  return (
    <View style={style.retryPage}>
      <TouchableOpacity onPress={handleRetry}>
        <View style={style.retryButton}>
          <MaterialCommunityIcons name="restore" size={20} color="#000" />
          <Text style={{ color: '#000', marginHorizontal: 5 }}>Retry</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

type DIMENSION = {
  width: number;
  height: number;
};

const MangaPage: FC<MangaPageProps> = ({ page, handlePress }) => {
  const [dimension, setDimension] = useState<DIMENSION>({ width: 10000, height: 10000 });
  const [loading, setLoading] = useState<boolean>(false);
  const [complete, setComplete] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);

  const handleLoadStart = () => {
    setError(false);
    !complete && setComplete(false); // Don;t update if complete is already false
    !complete && setLoading(true); // Don't start loading if complete is already true
  };
  const handleLoadEnd = () => {
    !complete && setComplete(true);
    loading && setLoading(false);
  };

  const handleError = () => {
    setError(true);
  };

  const handleRetry = () => {
    setError(false);
  };

  const handleLoad = (event: NativeSyntheticEvent<ImageLoadEventData>) => {
    const native = event.nativeEvent;
    const [width, height] = [native.source.width, native.source.height];
    const ar = width / height; // aspect ratio

    setDimension({
      width: Dimensions.get('screen').width,
      height: (Dimensions.get('screen').width / ar),
    });
  };

  return (
    <Pressable onPress={handlePress}>
      <View style={style.page}>
        {!error ? (
          <Image
            source={{
              uri: page.getSmallPageURL(),
              cache: 'force-cache',
              headers: {"Referrer-Policy": "no-referrer"}
            }}
            onLoad={handleLoad}
            resizeMode="cover"
            onLoadStart={handleLoadStart}
            onLoadEnd={handleLoadEnd}
            onError={handleError}
            style={[
              complete ? { width: dimension.width, height: dimension.height } : style.none
            ]}
          />
        ) : (
          <Retry handleRetry={handleRetry} />
        )}
        {loading ? (
          <View style={style.loadingContainer}>
            <ActivityIndicator size="large" color="#000" />
          </View>
        ) : null}
      </View>
    </Pressable>
  );
};

const style = StyleSheet.create({
  page: {
    flex: 1,
    width: Dimensions.get('screen').width,
    minHeight: 100,

    alignItems: 'center',
    justifyContent: 'center',
  },

  loadingContainer: {
    width: Dimensions.get('screen').width,
    height: Dimensions.get('screen').height,

    backgroundColor: 'gray',
    zIndex: 5,

    alignItems: 'center',
    justifyContent: 'center',

    borderWidth: 2,
    borderColor: '#000',
  },

  none: {
    display: 'none',
  },

  retryPage: {
    width: Dimensions.get('screen').width,
    height: Dimensions.get('screen').height,

    alignItems: 'center',
    justifyContent: 'center',
  },

  retryButton: {
    flexDirection: 'row',
    alignItems: 'center',

    padding: 10,

    borderRadius: 10,
    borderWidth: 2,
  },
});

export default MangaPage;
