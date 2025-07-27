// CartPage.tsx
import CartItem from "@/components/CartItem";
import StoreSelector from "@/components/StoreSelector";
import TitleHeader from "@/components/TitleHeader";
import { Ionicons } from "@expo/vector-icons";
import { FlashList } from "@shopify/flash-list";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { Alert, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

interface CartItem {
  product: {
    _id: string;
    readable_id: string;
    name: string;
    description: string;
    main_image: string;
    retail_price: number;
    discount_percent: number;
    brand: string;
    is_discountable: boolean;
  };
  quantity: number;
  store: {
    id: string;
    name: string;
    address: string;
    phone: string;
  };
}

interface Store {
  id: string;
  name: string;
  address: string;
  phone: string;
  delivery_fee: number;
  estimated_delivery: string;
}

interface ListItem {
  id: string;
  type: "store-selector" | "cart-header" | "cart-item" | "order-summary";
  data: any;
}

const CartPage = () => {
  const router = useRouter();
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [selectedStore, setSelectedStore] = useState<Store | null>(null);
  const [availableStores, setAvailableStores] = useState<Store[]>([]);

  useEffect(() => {
    loadCartData();
    loadAvailableStores();
  }, []);

  const loadCartData = async () => {
    const mockCartItems: CartItem[] = [
      {
        product: {
          _id: "64f1a2b3c4d5e6f7g8h9i0j1",
          readable_id: "PROD-001",
          name: "Organic Bananas",
          description: "Fresh organic bananas from local farms",
          main_image:
            "https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?w=400",
          retail_price: 3.99,
          discount_percent: 15,
          brand: "Fresh Farms",
          is_discountable: true,
        },
        quantity: 2,
        store: {
          id: "1",
          name: "Downtown Market",
          address: "123 Main St, Downtown",
          phone: "+1234567890",
        },
      },
      {
        product: {
          _id: "64f1a2b3c4d5e6f7g8h9i0j2",
          readable_id: "PROD-002",
          name: "Whole Wheat Bread",
          description: "Freshly baked whole wheat bread",
          main_image:
            "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=400",
          retail_price: 4.5,
          discount_percent: 0,
          brand: "Bakery Fresh",
          is_discountable: false,
        },
        quantity: 1,
        store: {
          id: "1",
          name: "Downtown Market",
          address: "123 Main St, Downtown",
          phone: "+1234567890",
        },
      },
      {
        product: {
          _id: "64f1a2b3c4d5e6f7g8h9i0j3",
          readable_id: "PROD-003",
          name: "Greek Yogurt",
          description: "Creamy Greek yogurt with probiotics",
          main_image:
            "https://images.unsplash.com/photo-1488477181946-6428a0291777?w=400",
          retail_price: 5.99,
          discount_percent: 20,
          brand: "Dairy Best",
          is_discountable: true,
        },
        quantity: 3,
        store: {
          id: "2",
          name: "Fresh Foods Plaza",
          address: "456 Oak Ave, Midtown",
          phone: "+1234567891",
        },
      },
      {
        product: {
          _id: "64f1a2b3c4d5e6f7g8h9i0j4",
          readable_id: "PROD-004",
          name: "Avocados",
          description: "Ripe Hass avocados perfect for guacamole",
          main_image:
            "https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?w=400",
          retail_price: 2.99,
          discount_percent: 10,
          brand: "Green Valley",
          is_discountable: true,
        },
        quantity: 4,
        store: {
          id: "1",
          name: "Downtown Market",
          address: "123 Main St, Downtown",
          phone: "+1234567890",
        },
      },
      {
        product: {
          _id: "64f1a2b3c4d5e6f7g8h9i0j5",
          readable_id: "PROD-005",
          name: "Chicken Breast",
          description: "Fresh boneless chicken breast",
          main_image:
            "https://images.unsplash.com/photo-1604503468506-a8da13d82791?w=400",
          retail_price: 8.99,
          discount_percent: 0,
          brand: "Farm Fresh",
          is_discountable: false,
        },
        quantity: 1,
        store: {
          id: "2",
          name: "Fresh Foods Plaza",
          address: "456 Oak Ave, Midtown",
          phone: "+1234567891",
        },
      },
    ];
    setCartItems(mockCartItems);
  };

  const loadAvailableStores = async () => {
    const stores: Store[] = [
      {
        id: "1",
        name: "Downtown Market",
        address: "123 Main St, Downtown",
        phone: "+1234567890",
        delivery_fee: 5.99,
        estimated_delivery: "25-35 min",
      },
      {
        id: "2",
        name: "Fresh Foods Plaza",
        address: "456 Oak Ave, Midtown",
        phone: "+1234567891",
        delivery_fee: 3.99,
        estimated_delivery: "30-40 min",
      },
      {
        id: "3",
        name: "Organic Corner",
        address: "789 Green St, Uptown",
        phone: "+1234567892",
        delivery_fee: 4.5,
        estimated_delivery: "20-30 min",
      },
      {
        id: "4",
        name: "City Supermarket",
        address: "321 Commerce Blvd, Business District",
        phone: "+1234567893",
        delivery_fee: 6.99,
        estimated_delivery: "35-45 min",
      },
      {
        id: "5",
        name: "Neighborhood Grocery",
        address: "654 Elm St, Residential Area",
        phone: "+1234567894",
        delivery_fee: 2.99,
        estimated_delivery: "15-25 min",
      },
      {
        id: "6",
        name: "Premium Foods",
        address: "987 Luxury Ave, Upscale District",
        phone: "+1234567895",
        delivery_fee: 8.99,
        estimated_delivery: "40-50 min",
      },
    ];
    setAvailableStores(stores);
  };

  const calculateItemPrice = (item: CartItem) => {
    const basePrice = item.product.retail_price;
    if (item.product.is_discountable && item.product.discount_percent > 0) {
      return basePrice * (1 - item.product.discount_percent / 100);
    }
    return basePrice;
  };

  const calculateSubtotal = () => {
    return cartItems.reduce((total, item) => {
      return total + calculateItemPrice(item) * item.quantity;
    }, 0);
  };

  const calculateTotal = () => {
    const subtotal = calculateSubtotal();
    const deliveryFee = selectedStore?.delivery_fee || 0;
    return subtotal + deliveryFee;
  };

  const calculateTax = () => {
    return calculateSubtotal() * 0.08;
  };

  const calculateDiscount = () => {
    return calculateSubtotal() * 0.1;
  };

  const handleQuantityChange = (itemId: string, newQuantity: number) => {
    if (newQuantity === 0) {
      handleRemoveItem(itemId);
      return;
    }

    setCartItems((prev) =>
      prev.map((item) =>
        item.product._id === itemId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const handleRemoveItem = (itemId: string) => {
    /*
    Alert.alert(
      "Remove Item",
      "Are you sure you want to remove this item from your cart?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Remove",
          style: "destructive",
          onPress: () => {
            setCartItems((prev) =>
              prev.filter((item) => item.product._id !== itemId)
            );
          },
        },
      ]
    );
    */

    setCartItems((prev) => prev.filter((item) => item.product._id !== itemId));
  };

  const handleProductPress = (productId: string) => {
    router.push({
      pathname: "/(product)/[id]",
      params: {
        product: JSON.stringify({
          name: "Product Name",
          description: "Product Description",
          image: "test1",
          images: ["test1", "test2"],
        }),
        id: productId,
      },
    });
  };

  const handleStoreSelect = (store: Store) => {
    setSelectedStore(store);
  };

  const handleCheckout = () => {
    if (!selectedStore) {
      Alert.alert("Store Required", "Please select a store for delivery");
      return;
    }

    if (cartItems.length === 0) {
      Alert.alert("Empty Cart", "Please add items to your cart");
      return;
    }

    router.push({
      pathname: "/login",
      params: {
        storeId: selectedStore.id,
        total: calculateTotal().toFixed(2),
      },
    });
  };

  const handleBackPress = () => {
    router.back();
  };

  const renderOrderSummary = () => (
    <View style={styles.summarySection}>
      <Text style={styles.sectionTitle}>Order Summary</Text>

      <View style={styles.summaryRow}>
        <Text style={styles.summaryLabel}>
          Subtotal ({cartItems.length} items)
        </Text>
        <Text style={styles.summaryValue}>
          ${calculateSubtotal().toFixed(2)}
        </Text>
      </View>

      {selectedStore && (
        <View style={styles.summaryRow}>
          <Text style={styles.summaryLabel}>Delivery Fee</Text>
          <Text style={styles.summaryValue}>
            ${selectedStore.delivery_fee.toFixed(2)}
          </Text>
        </View>
      )}

      <View style={styles.summaryRow}>
        <Text style={styles.summaryLabel}>Tax</Text>
        <Text style={styles.summaryValue}>
          ${(calculateSubtotal() * 0.08).toFixed(2)}
        </Text>
      </View>
      <View style={styles.summaryRow}>
        <Text style={styles.summaryLabel}>Discount</Text>
        <Text style={[styles.summaryValue, { color: "red" }]}>
          - ${calculateDiscount().toFixed(2)}
        </Text>
      </View>

      <View style={[styles.summaryRow, styles.totalRow]}>
        <Text style={styles.totalLabel}>Total</Text>
        <Text style={styles.totalValue}>
          ${(calculateTotal() + calculateSubtotal() * 0.08).toFixed(2)}
        </Text>
      </View>
    </View>
  );

  const renderEmptyCart = () => (
    <View style={styles.emptyCart}>
      <Ionicons name="cart-outline" size={80} color="#ccc" />
      <Text style={styles.emptyCartText}>Your cart is empty</Text>
      <Text style={styles.emptyCartSubtext}>
        Add items to your cart to get started
      </Text>
      <TouchableOpacity
        style={styles.shopButton}
        onPress={() => router.push("/products")}
      >
        <Text style={styles.shopButtonText}>Start Shopping</Text>
      </TouchableOpacity>
    </View>
  );

  // Create data structure for FlashList
  const getListData = (): ListItem[] => {
    const data: ListItem[] = [];

    // Store selector
    data.push({
      id: "store-selector",
      type: "store-selector",
      data: null,
    });

    // Cart items and summary
    if (cartItems.length > 0) {
      // Cart items header
      data.push({
        id: "cart-header",
        type: "cart-header",
        data: cartItems.length,
      });

      // Cart items
      cartItems.forEach((item) => {
        data.push({
          id: item.product._id,
          type: "cart-item",
          data: item,
        });
      });

      // Order summary
      data.push({
        id: "order-summary",
        type: "order-summary",
        data: null,
      });
    }

    return data;
  };

  const renderItem = ({ item }: { item: ListItem }) => {
    switch (item.type) {
      case "store-selector":
        return (
          <StoreSelector
            selectedStore={selectedStore}
            availableStores={availableStores}
            onStoreSelect={handleStoreSelect}
          />
        );

      case "cart-header":
        return (
          <View style={styles.cartHeader}>
            <Text style={styles.sectionTitle}>Items ({item.data})</Text>
          </View>
        );

      case "cart-item":
        return (
          <View style={styles.cartItemWrapper}>
            <CartItem
              item={item.data}
              onQuantityChange={handleQuantityChange}
              onRemove={handleRemoveItem}
              onProductPress={handleProductPress}
              calculateItemPrice={calculateItemPrice}
            />
          </View>
        );

      case "order-summary":
        return renderOrderSummary();

      default:
        return null;
    }
  };

  const getItemType = (item: ListItem) => {
    return item.type;
  };

  return (
    <SafeAreaView style={styles.container}>
      <TitleHeader title="Cart" onBackPress={handleBackPress} />

      {cartItems.length === 0 ? (
        renderEmptyCart()
      ) : (
        <FlashList
          data={getListData()}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          getItemType={getItemType}
          estimatedItemSize={120}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.listContent}
        />
      )}

      {cartItems.length > 0 && (
        <View style={styles.checkoutContainer}>
          <TouchableOpacity
            style={[
              styles.checkoutButton,
              !selectedStore && styles.checkoutButtonDisabled,
            ]}
            onPress={handleCheckout}
            disabled={!selectedStore}
          >
            <Text style={styles.checkoutButtonText}>
              Proceed to Checkout • $
              {(calculateTotal() + calculateSubtotal() * 0.08).toFixed(2)}
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  listContent: {
    padding: 16,
  },
  emptyCart: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 100,
  },
  emptyCartText: {
    fontSize: 18,
    color: "#666",
    marginTop: 16,
    marginBottom: 8,
    fontWeight: "600",
  },
  emptyCartSubtext: {
    fontSize: 14,
    color: "#999",
    marginBottom: 24,
    textAlign: "center",
  },
  shopButton: {
    backgroundColor: "#007AFF",
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  shopButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
  cartHeader: {
    backgroundColor: "white",
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  cartItemWrapper: {
    backgroundColor: "white",
    borderRadius: 12,
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 12,
    color: "#333",
  },
  summarySection: {
    backgroundColor: "white",
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  summaryRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 8,
  },
  summaryLabel: {
    fontSize: 16,
    color: "#666",
  },
  summaryValue: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
  },
  totalRow: {
    borderTopWidth: 1,
    borderTopColor: "#eee",
    marginTop: 8,
    paddingTop: 16,
  },
  totalLabel: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
  },
  totalValue: {
    fontSize: 18,
    fontWeight: "700",
    color: "#333",
  },
  checkoutContainer: {
    padding: 16,
    backgroundColor: "white",
    borderTopWidth: 1,
    borderTopColor: "#eee",
  },
  checkoutButton: {
    backgroundColor: "#007AFF",
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: "center",
  },
  checkoutButtonDisabled: {
    backgroundColor: "#ccc",
  },
  checkoutButtonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "600",
  },
});

export default CartPage;
