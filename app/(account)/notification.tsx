import TitleHeader from "@/components/TitleHeader";
import { useRouter } from "expo-router";
import React from "react";
import { Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const NotificationPage = () => {
  const router = useRouter();
  const handleBackPress = () => {
    router.back();
  };

  return (
    <>
      <TitleHeader title="Notification" onBackPress={handleBackPress} />
      <SafeAreaView>
        <Text>Notification content goes here</Text>
      </SafeAreaView>
    </>
  );
};

export default NotificationPage;
