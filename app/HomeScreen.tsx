import React, { useState } from "react";
import { View, StyleSheet, Dimensions } from "react-native";
import MapView, { Marker } from "react-native-maps";
import SearchBar from "../components/SearchBar";
import HistoryList from "../components/HistoryList";
import { saveHistory } from "../utils/storage";

const INITIAL_REGION = {
  latitude: 51.3397,
  longitude: 12.3731,
  latitudeDelta: 0.08,
  longitudeDelta: 0.08,
};

export default function HomeScreen() {
  const [region, setRegion] = useState(INITIAL_REGION);
  const [selectedPlace, setSelectedPlace] = useState<any>(null);

  const handleSelect = (item: any) => {
    const lat = parseFloat(item.lat || item.latitude);
    const lon = parseFloat(item.lon || item.longitude);
    setRegion({
      ...region,
      latitude: lat,
      longitude: lon,
    });
    setSelectedPlace(item);
    saveHistory(item);
  };

  return (
    <View style={{ flex: 1 }}>
      <SearchBar onSelect={handleSelect} />
      <HistoryList onSelect={handleSelect} />
      <MapView
        style={styles.map}
        region={region}
        onRegionChangeComplete={setRegion}
      >
        {selectedPlace && (
          <Marker
            coordinate={{
              latitude: parseFloat(selectedPlace.lat || selectedPlace.latitude),
              longitude: parseFloat(selectedPlace.lon || selectedPlace.longitude),
            }}
            title={selectedPlace.display_name}
          />
        )}
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  map: { width: Dimensions.get('window').width, height: Dimensions.get('window').height, marginTop: 12 },
});
