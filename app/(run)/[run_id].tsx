import { useLocalSearchParams } from "expo-router";
import React from "react";
import { Text, View } from "react-native";

const RunDetailsPage = () => {
  const { run_id } = useLocalSearchParams();
  return (
    <View>
      <Text></Text>
    </View>
  );
};

export default RunDetailsPage;
