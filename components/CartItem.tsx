import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import React from "react";
import { Alert, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import QuantitySelector from "./QuantitySelector";

interface CartItemProps {
  item: {
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
  };
  onQuantityChange: (itemId: string, quantity: number) => void;
  onRemove: (itemId: string) => void;
  onProductPress: (productId: string) => void;
  calculateItemPrice: (item: any) => number;
}

const CartItem: React.FC<CartItemProps> = ({
  item,
  onQuantityChange,
  onRemove,
  onProductPress,
  calculateItemPrice,
}) => {
  const handleQuantityChange = (newQuantity: number) => {
    try {
      onQuantityChange(item.product._id, newQuantity);
    } catch (error) {
      console.error("Failed to update quantity:", error);
      Alert.alert("Error", "Failed to update quantity. Please try again.");
    }
  };

  const handleProductPress = () => {
    onProductPress(item.product._id);
  };

  const handleRemove = () => {
    Alert.alert(
      "Remove Item",
      `Are you sure you want to remove "${item.product.name}" from your cart?`,
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Remove",
          style: "destructive",
          onPress: () => onRemove(item.product._id),
        },
      ]
    );
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={handleProductPress}
        style={styles.productSection}
      >
        <Image
          source={item.product.main_image}
          style={styles.productImage}
          placeholder={require("../assets/images/notfound.png")}
        />

        <View style={styles.productInfo}>
          <Text style={styles.productName} numberOfLines={2}>
            {item.product.name}
          </Text>
          <Text style={styles.productBrand}>{item.product.brand}</Text>

          <View style={styles.priceContainer}>
            {item.product.is_discountable &&
            item.product.discount_percent > 0 ? (
              <>
                <Text style={styles.originalPrice}>
                  ${item.product.retail_price.toFixed(2)}
                </Text>
                <Text style={styles.discountedPrice}>
                  ${calculateItemPrice(item).toFixed(2)}
                </Text>
                <Text style={styles.discountBadge}>
                  {item.product.discount_percent}% OFF
                </Text>
              </>
            ) : (
              <Text style={styles.price}>
                ${item.product.retail_price.toFixed(2)}
              </Text>
            )}
          </View>
        </View>
      </TouchableOpacity>

      <View style={styles.actionsContainer}>
        <QuantitySelector
          quantity={item.quantity}
          onQuantityChange={handleQuantityChange}
          minQuantity={1}
          maxQuantity={10000}
          showValidationErrors={true}
        />

        <TouchableOpacity style={styles.removeButton} onPress={handleRemove}>
          <Ionicons name="trash-outline" size={20} color="#ff4444" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  productSection: {
    flex: 1,
    flexDirection: "row",
  },
  productImage: {
    width: 60,
    height: 60,
    borderRadius: 8,
    marginRight: 12,
  },
  productInfo: {
    flex: 1,
  },
  productName: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
  },
  productBrand: {
    fontSize: 14,
    color: "#666",
    marginTop: 2,
  },
  priceContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 4,
  },
  price: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
  },
  originalPrice: {
    fontSize: 14,
    color: "#999",
    textDecorationLine: "line-through",
    marginRight: 8,
  },
  discountedPrice: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
    marginRight: 8,
  },
  discountBadge: {
    fontSize: 12,
    color: "#ff4444",
    fontWeight: "600",
  },
  actionsContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  removeButton: {
    padding: 8,
    marginLeft: 12,
  },
});

export default CartItem;
