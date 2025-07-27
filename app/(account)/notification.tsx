import TitleHeader from "@/components/TitleHeader";
import { MaterialCommunityIcons } from "@expo/vector-icons"; // For the bell-off icon
import { useRouter } from "expo-router";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const NotificationPage = () => {
  const router = useRouter();

  const handleBackPress = () => {
    router.back();
  };

  const onClose = () => {
    router.back();
  };

  return (
    <SafeAreaView style={styles.container}>
      <TitleHeader title="Notification" onBackPress={handleBackPress} />
      <View style={styles.content}>
        <MaterialCommunityIcons
          name="bell-off-outline"
          size={80}
          color="#B0B0B0"
          style={styles.icon}
        />
        <Text style={styles.title}>No Notification Here</Text>
        <Text style={styles.subtitle}>
          There is no notification to show right now
        </Text>
        <TouchableOpacity style={styles.saveButton} onPress={onClose}>
          <Text style={styles.saveButtonText}>Go back to home</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default NotificationPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  content: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 24,
  },
  icon: {
    marginBottom: 24,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 8,
    color: "#222A54",
    textAlign: "center",
  },
  subtitle: {
    fontSize: 16,
    color: "#888",
    marginBottom: 32,
    textAlign: "center",
  },
  saveButton: {
    backgroundColor: "#222A54",
    borderRadius: 25,
    paddingVertical: 16,
    paddingHorizontal: 32,
    alignItems: "center",
    marginTop: 8,
    width: "100%",
  },
  saveButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
    letterSpacing: 1,
  },
});
