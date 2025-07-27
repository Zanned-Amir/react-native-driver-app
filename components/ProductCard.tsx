import { Image } from "expo-image";
import { useRouter } from "expo-router";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

const ProductCard = ({
  product,
  showTags = false,
  showDescription = false,
  hidePriceAndCart = false,
}) => {
  const router = useRouter();
  const hasDiscount = product.discount && product.discount > 0;
  const discountedPrice = hasDiscount
    ? (
        parseFloat(product.price.replace("$", "")) *
        (1 - product.discount / 100)
      ).toFixed(2)
    : null;

  // Check if we should show any content in the middle section
  const showMiddleContent =
    (showTags && product.size && product.color) ||
    (showDescription && product.description);

  // Determine image height based on what content is shown
  const getImageContainerStyle = () => {
    if (hidePriceAndCart) {
      return styles.imageContainerFullHeight; // Takes most of the space
    }
    return !showMiddleContent
      ? styles.imageContainerExpanded
      : styles.imageContainer;
  };

  const handleProductPress = () => {
    console.log("Product pressed:", product.name);
    router.push({
      pathname: "/(product)/[id]",
      params: {
        product: JSON.stringify(product),
        id: product.id,
      },
    });
  };

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      style={styles.touchable}
      onPress={handleProductPress}
    >
      <View style={styles.container}>
        {/* Product Image - Dynamic height based on content visibility */}
        <View style={[styles.imageContainer, getImageContainerStyle()]}>
          <Image
            source={product.image}
            placeholder={require("../assets/images/notfound.png")}
            style={styles.productImage}
            contentFit="cover"
          />

          {/* Discount Badge - Only show if not hiding price */}
          {hasDiscount && !hidePriceAndCart && (
            <View style={styles.discountBadge}>
              <Text style={styles.discountText}>-{product.discount}%</Text>
            </View>
          )}

          {/* Heart Icon */}
          <TouchableOpacity style={styles.heartIcon}>
            <Text style={styles.heartText}>♡</Text>
          </TouchableOpacity>
        </View>

        {/* Product Info - Conditional layout */}
        <View
          style={[
            styles.infoContainer,
            !showMiddleContent && styles.infoContainerCompact,
            hidePriceAndCart && styles.infoContainerMinimal,
          ]}
        >
          <View style={styles.topSection}>
            <Text style={styles.productName} numberOfLines={1}>
              {product.name}
            </Text>

            {/* Tags Container - Only render if needed and not hiding price/cart */}
            {showTags && product.size && product.color && !hidePriceAndCart && (
              <View style={styles.tagsContainer}>
                <View style={styles.tag}>
                  <Text style={styles.tagText}>{product.size}</Text>
                </View>
                <View style={styles.tag}>
                  <Text style={styles.tagText}>{product.color}</Text>
                </View>
              </View>
            )}

            {/* Description Container - Only render if needed and not hiding price/cart */}
            {showDescription && product.description && !hidePriceAndCart && (
              <View style={styles.descriptionContainer}>
                <Text style={styles.description} numberOfLines={2}>
                  {product.description}
                </Text>
              </View>
            )}
          </View>

          {/* Price and Add to Cart - Only show if not hidden */}
          {!hidePriceAndCart && (
            <View style={styles.bottomContainer}>
              <View style={styles.priceContainer}>
                <Text style={styles.priceLabel}>PRICE</Text>

                {hasDiscount ? (
                  <View style={styles.priceRow}>
                    <Text style={styles.originalPrice}>{product.price}</Text>
                    <Text style={styles.discountedPrice}>
                      ${discountedPrice}
                    </Text>
                  </View>
                ) : (
                  <Text style={styles.price}>{product.price}</Text>
                )}
              </View>

              <TouchableOpacity style={styles.addButton}>
                <Text style={styles.addButtonText}>Add to cart</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default ProductCard;

const styles = StyleSheet.create({
  touchable: {
    flex: 1,
  },
  container: {
    backgroundColor: "#fff",
    borderRadius: 12,
    marginHorizontal: 8,
    marginVertical: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    overflow: "hidden",
    height: 350,
    width: "90%",
  },

  imageContainer: {
    position: "relative",
    height: 180,
    backgroundColor: "#f5f5f5",
  },

  // Expanded image when no middle content
  imageContainerExpanded: {
    height: 240, // Takes extra 60px from hidden content
  },

  // Full height image when hiding price and cart
  imageContainerFullHeight: {
    height: 280, // Takes most of the card space
  },

  productImage: {
    width: "100%",
    height: "100%",
  },

  discountBadge: {
    position: "absolute",
    top: 12,
    left: 12,
    backgroundColor: "#FF4444",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },

  discountText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "700",
  },

  heartIcon: {
    position: "absolute",
    top: 12,
    right: 12,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "rgba(255,255,255,0.8)",
    alignItems: "center",
    justifyContent: "center",
  },

  heartText: {
    fontSize: 16,
    color: "#666",
  },

  infoContainer: {
    padding: 12,
    flex: 1,
    justifyContent: "space-between",
  },

  // Compact info container when no middle content
  infoContainerCompact: {
    justifyContent: "flex-start",
  },

  // Minimal info container when hiding price and cart
  infoContainerMinimal: {
    justifyContent: "center",
    paddingVertical: 8,
  },

  topSection: {
    // Groups name, tags, and description together
  },

  productName: {
    fontSize: 16,
    fontWeight: "600",
    color: "#000",
    marginBottom: 6,
  },

  tagsContainer: {
    flexDirection: "row",
    marginBottom: 6,
    alignItems: "center",
  },

  tag: {
    backgroundColor: "#f0f0f0",
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 4,
    marginRight: 6,
  },

  tagText: {
    fontSize: 11,
    color: "#666",
    fontWeight: "500",
  },

  descriptionContainer: {
    marginBottom: 8,
  },

  description: {
    fontSize: 13,
    color: "#666",
    lineHeight: 16,
  },

  bottomContainer: {
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "space-between",
    marginTop: 12, // Add margin when in compact mode
  },

  priceContainer: {
    flex: 1,
  },

  priceLabel: {
    fontSize: 10,
    color: "#999",
    fontWeight: "500",
    marginBottom: 2,
  },

  priceRow: {
    flexDirection: "row",
    alignItems: "center",
    flexWrap: "wrap",
  },

  price: {
    fontSize: 18,
    fontWeight: "700",
    color: "#000",
  },

  originalPrice: {
    fontSize: 14,
    fontWeight: "500",
    color: "#999",
    textDecorationLine: "line-through",
    marginRight: 6,
  },

  discountedPrice: {
    fontSize: 18,
    fontWeight: "700",
    color: "#FF4444",
  },

  addButton: {
    backgroundColor: "#6B73A3",
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 8,
    minWidth: 100,
  },

  addButtonText: {
    color: "#fff",
    fontSize: 13,
    fontWeight: "600",
    textAlign: "center",
  },
});
