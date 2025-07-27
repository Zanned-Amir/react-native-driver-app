import { ProductProps } from "@/common/types";
import { FlashList } from "@shopify/flash-list";
import React from "react";
import { StyleSheet } from "react-native";
import ProductCard from "./ProductCard";

const ProductsGrid = ({
  products,
  ListHeaderComponent,
  ref,
}: {
  products: ProductProps[];
  ListHeaderComponent?: any;
  ref?: any;
}) => {
  return (
    <FlashList
      ref={ref}
      data={products}
      renderItem={({ item }) => <ProductCard product={item} />}
      numColumns={2}
      estimatedItemSize={350}
      ListHeaderComponent={ListHeaderComponent}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.contentContainer}
    />
  );
};

const styles = StyleSheet.create({
  contentContainer: {
    paddingHorizontal: 10,
    paddingBottom: 20,
  },
});

export default ProductsGrid;
