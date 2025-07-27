import SearchBar from "@/components/CSearchBar";
import StoreMarkers from "@/components/StoreMarkers";
import { Ionicons } from "@expo/vector-icons";
import * as Location from "expo-location";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  Alert,
  Linking,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";
import { SafeAreaView } from "react-native-safe-area-context";

const MapsPage = () => {
  const router = useRouter();
  const [currentLocation, setCurrentLocation] = useState({
    latitude: 36.8065,
    longitude: 10.1815,
  });
  const [mapRegion, setMapRegion] = useState({
    latitude: 36.8065,
    longitude: 10.1815,
    latitudeDelta: 2.5,
    longitudeDelta: 2.5,
  });
  const [zoomLevel, setZoomLevel] = useState(2.5);

  // Legend data for store types
  const storeTypes = [
    {
      category: "Supermarket",
      icon: "storefront",
      color: "#FF6B6B",
      count: 2,
    },
    {
      category: "Retail",
      icon: "bag",
      color: "#4ECDC4",
      count: 1,
    },
    {
      category: "Hypermarket",
      icon: "business",
      color: "#45B7D1",
      count: 2,
    },
    {
      category: "Shopping Mall",
      icon: "location",
      color: "#96CEB4",
      count: 2,
    },
    {
      category: "General Store",
      icon: "home",
      color: "#FFEAA7",
      count: 1,
    },
  ];

  // Tunisia stores data
  const tunisiaStores = [
    {
      id: 1,
      name: "Carrefour Tunis",
      address: "Avenue Habib Bourguiba, Tunis",
      latitude: 36.8065,
      longitude: 10.1815,
      phone: "+216 71 123 456",
      category: "Supermarket",
    },
    {
      id: 2,
      name: "Monoprix Sousse",
      address: "Avenue Bourguiba, Sousse",
      latitude: 35.8256,
      longitude: 10.6369,
      phone: "+216 73 987 654",
      category: "Retail",
    },
    {
      id: 3,
      name: "Géant Sfax",
      address: "Route de Tunis, Sfax",
      latitude: 34.7406,
      longitude: 10.7603,
      phone: "+216 74 456 789",
      category: "Hypermarket",
    },
    {
      id: 4,
      name: "Aziza Mall Bizerte",
      address: "Center Ville, Bizerte",
      latitude: 37.2746,
      longitude: 9.8739,
      phone: "+216 72 555 123",
      category: "Shopping Mall",
    },
    {
      id: 5,
      name: "Magasin Général Kairouan",
      address: "Medina, Kairouan",
      latitude: 35.6781,
      longitude: 10.0963,
      phone: "+216 77 333 888",
      category: "General Store",
    },
    {
      id: 6,
      name: "Carrefour Nabeul",
      address: "Centre Ville, Nabeul",
      latitude: 36.4561,
      longitude: 10.7376,
      phone: "+216 72 222 333",
      category: "Supermarket",
    },
    {
      id: 7,
      name: "Mall of Monastir",
      address: "Zone Touristique, Monastir",
      latitude: 35.7643,
      longitude: 10.8113,
      phone: "+216 73 444 555",
      category: "Shopping Mall",
    },
    {
      id: 8,
      name: "Géant Gabès",
      address: "Centre Ville, Gabès",
      latitude: 33.8815,
      longitude: 10.0982,
      phone: "+216 75 666 777",
      category: "Hypermarket",
    },
  ];

  useEffect(() => {
    getCurrentLocation();
  }, []);

  const getCurrentLocation = async () => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        Alert.alert(
          "Permission denied",
          "Location permission is required to show your current location"
        );
        return;
      }

      const location = await Location.getCurrentPositionAsync({});
      const { latitude, longitude } = location.coords;

      setCurrentLocation({ latitude, longitude });
    } catch (error) {
      console.error("Error getting location:", error);
      Alert.alert("Error", "Could not get your current location");
    }
  };

  const onRegionChange = (region) => {
    setZoomLevel(region.latitudeDelta);
  };

  const onSettingsPress = () => {
    router.push("/settings");
  };

  const onCartPress = () => {
    router.push("/cart");
  };

  const onLocationPress = () => {
    if (currentLocation) {
      setMapRegion({
        latitude: currentLocation.latitude,
        longitude: currentLocation.longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      });
    } else {
      getCurrentLocation();
    }
  };

  const makePhoneCall = (phoneNumber) => {
    const url = `tel:${phoneNumber}`;
    Linking.canOpenURL(url)
      .then((supported) => {
        if (supported) {
          Linking.openURL(url);
        } else {
          Alert.alert("Error", "Phone calling is not supported on this device");
        }
      })
      .catch((err) => console.error("Error making phone call:", err));
  };

  const openGoogleMaps = (latitude, longitude, name) => {
    const url = `https://www.google.com/maps/dir/?api=1&destination=${latitude},${longitude}&destination_place_id=${name}`;

    Linking.canOpenURL(url)
      .then((supported) => {
        if (supported) {
          Linking.openURL(url);
        } else {
          Alert.alert("Error", "Google Maps is not available on this device");
        }
      })
      .catch((err) => console.error("Error opening Google Maps:", err));
  };

  const onStorePress = (store) => {
    Alert.alert(
      store.name,
      `${store.address}\nPhone: ${store.phone}\nCategory: ${store.category}`,
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Navigate",
          onPress: () =>
            openGoogleMaps(store.latitude, store.longitude, store.name),
        },
        {
          text: "Call",
          onPress: () => makePhoneCall(store.phone),
        },
      ]
    );
  };

  return (
    <SafeAreaView style={{ flex: 1 }} edges={["top"]}>
      <View style={styles.header}>
        <TouchableOpacity onPress={onSettingsPress}>
          <Ionicons name="settings" style={styles.icon} />
        </TouchableOpacity>

        <TouchableOpacity>
          <Text style={styles.title}>Maps</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={onCartPress}>
          <Ionicons name="cart-outline" style={styles.icon} />
        </TouchableOpacity>
      </View>
      <SearchBar placeholder="Search stores ...."></SearchBar>

      {/* Legend Section */}
      <View style={styles.legendContainer}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.legendScrollContent}
        >
          {storeTypes.map((type, index) => (
            <View key={index} style={styles.legendItem}>
              <View
                style={[
                  styles.legendIcon,
                  { borderColor: type.color, backgroundColor: "white" },
                ]}
              >
                <Ionicons name={"map"} size={16} color={type.color} />
              </View>
              <Text style={styles.legendText}>{type.category}</Text>
              <Text style={styles.legendCount}>({type.count})</Text>
            </View>
          ))}

          {/* Current Location Legend */}
          <View style={styles.legendItem}>
            <View style={styles.currentLocationLegend}>
              <Ionicons name="location" size={16} color="#007AFF" />
            </View>
            <Text style={styles.legendText}>You</Text>
          </View>
        </ScrollView>
      </View>

      <View style={styles.mapContainer}>
        <MapView
          style={styles.map}
          initialRegion={mapRegion}
          region={mapRegion}
          provider={PROVIDER_GOOGLE}
          showsUserLocation={false}
          showsMyLocationButton={false}
          followsUserLocation={false}
          mapType="standard"
          pitchEnabled={true}
          rotateEnabled={true}
          scrollEnabled={true}
          zoomEnabled={true}
          onRegionChange={onRegionChange}
        >
          <StoreMarkers
            stores={tunisiaStores}
            onStorePress={onStorePress}
            currentLocation={currentLocation}
            zoomLevel={zoomLevel}
          />
        </MapView>

        <TouchableOpacity
          style={styles.locationButton}
          onPress={onLocationPress}
        >
          <Ionicons name="locate" size={24} color="#007AFF" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default MapsPage;

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderBottomColor: "#ccc",
    borderBottomWidth: 1.5,
  },

  title: {
    fontSize: 20,
    fontWeight: "600",
    color: "#000",
    textAlign: "center",
  },

  icon: {
    backgroundColor: "#89A2E6FF",
    borderRadius: 20,
    padding: 6,
    fontSize: 24,
  },

  legendContainer: {
    backgroundColor: "#f8f9fa",
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#e9ecef",
  },

  legendScrollContent: {
    paddingHorizontal: 16,
    alignItems: "center",
  },

  legendItem: {
    alignItems: "center",
    marginHorizontal: 8,
    minWidth: 60,
  },

  legendIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    borderWidth: 2,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },

  currentLocationLegend: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "white",
    borderWidth: 2,
    borderColor: "#007AFF",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },

  legendText: {
    fontSize: 11,
    fontWeight: "600",
    color: "#495057",
    textAlign: "center",
    marginBottom: 2,
  },

  legendCount: {
    fontSize: 10,
    color: "#6c757d",
    fontWeight: "500",
  },

  mapContainer: {
    flex: 1,
    margin: 2,
    marginBottom: 10,
    borderRadius: 50,
    overflow: "hidden",
    position: "relative",
  },

  map: {
    flex: 1,
  },

  locationButton: {
    position: "absolute",
    bottom: 20,
    right: 20,
    backgroundColor: "white",
    borderRadius: 30,
    padding: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
});
