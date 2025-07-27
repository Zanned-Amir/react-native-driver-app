import { Ionicons } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

interface Store {
  id: string;
  name: string;
  address: string;
  phone: string;
  delivery_fee: number;
  estimated_delivery: string;
}

interface StoreSelectorProps {
  selectedStore: Store | null;
  availableStores: Store[];
  onStoreSelect: (store: Store) => void;
}

const StoreSelector: React.FC<StoreSelectorProps> = ({
  selectedStore,
  availableStores,
  onStoreSelect,
}) => {
  const [showStoreSelector, setShowStoreSelector] = useState(false);
  const [storeSearchQuery, setStoreSearchQuery] = useState("");
  const [filteredStores, setFilteredStores] =
    useState<Store[]>(availableStores);

  useEffect(() => {
    if (storeSearchQuery.trim() === "") {
      setFilteredStores(availableStores);
    } else {
      const filtered = availableStores.filter(
        (store) =>
          store.name.toLowerCase().includes(storeSearchQuery.toLowerCase()) ||
          store.address.toLowerCase().includes(storeSearchQuery.toLowerCase())
      );
      setFilteredStores(filtered);
    }
  }, [storeSearchQuery, availableStores]);

  const handleStoreSelection = (store: Store) => {
    onStoreSelect(store);
    setShowStoreSelector(false);
    setStoreSearchQuery("");
  };

  const handleToggleSelector = () => {
    setShowStoreSelector(!showStoreSelector);
    if (!showStoreSelector) {
      setStoreSearchQuery("");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Delivery Store</Text>

      {selectedStore ? (
        <TouchableOpacity
          style={styles.selectedStore}
          onPress={handleToggleSelector}
        >
          <View style={styles.storeInfo}>
            <Text style={styles.storeName}>{selectedStore.name}</Text>
            <Text style={styles.storeAddress}>{selectedStore.address}</Text>
            <Text style={styles.deliveryInfo}>
              Delivery: ${selectedStore.delivery_fee.toFixed(2)} •{" "}
              {selectedStore.estimated_delivery}
            </Text>
          </View>
          <Ionicons name="chevron-down" size={20} color="#666" />
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          style={styles.selectStoreButton}
          onPress={handleToggleSelector}
        >
          <Text style={styles.selectStoreText}>Select Store for Delivery</Text>
          <Ionicons name="chevron-down" size={20} color="#666" />
        </TouchableOpacity>
      )}

      {showStoreSelector && (
        <View style={styles.storeList}>
          <View style={styles.searchContainer}>
            <Ionicons
              name="search"
              size={20}
              color="#666"
              style={styles.searchIcon}
            />
            <TextInput
              style={styles.searchInput}
              placeholder="Search stores by name or location..."
              value={storeSearchQuery}
              onChangeText={setStoreSearchQuery}
              placeholderTextColor="#999"
            />
            {storeSearchQuery.length > 0 && (
              <TouchableOpacity
                onPress={() => setStoreSearchQuery("")}
                style={styles.clearButton}
              >
                <Ionicons name="close-circle" size={20} color="#666" />
              </TouchableOpacity>
            )}
          </View>

          <ScrollView
            style={styles.storeScrollView}
            showsVerticalScrollIndicator={false}
            nestedScrollEnabled={true}
          >
            {filteredStores.length > 0 ? (
              filteredStores.map((store) => (
                <TouchableOpacity
                  key={store.id}
                  style={styles.storeOption}
                  onPress={() => handleStoreSelection(store)}
                >
                  <View style={styles.storeInfo}>
                    <Text style={styles.storeName}>{store.name}</Text>
                    <Text style={styles.storeAddress}>{store.address}</Text>
                    <Text style={styles.deliveryInfo}>
                      Delivery: ${store.delivery_fee.toFixed(2)} •{" "}
                      {store.estimated_delivery}
                    </Text>
                  </View>
                  {selectedStore?.id === store.id && (
                    <Ionicons name="checkmark" size={20} color="#4CAF50" />
                  )}
                </TouchableOpacity>
              ))
            ) : (
              <View style={styles.noStoresFound}>
                <Ionicons name="search" size={40} color="#ccc" />
                <Text style={styles.noStoresText}>No stores found</Text>
                <Text style={styles.noStoresSubtext}>
                  Try adjusting your search terms
                </Text>
              </View>
            )}
          </ScrollView>

          <TouchableOpacity
            style={styles.closeButton}
            onPress={handleToggleSelector}
          >
            <Text style={styles.closeButtonText}>Close</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 12,
    color: "#333",
  },
  selectedStore: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 12,
    backgroundColor: "#f8f9fa",
    borderRadius: 8,
  },
  selectStoreButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 12,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    borderStyle: "dashed",
  },
  selectStoreText: {
    color: "#666",
    fontSize: 16,
  },
  storeList: {
    marginTop: 8,
    maxHeight: 400,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f8f9fa",
    borderRadius: 8,
    paddingHorizontal: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#e0e0e0",
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    paddingVertical: 12,
    fontSize: 16,
    color: "#333",
  },
  clearButton: {
    padding: 4,
  },
  storeScrollView: {
    maxHeight: 250,
  },
  storeOption: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  storeInfo: {
    flex: 1,
  },
  storeName: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
  },
  storeAddress: {
    fontSize: 14,
    color: "#666",
    marginTop: 2,
  },
  deliveryInfo: {
    fontSize: 12,
    color: "#007AFF",
    marginTop: 4,
  },
  noStoresFound: {
    alignItems: "center",
    paddingVertical: 40,
  },
  noStoresText: {
    fontSize: 16,
    color: "#666",
    marginTop: 12,
    fontWeight: "600",
  },
  noStoresSubtext: {
    fontSize: 14,
    color: "#999",
    marginTop: 4,
  },
  closeButton: {
    backgroundColor: "#f0f0f0",
    paddingVertical: 12,
    alignItems: "center",
    borderRadius: 8,
    marginTop: 12,
  },
  closeButtonText: {
    fontSize: 16,
    color: "#666",
    fontWeight: "600",
  },
});

export default StoreSelector;
