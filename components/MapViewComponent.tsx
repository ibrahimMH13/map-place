import { StyleSheet, View, Dimensions } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

export const MapViewComponent = () => {
  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: 51.3397, 
          longitude: 12.3731,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
        <Marker
          coordinate={{ latitude: 51.3397, longitude: 12.3731 }}
          title="Leipzig"
          description="Test Marker"
        />
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
      },
      map: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
      },
    
})


export default MapViewComponent;
