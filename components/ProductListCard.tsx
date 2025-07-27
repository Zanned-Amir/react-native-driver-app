import { ProductProps } from "@/common/types";
import { Ionicons } from "@expo/vector-icons";
import { FlashList } from "@shopify/flash-list";
import React, { useMemo } from "react";
import { StyleSheet, Text, View } from "react-native";

interface ProductCardListProps {
  products: ProductProps[];
  searchText: string;
  showTags?: boolean;
  showDescription?: boolean;
  hidePriceAndCart?: boolean;
  numColumns?: number;
  searchMode?: boolean;
  showResultsHeader?: boolean;
}

const ProductCardList: React.FC<ProductCardListProps> = ({
  products,
  searchText,
  showTags = false,
  showDescription = false,
  hidePriceAndCart = false,
  numColumns = 1, // Changed to 1 for vertical list
  searchMode = false,
  showResultsHeader = false,
}) => {
  // Filter products based on search text
  const filteredProducts = useMemo(() => {
    if (!searchText.trim()) {
      return products;
    }

    return products.filter(
      (product) =>
        product.name.toLowerCase().includes(searchText.toLowerCase()) ||
        product.description?.toLowerCase().includes(searchText.toLowerCase()) ||
        product.color?.toLowerCase().includes(searchText.toLowerCase()) ||
        product.size?.toLowerCase().includes(searchText.toLowerCase())
    );
  }, [products, searchText]);

  const renderProductCard = ({ item }: { item: ProductProps }) => (
    <View style={styles.listItem}>
      <View style={styles.productImageContainer}>
        {/* Product Image - You can replace this with your actual image component */}
        <View style={styles.productImage}>
          <Ionicons name="image-outline" size={40} color="#ccc" />
        </View>
      </View>

      <View style={styles.productInfo}>
        <Text style={styles.productName}>{item.name}</Text>
        <Text style={styles.productDetails}>
          {item.size} • {item.color}
        </Text>
        {showDescription && (
          <Text style={styles.productDescription} numberOfLines={2}>
            {item.description}
          </Text>
        )}
        <Text style={styles.productPrice}>${item.price}</Text>
      </View>

      {showTags && (
        <View style={styles.tagContainer}>
          {item.discount && (
            <View style={styles.discountTag}>
              <Text style={styles.tagText}>-{item.discount}%</Text>
            </View>
          )}
        </View>
      )}
    </View>
  );

  const renderEmptyState = () => (
    <View style={styles.emptyState}>
      <Ionicons name="search" size={64} color="#ccc" />
      <Text style={styles.emptyStateText}>No products found</Text>
      <Text style={styles.emptyStateSubtext}>
        Try adjusting your search terms
      </Text>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Search Results Header */}
      {showResultsHeader && (
        <View style={styles.resultsHeader}>
          <Text style={styles.resultsCount}>
            {filteredProducts.length} product
            {filteredProducts.length !== 1 ? "s" : ""} found
          </Text>
          {searchText.trim() && (
            <Text style={styles.searchQuery}>for "{searchText}"</Text>
          )}
        </View>
      )}

      {/* Product List */}
      <FlashList
        data={filteredProducts}
        renderItem={renderProductCard}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={renderEmptyState}
        estimatedItemSize={100}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f9fa",
  },
  resultsHeader: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  resultsCount: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
  },
  searchQuery: {
    fontSize: 14,
    color: "#666",
    marginTop: 2,
  },
  listContent: {
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 20,
  },
  listItem: {
    flexDirection: "row",
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  productImageContainer: {
    marginRight: 16,
  },
  productImage: {
    width: 60,
    height: 60,
    backgroundColor: "#f0f0f0",
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  productInfo: {
    flex: 1,
  },
  productName: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
    marginBottom: 4,
  },
  productDetails: {
    fontSize: 14,
    color: "#666",
    marginBottom: 4,
  },
  productDescription: {
    fontSize: 12,
    color: "#888",
    marginBottom: 8,
    lineHeight: 16,
  },
  productPrice: {
    fontSize: 16,
    fontWeight: "700",
    color: "#2196F3",
  },
  tagContainer: {
    marginLeft: 8,
  },
  discountTag: {
    backgroundColor: "#ff4444",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  tagText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "600",
  },
  separator: {
    height: 12,
  },
  emptyState: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 60,
  },
  emptyStateText: {
    fontSize: 18,
    fontWeight: "600",
    color: "#666",
    marginTop: 16,
  },
  emptyStateSubtext: {
    fontSize: 14,
    color: "#999",
    marginTop: 8,
  },
});

export default ProductCardList;
