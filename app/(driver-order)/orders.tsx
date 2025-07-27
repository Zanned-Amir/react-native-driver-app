import TitleHeader from "@/components/TitleHeader";
import { FlashList } from "@shopify/flash-list";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const OrderPage = () => {
  const router = useRouter();

  // Sample order data
  const [orders] = useState([
    {
      id: "ORD001",
      date: "2023-09-01",
      total: 99.99,
      status: "Delivered",
      items: 3,
    },
    {
      id: "ORD002",
      date: "2023-09-05",
      total: 149.49,
      status: "Shipped",
      items: 2,
    },
    {
      id: "ORD003",
      date: "2023-09-10",
      total: 249.0,
      status: "Processing",
      items: 5,
    },
  ]);

  const handleBackPress = () => {
    router.back();
  };

  const handleOrderDetails = (order_id) => {
    // Navigate to order details page
    router.push(`/(driver-order)/${order_id}`);
  };

  const renderOrderItem = ({ item }) => (
    <View style={styles.orderRow}>
      <View style={styles.orderInfo}>
        <Text style={styles.orderId}>{item.id}</Text>
        <Text style={styles.orderDate}>{item.date}</Text>
        <Text style={styles.orderTotal}>${item.total.toFixed(2)}</Text>
        <Text style={[styles.orderStatus, getStatusStyle(item.status)]}>
          {item.status}
        </Text>
      </View>
      <TouchableOpacity
        style={styles.detailsButton}
        onPress={() => handleOrderDetails(item.id)}
      >
        <Text style={styles.detailsButtonText}>Details</Text>
      </TouchableOpacity>
    </View>
  );

  const getStatusStyle = (status) => {
    switch (status) {
      case "Delivered":
        return { color: "#4CAF50" };
      case "Shipped":
        return { color: "#FF9800" };
      case "Processing":
        return { color: "#2196F3" };
      default:
        return { color: "#666" };
    }
  };

  const renderHeader = () => (
    <View style={styles.headerRow}>
      <Text style={styles.headerText}>Order ID</Text>
      <Text style={styles.headerText}>Date</Text>
      <Text style={styles.headerText}>Total</Text>
      <Text style={styles.headerText}>Status</Text>
      <Text style={styles.headerText}>Action</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <TitleHeader title="Orders" onBackPress={handleBackPress} />

      <View style={styles.tableContainer}>
        {renderHeader()}
        <FlashList
          data={orders}
          renderItem={renderOrderItem}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  tableContainer: {
    flex: 1,
    margin: 16,
    backgroundColor: "#fff",
    borderRadius: 8,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  headerRow: {
    flexDirection: "row",
    backgroundColor: "#f0f0f0",
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  headerText: {
    flex: 1,
    fontWeight: "bold",
    fontSize: 14,
    color: "#333",
    textAlign: "center",
  },
  orderRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  orderInfo: {
    flex: 1,
    flexDirection: "row",
  },
  orderId: {
    flex: 1,
    fontSize: 14,
    fontWeight: "500",
    textAlign: "center",
  },
  orderDate: {
    flex: 1,
    fontSize: 14,
    color: "#666",
    textAlign: "center",
  },
  orderTotal: {
    flex: 1,
    fontSize: 14,
    fontWeight: "600",
    textAlign: "center",
  },
  orderStatus: {
    flex: 1,
    fontSize: 14,
    fontWeight: "500",
    textAlign: "center",
  },
  detailsButton: {
    backgroundColor: "#007AFF",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 4,
    marginLeft: 8,
  },
  detailsButtonText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "600",
  },
});

export default OrderPage;
