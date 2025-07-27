import { Image } from "expo-image";
import { useState } from "react";
import { Dimensions, StyleSheet, Text, View } from "react-native";
import Carousel from "react-native-reanimated-carousel";

const { width, height } = Dimensions.get("window");

const data = [
  {
    id: "1",
    title: "Deal 1",
    description: "50% off on all items",
    image: require("../assets/images/test1.png"),
  },
  {
    id: "2",
    title: "Deal 2",
    description: "Buy 1 Get 1 Free",
    image: require("../assets/images/test1.png"),
  },
  {
    id: "3",
    title: "Deal 3",
    description: "Free shipping on orders over $50",
    image: require("../assets/images/test2.png"),
  },
];

const DealCarousel = (style) => {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <View style={[styles.container, style]}>
      <Carousel
        width={width}
        height={height * 0.3}
        data={data}
        renderItem={({ item }) => <DealCard item={item} />}
        mode="parallax"
        modeConfig={{
          parallaxScrollingScale: 0.9,
          parallaxScrollingOffset: 50,
        }}
        loop
        autoPlay
        autoPlayInterval={3000}
        onProgressChange={(_, absoluteProgress) => {
          setActiveIndex(Math.round(absoluteProgress));
        }}
      />
      <CustomDotPagination data={data} activeIndex={activeIndex} />
    </View>
  );
};

const DealCard = ({ item }) => (
  <View style={styles.card}>
    <Image
      source={item.image}
      placeholder={require("../assets/images/notfound.png")}
      style={styles.image}
      contentFit="cover"
    />
  </View>
);

const MAX_VISIBLE_DOTS = 7;

const CustomDotPagination = ({ data, activeIndex }) => {
  const total = data.length;
  let start = 0;
  let end = total;

  if (total > MAX_VISIBLE_DOTS) {
    const half = Math.floor(MAX_VISIBLE_DOTS / 2);

    if (activeIndex <= half) {
      // Stick to the left
      start = 0;
      end = MAX_VISIBLE_DOTS;
    } else if (activeIndex >= total - half - 1) {
      // Stick to the right
      start = total - MAX_VISIBLE_DOTS;
      end = total;
    } else {
      // Center the active dot
      start = activeIndex - half;
      end = activeIndex + half + 1;
    }
  }

  const visibleDots = data.slice(start, end);

  return (
    <View
      style={{ flexDirection: "row", justifyContent: "center", marginTop: 10 }}
    >
      {start > 0 && (
        <Text style={{ fontSize: 18, color: "#ccc", marginHorizontal: 2 }}>
          …
        </Text>
      )}
      {visibleDots.map((_, idx) => {
        const realIndex = start + idx;
        return (
          <View
            key={realIndex}
            style={{
              width: 10,
              height: 10,
              borderRadius: 5,
              marginHorizontal: 5,
              backgroundColor: realIndex === activeIndex ? "#89A2E6FF" : "#ccc",
              opacity: realIndex === activeIndex ? 1 : 0.5,
            }}
          />
        );
      })}
      {end < total && (
        <Text style={{ fontSize: 18, color: "#ccc", marginHorizontal: 2 }}>
          …
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    marginVertical: 5,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
    width: "100%",
  },
  image: {
    width: "100%",
    height: "100%",
    borderRadius: 10,
    padding: 5,
  },
  dotsContainer: {
    marginTop: 12,
  },
});

export default DealCarousel;
