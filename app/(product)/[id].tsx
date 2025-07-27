import { Colors } from "@/common/constants/colors";
import { ProductProps } from "@/common/types";
import QuantitySelector from "@/components/QuantitySelector";
import TitleHeader from "@/components/TitleHeader";
import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useState } from "react";
import {
  Dimensions,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Carousel from "react-native-reanimated-carousel";
import { SafeAreaView } from "react-native-safe-area-context";

const { width, height } = Dimensions.get("window");

const ProductDetailsPage = () => {
  const { product } = useLocalSearchParams();
  const parsedProduct: ProductProps = JSON.parse(product as string);
  const router = useRouter();

  const [activeIndex, setActiveIndex] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);
  const [quantity, setQuantity] = useState(1);

  const handleBackPress = () => {
    router.back();
  };

  const handleQuantityChange = (newQuantity: number) => {
    setQuantity(newQuantity);
  };

  const handleAddToCart = () => {
    console.log(`Adding ${quantity} of ${parsedProduct.name} to cart`);
  };

  const ProductImageCard = ({ item }) => {
    const hasDiscount = parsedProduct.discount && parsedProduct.discount > 0;

    return (
      <View style={[styles.imageCard]}>
        <Image
          source={item}
          placeholder={require("../../assets/images/notfound.png")}
          style={styles.productImage}
          contentFit="cover"
        />

        {hasDiscount && (
          <View style={styles.discountBadge}>
            <Text style={styles.discountText}>-{parsedProduct.discount}%</Text>
          </View>
        )}

        <TouchableOpacity
          style={
            isFavorite
              ? [styles.favoriteIconButton, { backgroundColor: "#E27A97FF" }]
              : styles.favoriteIconButton
          }
          onPress={() => setIsFavorite((prev) => !prev)}
        >
          <Ionicons
            name={isFavorite ? "heart" : "heart-outline"}
            size={24}
            color={isFavorite ? "red" : "white"}
          />
        </TouchableOpacity>
      </View>
    );
  };

  const CustomDotPagination = ({ data, activeIndex }) => {
    const total = data.length;
    const MAX_VISIBLE_DOTS = 7;
    let start = 0;
    let end = total;

    if (total > MAX_VISIBLE_DOTS) {
      const half = Math.floor(MAX_VISIBLE_DOTS / 2);

      if (activeIndex <= half) {
        start = 0;
        end = MAX_VISIBLE_DOTS;
      } else if (activeIndex >= total - half - 1) {
        start = total - MAX_VISIBLE_DOTS;
        end = total;
      } else {
        start = activeIndex - half;
        end = activeIndex + half + 1;
      }
    }

    const visibleDots = data.slice(start, end);

    return (
      <View style={styles.dotsContainer}>
        {start > 0 && <Text style={styles.ellipsis}>…</Text>}
        {visibleDots.map((_, idx) => {
          const realIndex = start + idx;
          return (
            <View
              key={realIndex}
              style={[
                styles.dot,
                realIndex === activeIndex
                  ? styles.activeDot
                  : styles.inactiveDot,
              ]}
            />
          );
        })}
        {end < total && <Text style={styles.ellipsis}>…</Text>}
      </View>
    );
  };

  const renderImageCarousel = () => {
    if (!parsedProduct.images || parsedProduct.images.length === 0) {
      return null;
    }

    return (
      <View style={styles.carouselContainer}>
        <Carousel
          width={width}
          height={height * 0.4}
          data={parsedProduct.images}
          renderItem={({ item }) => <ProductImageCard item={item} />}
          mode="parallax"
          modeConfig={{
            parallaxScrollingScale: 0.95,
            parallaxScrollingOffset: 30,
          }}
          loop={parsedProduct.images.length > 1}
          autoPlay={false}
          onProgressChange={(_, absoluteProgress) => {
            const imagesLength = parsedProduct.images?.length || 1;
            setActiveIndex(Math.round(absoluteProgress) % imagesLength);
          }}
        />
        {parsedProduct.images.length > 1 && (
          <CustomDotPagination
            data={parsedProduct.images}
            activeIndex={activeIndex}
          />
        )}
      </View>
    );
  };

  const renderProductInfo = () => {
    const hasDiscount = parsedProduct.discount && parsedProduct.discount > 0;
    const discountedPrice = hasDiscount
      ? (
          parseFloat(parsedProduct.price.replace("$", "")) *
          (1 - (parsedProduct.discount || 0) / 100)
        ).toFixed(2)
      : null;

    return (
      <View style={styles.productInfoContainer}>
        <Text style={styles.productTitle}>
          {parsedProduct.name || parsedProduct.name}
        </Text>

        {/* Price Display */}
        {hasDiscount ? (
          <View style={styles.priceRow}>
            <Text style={styles.originalPrice}>{parsedProduct.price}</Text>
            <Text style={styles.discountedPrice}>${discountedPrice}</Text>
          </View>
        ) : (
          <Text style={styles.productPrice}>{parsedProduct.price}</Text>
        )}

        {/* Size and Color Info */}
        {(parsedProduct.size || parsedProduct.color) && (
          <View style={styles.productDetailsRow}>
            {parsedProduct.size && (
              <Text style={styles.productDetail}>
                Size: {parsedProduct.size}
              </Text>
            )}
            {parsedProduct.color && (
              <Text style={styles.productDetail}>
                Color: {parsedProduct.color}
              </Text>
            )}
          </View>
        )}

        {/* Description */}
        {parsedProduct.description && (
          <View style={styles.descriptionContainer}>
            <Text style={styles.descriptionTitle}>Description</Text>
            <Text style={styles.descriptionText}>
              {parsedProduct.description}
            </Text>
          </View>
        )}
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <TitleHeader title="Product Details" onBackPress={handleBackPress} />

      <KeyboardAvoidingView
        style={styles.keyboardAvoidingView}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 20}
      >
        <ScrollView
          style={styles.scrollView}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={styles.scrollContent}
        >
          {renderImageCarousel()}
          {renderProductInfo()}
        </ScrollView>

        {/* Fixed bottom section with quantity selector and add to cart */}
        <View style={styles.bottomContainer}>
          <View style={styles.quantityContainer}>
            <Text style={styles.quantityLabel}>Quantity</Text>
            <QuantitySelector
              quantity={quantity}
              onQuantityChange={handleQuantityChange}
              minQuantity={1}
              maxQuantity={50}
              showValidationErrors={true}
            />
          </View>

          <TouchableOpacity
            style={styles.addToCartButton}
            onPress={handleAddToCart}
          >
            <Ionicons
              name="cart-outline"
              size={20}
              color="#fff"
              style={styles.cartIcon}
            />
            <Text style={styles.addToCartText}>Add {quantity} to Cart</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default ProductDetailsPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  keyboardAvoidingView: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 20,
  },
  bottomContainer: {
    backgroundColor: "#fff",
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: Platform.OS === "ios" ? 20 : 16,
    borderTopWidth: 1,
    borderTopColor: "#eee",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: -2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  carouselContainer: {
    marginBottom: 20,
  },
  imageCard: {
    width: "100%",
    height: "100%",
    borderRadius: 10,
    overflow: "hidden",
    backgroundColor: "#f5f5f5",
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
  dotsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 15,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginHorizontal: 4,
  },
  activeDot: {
    backgroundColor: Colors.secondary,
    width: 20,
    borderRadius: 10,
    opacity: 1,
  },
  inactiveDot: {
    backgroundColor: "#ccc",
    opacity: 0.5,
  },
  ellipsis: {
    fontSize: 18,
    color: "#ccc",
    marginHorizontal: 2,
  },
  productInfoContainer: {
    padding: 20,
  },
  productTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 10,
  },
  productPrice: {
    fontSize: 20,
    fontWeight: "600",
    color: "#FF6B6B",
    marginBottom: 20,
  },
  priceRow: {
    flexDirection: "row",
    alignItems: "center",
    flexWrap: "wrap",
    marginBottom: 20,
  },
  originalPrice: {
    fontSize: 16,
    fontWeight: "500",
    color: "#999",
    textDecorationLine: "line-through",
    marginRight: 8,
  },
  discountedPrice: {
    fontSize: 20,
    fontWeight: "600",
    color: "#FF4444",
  },
  productDetailsRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginBottom: 20,
  },
  productDetail: {
    fontSize: 14,
    color: "#666",
    marginRight: 16,
    marginBottom: 4,
  },
  descriptionContainer: {
    marginBottom: 25,
  },
  descriptionTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
    marginBottom: 8,
  },
  descriptionText: {
    fontSize: 14,
    lineHeight: 20,
    color: "#666",
  },
  quantityContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 16,
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: "#f8f9fa",
    borderRadius: 12,
  },
  quantityLabel: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
  },
  addToCartButton: {
    backgroundColor: Colors.secondary,
    paddingVertical: 16,
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  cartIcon: {
    marginRight: 8,
  },
  addToCartText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  favoriteIconButton: {
    position: "absolute",
    top: 10,
    right: 10,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    borderRadius: 20,
    padding: 6,
    color: "#fff",
  },
});
