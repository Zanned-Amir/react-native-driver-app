import { ProductProps } from "@/common/types";
import SearchBar from "@/components/CSearchBar";
import CustomModal from "@/components/CustomModal";
import ProductsGrid from "@/components/ProductsGrid";
import { Ionicons } from "@expo/vector-icons";
import { FlashList } from "@shopify/flash-list";
import { useRouter } from "expo-router";
import React, { useRef } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const favorite = () => {
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
  ];
  const [filterVisible, setFilterVisible] = React.useState(false);
  const router = useRouter();
  const listRef = useRef<FlashList<any>>(null);

  const scrollToTop = () => {
    if (listRef.current) {
      listRef.current.scrollToOffset({ offset: 0, animated: true });
    }
  };

  const onSettingsPress = () => {
    console.log("Settings Pressed");
    router.push("/accountMenu");
  };

  const onSearchPress = () => {
    console.log("Search Pressed");
  };

  const onFilterPress = () => {
    console.log("Filter Pressed");
    setFilterVisible(true);
  };

  const onCartPress = () => {
    console.log("Cart Pressed");
    router.push("/cart");
  };
  return (
    <SafeAreaView style={{ flex: 1 }} edges={["top"]}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={onSettingsPress}>
          <Ionicons name="settings" style={styles.icon} />
        </TouchableOpacity>
        <TouchableOpacity onPress={scrollToTop}>
          <Text style={styles.title}>Favorites </Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={onCartPress}>
          <Ionicons name="cart-outline" style={styles.icon} />
        </TouchableOpacity>
      </View>

      {/* Search Header */}
      <SearchBar onFilterPress={onFilterPress} onSearchPress={onSearchPress} />

      {/* Main Content */}
      <ProductsGrid products={products} ref={listRef} />
      <CustomModal
        visible={filterVisible}
        onClose={() => setFilterVisible(false)}
        TitleHeader="Filter Products"
      />
    </SafeAreaView>
  );
};

export default favorite;

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
