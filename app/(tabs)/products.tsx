import SearchBar from "@/components/CSearchBar";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

import { ProductProps } from "@/common/types";
import CustomModal from "@/components/CustomModal";
import ProductCardList from "@/components/ProductListCard";
import ProductsGrid from "@/components/ProductsGrid";
import { SafeAreaView } from "react-native-safe-area-context";

const ProductsHomePage = () => {
  const products: ProductProps[] = [
    {
      id: 1,
      name: "Nike Running Shoe",
      size: "EU38",
      color: "BLACK/WHITE",
      description:
        "Crossing hardwood comfort with off-court flair. '80s-inspired construction, bold details and nothin'-but-net style.",
      price: "69.99",
      image: "test1.png",
      images: ["test1.png", "test2.png"],
      discount: 25,
    },
    {
      id: 2,
      name: "Adidas Sportswear",
      size: "EU40",
      color: "WHITE/BLUE",
      description:
        "A classic look with a modern twist. Perfect for both sports and casual wear.",
      price: "79.99",
      image: "test2.png",
      images: ["test1.png", "test2.png"],
    },
    {
      id: 3,
      name: "Adidas Sportswear",
      size: "EU40",
      color: "WHITE/BLUE",
      description:
        "A classic look with a modern twist. Perfect for both sports and casual wear.",
      price: "79.99",
      image: "test2.png",
      images: ["test1.png", "test2.png"],
    },
    {
      id: 4,
      name: "Nike Running Shoe",
      size: "EU38",
      color: "BLACK/WHITE",
      description:
        "Crossing hardwood comfort with off-court flair. '80s-inspired construction, bold details and nothin'-but-net style.",
      price: "69.99",
      image: "test1.png",
      images: ["test1.png", "test2.png"],
    },
    {
      id: 5,
      name: "Nike Running Shoe",
      size: "EU38",
      color: "BLACK/WHITE",
      description:
        "Crossing hardwood comfort with off-court flair. '80s-inspired construction, bold details and nothin'-but-net style.",
      price: "69.99",
      image: "test1.png",
      images: ["test1.png", "test2.png"],
    },
  ];

  const [filterVisible, setFilterVisible] = useState(false);
  const [searchMode, setSearchMode] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();

  const onSettingsPress = () => {
    console.log("Settings Pressed");
    router.push("/accountMenu");
  };

  // Real-time search handler
  const onSearchTextChange = (searchText: string) => {
    console.log("Search text changed:", searchText);
    setSearchQuery(searchText);
  };

  // When user taps on search input (focus)
  const onSearchFocus = () => {
    console.log("Search focused");
    setSearchMode(true);
  };

  // When user taps search button (optional)
  const onSearchPress = (searchText: string) => {
    console.log("Search Pressed with:", searchText);
    setSearchQuery(searchText);
    setSearchMode(true);
  };

  const onFilterPress = () => {
    console.log("Filter Pressed");
    setFilterVisible(true);
  };

  const onCartPress = () => {
    console.log("Cart Pressed");
    router.push("/cart");
  };

  const onBackPress = () => {
    setSearchMode(false);
    setSearchQuery("");
  };

  // Check if we should show search results
  const showSearchResults = searchQuery.trim() !== "";

  return (
    <SafeAreaView style={{ flex: 1 }} edges={["top"]}>
      {/* Header */}
      <View style={styles.header}>
        {searchMode ? (
          <TouchableOpacity onPress={onBackPress}>
            <Ionicons name="arrow-back" style={styles.icon} />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity onPress={onSettingsPress}>
            <Ionicons name="settings" style={styles.icon} />
          </TouchableOpacity>
        )}

        <Text style={styles.title}>
          {showSearchResults ? "Search Results" : "Products"}
        </Text>

        <TouchableOpacity onPress={onCartPress}>
          <Ionicons name="cart-outline" style={styles.icon} />
        </TouchableOpacity>
      </View>

      {/* Search Bar - Always visible */}
      <SearchBar
        onFilterPress={onFilterPress}
        onSearchPress={onSearchPress}
        onSearchTextChange={onSearchTextChange}
        onSearchFocus={onSearchFocus}
        placeholder="Search products..."
        searchText={searchQuery}
        searchMode={searchMode}
      />

      {/* Conditional Content Based on Search Text */}
      {showSearchResults ? (
        // Show ProductCardList when there's search text
        <ProductCardList
          products={products}
          searchText={searchQuery}
          showTags={true}
          showDescription={false}
          numColumns={2}
          searchMode={searchMode}
          showResultsHeader={true}
        />
      ) : (
        // Show ProductsGrid when no search text (default)
        <ProductsGrid products={products} />
      )}

      <CustomModal
        visible={filterVisible}
        onClose={() => setFilterVisible(false)}
        TitleHeader="Filter Products"
      />
    </SafeAreaView>
  );
};

export default ProductsHomePage;

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderBottomColor: "#7A7C7CCC",
    borderBottomWidth: 1.5,
  },

  title: {
    fontSize: 20,
    fontWeight: "600",
    color: "#000",
    textAlign: "center",
  },

  label: {
    fontSize: 16,
    color: "#000",
    fontWeight: "500",
    marginLeft: 20,
    marginVertical: 10,
  },

  icon: {
    backgroundColor: "#89A2E6FF",
    borderRadius: 20,
    padding: 6,
    fontSize: 24,
  },

  content: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 24,
  },
});
