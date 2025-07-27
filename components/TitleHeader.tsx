import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function TitleHeader({
  title,
  onBackPress,
  showBackButton = true,
}: {
  title: string;
  onBackPress?: () => void;
  showBackButton?: boolean;
}) {
  return (
    <View style={styles.header}>
      {showBackButton && (
        <TouchableOpacity style={styles.back} onPress={onBackPress}>
          <Ionicons name="chevron-back" size={24} color="#000" />
        </TouchableOpacity>
      )}
      <Text style={styles.title}>{title}</Text>
    </View>
  );
}
const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: 20,
    justifyContent: "center", // centers title
    position: "relative", // allows absolute positioning for back button
  },
  back: {
    position: "absolute",
    left: 20,
    backgroundColor: "#89A2E6FF",
    borderRadius: 20,
    padding: 6,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "600",
    color: "#000",
    textAlign: "center",
  },
});
