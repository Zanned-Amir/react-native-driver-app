import { ProductProps } from "@/common/types";
import DealCarousel from "@/components/CDealCarousel";
import CustomModal from "@/components/CustomModal";
import ProductsGrid from "@/components/ProductsGrid";
import QRCodeScannerModal from "@/components/QRCodeScannerModal";
import RunCard, { RunProps } from "@/components/RunCard";
import { Ionicons } from "@expo/vector-icons";
import { FlashList } from "@shopify/flash-list";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import React, { useRef, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const HomePage = () => {
  const router = useRouter();

  const listRef = useRef<FlashList<any>>(null);
  const [filterVisible, setFilterVisible] = useState(false);

  // Sample active run (mock data)
  const activeRun: RunProps = {
    id: "RUN001",
    runNumber: "R123",
    startDate: "2025-07-01 08:30", // ✅ Added this line
    totalDeliveries: 10,
    completedDeliveries: 4,
    currentLocation: "Downtown",
    estimatedDuration: "3 Days",
    driverName: "John Doe",
    vehicleCode: "VH2025",
    status: "active",
  };

  const categories = [
    { id: "1", name: "Electronics" },
    { id: "2", name: "Fashion" },
    { id: "3", name: "Home & Garden" },
    { id: "4", name: "Sports" },
    { id: "5", name: "Toys & Games" },
    { id: "6", name: "Health & Beauty" },
    { id: "7", name: "Automotive" },
    { id: "8", name: "Books" },
    { id: "9", name: "Music" },
    { id: "10", name: "Movies & TV" },
  ];

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

  const [qrScannerVisible, setQrScannerVisible] = useState(false);

  const scrollToTop = () => {
    if (listRef.current) {
      listRef.current.scrollToOffset({ offset: 0, animated: true });
    }
  };

  const onSettingsPress = () => {
    router.push("/accountMenu");
  };

  const onCartPress = () => {
    router.push("/cart");
  };

  const onScanQR = (runId) => {
    // Handle QR code scanning logic
    console.log(`Scanning QR for run: ${runId}`);
    setQrScannerVisible(true);
  };

  const onEnterCode = (runId) => {
    // Handle entering code logic
    console.log(`Entering code for run: ${runId}`);
  };

  const handleFinishRun = () => {};

  const handleViewDetails = () => {};

  const renderHeader = () => (
    <View>
      {/* ✅ RunCard at Top if There’s an Active Run */}
      {activeRun && (
        <RunCard
          run={activeRun}
          onEnterCode={onEnterCode}
          onScanQR={onScanQR}
          onFinishRun={handleFinishRun}
          onViewDetails={handleViewDetails}
        />
      )}

      <Text style={styles.label}>Featured Deals</Text>
      <DealCarousel />

      <Text style={styles.label}>Categories</Text>
      <FlashList
        data={categories}
        horizontal
        renderItem={({ item }) => (
          <View style={styles.categoryItem}>
            <Image
              source={require("../../assets/images/test2.png")}
              style={styles.circleCard}
              placeholder={require("../../assets/images/notfound.png")}
            />
            <Text style={styles.categoryText}>{item.name}</Text>
          </View>
        )}
        estimatedItemSize={95}
        showsHorizontalScrollIndicator={false}
      />

      <Text style={styles.label}>Top Products</Text>
    </View>
  );

  return (
    <SafeAreaView style={{ flex: 1 }} edges={["top"]}>
      {/* Page Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={onSettingsPress}>
          <Ionicons name="settings" style={styles.icon} />
        </TouchableOpacity>

        <TouchableOpacity onPress={scrollToTop}>
          <Text style={styles.title}>Welcome Home</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={onCartPress}>
          <Ionicons name="cart-outline" style={styles.icon} />
        </TouchableOpacity>
      </View>

      {/* Grid with Products */}
      <ProductsGrid
        products={products}
        ListHeaderComponent={renderHeader}
        ref={listRef}
      />

      <QRCodeScannerModal
        visible={qrScannerVisible}
        onClose={() => setQrScannerVisible(false)}
        onQRCodeScanned={(code) => console.log(`Scanned QR Code: ${code}`)}
      />

      {/* Filters Modal */}
      <CustomModal
        visible={filterVisible}
        onClose={() => setFilterVisible(false)}
        TitleHeader="Filter Products"
      />
    </SafeAreaView>
  );
};

export default HomePage;

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
  circleCard: {
    width: 70,
    height: 70,
    borderRadius: 50,
    backgroundColor: "#000",
    alignItems: "center",
    justifyContent: "center",
  },
  categoryItem: {
    margin: 10,
    alignItems: "center",
    justifyContent: "center",
    width: 90,
  },
  categoryText: {
    textAlign: "center",
    marginTop: 5,
    fontSize: 12,
    color: "#333",
  },
});
