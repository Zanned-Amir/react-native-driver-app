import TitleHeader from "@/components/TitleHeader";
import { FlashList } from "@shopify/flash-list";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const OrderDetailsPage = () => {
  const router = useRouter();
  const { order_id } = useLocalSearchParams();

  // Sample order details data
  const [orderDetails] = useState({
    id: order_id,
    date: "2023-09-01",
    status: "Delivered",
    customer: {
      name: "John Doe",
      email: "john.doe@example.com",
      phone: "+1234567890",
    },
    products: [
      {
        id: "1",
        name: "Smartphone Samsung Galaxy",
        quantity: 1,
        unitPrice: 699.99,
        total: 699.99,
      },
      {
        id: "2",
        name: "Wireless Headphones",
        quantity: 2,
        unitPrice: 149.99,
        total: 299.98,
      },
      {
        id: "3",
        name: "Phone Case",
        quantity: 1,
        unitPrice: 29.99,
        total: 29.99,
      },
    ],
    subtotal: 1029.96,
    discountPercent: 10,
    discountAmount: 102.99,
    taxPercent: 18,
    taxAmount: 166.85,
    timbreFiscal: 0.6,
    totalAmount: 1094.42,
  });

  const handleBackPress = () => {
    router.back();
  };

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

  const renderProductItem = ({ item }) => (
    <View style={styles.productRow}>
      <Text style={styles.productName}>{item.name}</Text>
      <Text style={styles.productQuantity}>{item.quantity}</Text>
      <Text style={styles.productPrice}>${item.unitPrice.toFixed(2)}</Text>
      <Text style={styles.productTotal}>${item.total.toFixed(2)}</Text>
    </View>
  );

  const renderProductHeader = () => (
    <View style={styles.productHeader}>
      <Text style={styles.productHeaderText}>Product</Text>
      <Text style={styles.productHeaderText}>Qty</Text>
      <Text style={styles.productHeaderText}>Price</Text>
      <Text style={styles.productHeaderText}>Total</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <TitleHeader title={`Order ${order_id}`} onBackPress={handleBackPress} />

      <ScrollView style={styles.scrollContainer}>
        {/* Order Header */}
        <View style={styles.orderHeader}>
          <View style={styles.orderInfo}>
            <Text style={styles.orderTitle}>Order #{orderDetails.id}</Text>
            <Text style={styles.orderDate}>Date: {orderDetails.date}</Text>
          </View>
          <Text
            style={[styles.orderStatus, getStatusStyle(orderDetails.status)]}
          >
            {orderDetails.status}
          </Text>
        </View>

        {/* Customer Information */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Customer Information</Text>
          <View style={styles.customerInfo}>
            <Text style={styles.customerText}>
              Name: {orderDetails.customer.name}
            </Text>
            <Text style={styles.customerText}>
              Email: {orderDetails.customer.email}
            </Text>
            <Text style={styles.customerText}>
              Phone: {orderDetails.customer.phone}
            </Text>
          </View>
        </View>

        {/* Products Table */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Products</Text>
          <View style={styles.productsTable}>
            {renderProductHeader()}
            <FlashList
              data={orderDetails.products}
              renderItem={renderProductItem}
              keyExtractor={(item) => item.id}
              estimatedItemSize={60}
              scrollEnabled={false}
            />
          </View>
        </View>

        {/* Invoice Summary */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Invoice Summary</Text>
          <View style={styles.invoiceSummary}>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Subtotal:</Text>
              <Text style={styles.summaryValue}>
                ${orderDetails.subtotal.toFixed(2)}
              </Text>
            </View>

            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>
                Discount ({orderDetails.discountPercent}%):
              </Text>
              <Text style={styles.summaryValue}>
                -${orderDetails.discountAmount.toFixed(2)}
              </Text>
            </View>

            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>After Discount:</Text>
              <Text style={styles.summaryValue}>
                $
                {(orderDetails.subtotal - orderDetails.discountAmount).toFixed(
                  2
                )}
              </Text>
            </View>

            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>
                Tax ({orderDetails.taxPercent}%):
              </Text>
              <Text style={styles.summaryValue}>
                ${orderDetails.taxAmount.toFixed(2)}
              </Text>
            </View>

            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Timbre Fiscal:</Text>
              <Text style={styles.summaryValue}>
                ${orderDetails.timbreFiscal.toFixed(2)}
              </Text>
            </View>

            <View style={styles.divider} />

            <View style={styles.summaryRow}>
              <Text style={styles.totalLabel}>Total Amount:</Text>
              <Text style={styles.totalValue}>
                ${orderDetails.totalAmount.toFixed(2)}
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default OrderDetailsPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  scrollContainer: {
    flex: 1,
    padding: 16,
  },
  orderHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 8,
    marginBottom: 16,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  orderInfo: {
    flex: 1,
  },
  orderTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  orderDate: {
    fontSize: 14,
    color: "#666",
    marginTop: 4,
  },
  orderStatus: {
    fontSize: 16,
    fontWeight: "600",
    paddingHorizontal: 12,
    paddingVertical: 6,
    backgroundColor: "#f0f0f0",
    borderRadius: 4,
  },
  section: {
    backgroundColor: "#fff",
    borderRadius: 8,
    marginBottom: 16,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  customerInfo: {
    padding: 16,
  },
  customerText: {
    fontSize: 14,
    color: "#666",
    marginBottom: 8,
  },
  productsTable: {
    padding: 16,
  },
  productHeader: {
    flexDirection: "row",
    backgroundColor: "#f0f0f0",
    paddingVertical: 12,
    paddingHorizontal: 8,
    borderRadius: 4,
    marginBottom: 8,
  },
  productHeaderText: {
    flex: 1,
    fontWeight: "bold",
    fontSize: 14,
    color: "#333",
    textAlign: "center",
  },
  productRow: {
    flexDirection: "row",
    paddingVertical: 12,
    paddingHorizontal: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  productName: {
    flex: 2,
    fontSize: 14,
    color: "#333",
    paddingRight: 8,
  },
  productQuantity: {
    flex: 1,
    fontSize: 14,
    color: "#666",
    textAlign: "center",
  },
  productPrice: {
    flex: 1,
    fontSize: 14,
    color: "#666",
    textAlign: "center",
  },
  productTotal: {
    flex: 1,
    fontSize: 14,
    fontWeight: "600",
    color: "#333",
    textAlign: "center",
  },
  invoiceSummary: {
    padding: 16,
  },
  summaryRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 8,
  },
  summaryLabel: {
    fontSize: 14,
    color: "#666",
  },
  summaryValue: {
    fontSize: 14,
    fontWeight: "500",
    color: "#333",
  },
  divider: {
    height: 1,
    backgroundColor: "#ddd",
    marginVertical: 12,
  },
  totalLabel: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  totalValue: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#007AFF",
  },
});
