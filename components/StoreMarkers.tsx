import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Marker } from "react-native-maps";

const StoreMarkers = ({ stores, onStorePress, currentLocation, zoomLevel }) => {
  const getMarkerColor = (category) => {
    switch (category) {
      case "Supermarket":
        return "#FF6B6B";
      case "Retail":
        return "#4ECDC4";
      case "Hypermarket":
        return "#45B7D1";
      case "Shopping Mall":
        return "#96CEB4";
      case "General Store":
        return "#FFEAA7";
      default:
        return "#FF6B6B";
    }
  };

  const getMarkerIcon = (category) => {
    switch (category) {
      case "Supermarket":
        return "storefront";
      case "Retail":
        return "bag";
      case "Hypermarket":
        return "business";
      case "Shopping Mall":
        return "location";
      case "General Store":
        return "home";
      default:
        return "storefront";
    }
  };

  // Calculate zoom-based visibility
  const isVeryZoomedOut = zoomLevel > 3.0;
  const isZoomedOut = zoomLevel > 1.0;
  const isNormalZoom = zoomLevel <= 1.0 && zoomLevel > 0.1;
  const showIcons = zoomLevel <= 2.0; // Only show icons when zoomed in enough
  const showLabels = zoomLevel <= 1.5 && zoomLevel > 0.2;

  return (
    <>
      {/* Current location marker - always visible with proper scaling */}
      {currentLocation && (
        <Marker
          coordinate={currentLocation}
          title="You are here"
          description="Your current location"
          zIndex={1000}
          anchor={{ x: 0.5, y: 0.5 }}
        >
          <View
            style={[
              styles.currentLocationMarker,
              {
                transform: [
                  { scale: isVeryZoomedOut ? 0.8 : isZoomedOut ? 0.9 : 1.0 },
                ],
              },
            ]}
          >
            <View style={styles.currentLocationInner}>
              <Ionicons
                name="location"
                size={isVeryZoomedOut ? 16 : isZoomedOut ? 18 : 22}
                color="#007AFF"
              />
            </View>
            <View
              style={[
                styles.currentLocationPulse,
                { opacity: isVeryZoomedOut ? 0.3 : 0.6 },
              ]}
            />
          </View>
        </Marker>
      )}

      {/* Store markers - conditional rendering based on zoom */}
      {stores.map((store, index) => (
        <Marker
          key={store.id}
          coordinate={{
            latitude: store.latitude,
            longitude: store.longitude,
          }}
          title={store.name}
          description={`${store.address} • ${store.category}`}
          onPress={() => onStorePress(store)}
          zIndex={100 + index}
          anchor={{ x: 0.5, y: 0.5 }}
        >
          {isVeryZoomedOut ? (
            // Simple small dot for very zoomed out
            <View
              style={[
                styles.simpleDot,
                { backgroundColor: getMarkerColor(store.category) },
              ]}
            />
          ) : (
            <View style={styles.storeMarkerContainer}>
              <View
                style={[
                  styles.storeMarker,
                  {
                    borderColor: getMarkerColor(store.category),
                    padding: isZoomedOut ? 4 : 6,
                    transform: [{ scale: isZoomedOut ? 0.8 : 1.0 }],
                  },
                ]}
              >
                {showIcons ? (
                  <Ionicons
                    name={getMarkerIcon(store.category)}
                    size={isZoomedOut ? 14 : 18}
                    color={getMarkerColor(store.category)}
                  />
                ) : (
                  <View
                    style={[
                      styles.markerDot,
                      { backgroundColor: getMarkerColor(store.category) },
                    ]}
                  />
                )}
              </View>
              {showLabels && (
                <Text
                  style={[
                    styles.storeLabel,
                    {
                      fontSize: isZoomedOut ? 10 : 12,
                      opacity: isZoomedOut ? 0.8 : 1.0,
                    },
                  ]}
                  numberOfLines={1}
                >
                  {store.name}
                </Text>
              )}
            </View>
          )}
        </Marker>
      ))}
    </>
  );
};

export default StoreMarkers;

const styles = StyleSheet.create({
  currentLocationMarker: {
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
  },

  currentLocationInner: {
    backgroundColor: "white",
    borderRadius: 20,
    padding: 6,
    borderWidth: 3,
    borderColor: "#007AFF",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.4,
    shadowRadius: 4,
    elevation: 8,
    alignItems: "center",
    justifyContent: "center",
    zIndex: 2,
  },

  currentLocationPulse: {
    position: "absolute",
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "rgba(0, 122, 255, 0.3)",
    borderWidth: 1,
    borderColor: "rgba(0, 122, 255, 0.6)",
    zIndex: 1,
  },

  storeMarkerContainer: {
    alignItems: "center",
    minWidth: 60,
  },

  storeMarker: {
    backgroundColor: "white",
    borderRadius: 16,
    padding: 6,
    borderWidth: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
    alignItems: "center",
    justifyContent: "center",
  },

  markerDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },

  storeLabel: {
    backgroundColor: "rgba(255, 255, 255, 0.95)",
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 8,
    fontSize: 12,
    fontWeight: "600",
    color: "#333",
    textAlign: "center",
    marginTop: 2,
    maxWidth: 70,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 3,
  },

  simpleDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    borderWidth: 1.5,
    borderColor: "white",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.4,
    shadowRadius: 2,
    elevation: 4,
  },
});
