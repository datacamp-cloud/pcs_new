import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  Platform,
} from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import { useRouter } from 'expo-router';
import Ionicons from '@expo/vector-icons/Ionicons';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';

// clé API Google Maps
const GOOGLE_MAPS_API_KEY = 'TA_CLE_API_ICI';

export default function LocationScreen() {
  const [location, setLocation] = useState<Location.LocationObject | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const mapRef = useRef<MapView>(null);

  const [region, setRegion] = useState({
    latitude: 0,
    longitude: 0,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
  });

  useEffect(() => {(async () => {

      let { status } = await Location.requestForegroundPermissionsAsync();

      if (status !== 'granted') {
        alert('Permission refusée pour accéder à la localisation');
        return;
      }

      let loc = await Location.getCurrentPositionAsync({});

      setLocation(loc);
      setRegion({
        latitude: loc.coords.latitude,
        longitude: loc.coords.longitude,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      });
      
      setLoading(false);
    })();
  }, []);

  const goToLocation = (latitude: number, longitude: number) => {
    const newRegion = {
      latitude,
      longitude,
      latitudeDelta: 0.01,
      longitudeDelta: 0.01,
    };
    setRegion(newRegion);
    mapRef.current?.animateToRegion(newRegion);
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="chevron-back" size={24} color="#19203D" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Chercher un point de vente</Text>
        <View style={{ width: 24 }} />
      </View>

      {/* Barre de recherche Google */}
      <GooglePlacesAutocomplete
        placeholder="Rechercher un lieu..."
        fetchDetails
        onPress={(data, details = null) => {
          const { lat, lng } = details?.geometry.location!;
          goToLocation(lat, lng);
        }}
        query={{
          key: GOOGLE_MAPS_API_KEY,
          language: 'fr',
        }}
        styles={{
          container: styles.searchContainer,
          textInput: styles.searchInput,
        }}
        enablePoweredByContainer={false}
      />

      {/* Carte */}
      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#E93F69" />
          <Text>Chargement de la carte...</Text>
        </View>
      ) : (
        <MapView
          ref={mapRef}
          style={styles.map}
          region={region}
          onRegionChangeComplete={(r) => setRegion(r)}
          showsUserLocation
        >
          {/* Points de vente simulés */}
          <Marker
            coordinate={{
              latitude: region.latitude + 0.002,
              longitude: region.longitude + 0.002,
            }}
            title="Point de vente 1"
            description="Boutique partenaire"
          />
          <Marker
            coordinate={{
              latitude: region.latitude - 0.002,
              longitude: region.longitude - 0.002,
            }}
            title="Point de vente 2"
            description="Distributeur PCS"
          />
        </MapView>
      )}

      {/* Boutons flottants */}
      <View style={styles.controls}>
        <TouchableOpacity
          style={styles.controlButton}
          onPress={() => {
            if (location) {
              const { latitude, longitude } = location.coords;
              const newRegion = {
                latitude,
                longitude,
                latitudeDelta: 0.01,
                longitudeDelta: 0.01,
              };
              setRegion(newRegion);
              mapRef.current?.animateToRegion(newRegion);
            }
          }}
        >
          <Ionicons name="locate-outline" size={20} color="#fff" />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.controlButton}
          onPress={() =>
            setRegion((prev) => ({
              ...prev,
              latitudeDelta: prev.latitudeDelta / 2,
              longitudeDelta: prev.longitudeDelta / 2,
            }))
          }
        >
          <Ionicons name="add-outline" size={20} color="#fff" />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.controlButton}
          onPress={() =>
            setRegion((prev) => ({
              ...prev,
              latitudeDelta: prev.latitudeDelta * 2,
              longitudeDelta: prev.longitudeDelta * 2,
            }))
          }
        >
          <Ionicons name="remove-outline" size={20} color="#fff" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    zIndex: 2,
    backgroundColor: '#fff',
    paddingTop: Platform.OS === 'android' ? 40 : 60,
    paddingBottom: 10,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#19203D',
  },
  searchContainer: {
    position: 'absolute',
    top: Platform.OS === 'android' ? 90 : 110,
    width: '90%',
    alignSelf: 'center',
    zIndex: 5,
  },
  searchInput: {
    borderRadius: 30,
    backgroundColor: '#fff',
    paddingHorizontal: 15,
    height: 44,
    fontSize: 14,
    borderColor: '#ccc',
    borderWidth: 1,
  },
  map: {
    flex: 1,
  },
  controls: {
    position: 'absolute',
    right: 15,
    bottom: 30,
    flexDirection: 'column',
    gap: 10,
    zIndex: 10,
  },
  controlButton: {
    backgroundColor: '#E93F69',
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
