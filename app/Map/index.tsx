import { CustomMarker } from 'components/CustomMarker';
import { MapFooter } from 'components/MapFooter';
import { MapHeader } from 'components/Mapheader';
import { ThemedView } from 'components/ThemedView';
import { useState } from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { useAppDispatch, useTypedSelector } from 'services/store';
import { setSelectedMarker } from 'services/store/slices/dataReducer';

export type CustomMarker = {
  latitude: number;
  longitude: number;
  onFocus: boolean;
  distance?: string;
  name?: string;
};

export const MapScreen = () => {
  const dispatch = useAppDispatch();
  const selectedMarker = useTypedSelector((state) => state.data.selectedMarker);
  const [isMapReady, setMapReady] = useState(false);
  const [customMarkers, setCustomMarkers] = useState<CustomMarker[]>([
    {
      latitude: -12.44508582481455,
      longitude: 130.8874243402795,
      onFocus: false,
      distance: '125m',
      name: 'Spot 1',
    },
    {
      latitude: -12.450155695113512,
      longitude: 130.85720655459016,
      onFocus: false,
      distance: '150m',
      name: 'Spot 2',
    },
    {
      latitude: -12.442039572636297,
      longitude: 130.86431902215088,
      onFocus: false,
      distance: '175m',
      name: 'Spot 3',
    },
    {
      latitude: -12.44367809110553,
      longitude: 130.85137192343004,
      onFocus: false,
      distance: '200m',
      name: 'Spot 4',
    },
    {
      latitude: -12.464277534350849,
      longitude: 130.88981711594388,
      onFocus: false,
      distance: '250m',
      name: 'Spot 5',
    },
  ]);

  const handleMarkerPress = (index: number) => {
    setCustomMarkers((prevMarkers) => {
      const updated = prevMarkers.map((marker, i) => ({
        ...marker,
        onFocus: i === index ? !marker.onFocus : false,
      }));

      const isNowFocused = updated[index]?.onFocus;

      const tempData = isNowFocused ? getNearestData(index) : [];
      dispatch(setSelectedMarker(tempData));

      return updated;
    });
  };

  const getNearestData = (index: number): CustomMarker[] => {
    const current = customMarkers[index];

    let next: CustomMarker;

    if (index + 1 < customMarkers.length) {
      next = customMarkers[index + 1];
    } else if (index - 1 >= 0) {
      next = customMarkers[index - 1];
    } else {
      return [current];
    }

    return [current, next];
  };

  return (
    <ThemedView>
      {!isMapReady && (
        <View className="absolute inset-0 z-10 items-center justify-center bg-white">
          <ActivityIndicator size="large" color="white" />
        </View>
      )}

      <MapView
        initialRegion={{
          latitude: -12.450779573894252,
          longitude: 130.87287044335204,
          latitudeDelta: 0.05,
          longitudeDelta: 0.05,
        }}
        onMapReady={() => setMapReady(true)}
        provider={PROVIDER_GOOGLE}
        style={styles.map}>
        {customMarkers.map((marker, index) => (
          <Marker
            key={index}
            coordinate={{
              latitude: marker.latitude,
              longitude: marker.longitude,
            }}
            onPress={() => handleMarkerPress(index)}>
            <CustomMarker index={index} marker={marker} />
          </Marker>
        ))}
      </MapView>
      <View className="absolute top-14 mx-4 w-11/12">
        <MapHeader />
      </View>
      <View className="absolute bottom-0 w-full">
        <MapFooter />
      </View>
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  map: {
    height: '100%',
    width: '100%',
  },
});
