import { useAuthStore } from "@/features/auth/store";
import { useRouter } from "expo-router";
import { Button, Text, View } from "react-native";

export default function Index() {
  const router = useRouter();

  const isLoggedIn = useAuthStore((state) => state.isAuthenticated);

  return (
    <View className="flex-1 items-center justify-center bg-white flex-col gap-4">
      <Button onPress={() => router.navigate("/login")} title="Go to Login" />
      <Button
        onPress={() => router.navigate("/verifyEmail")}
        title="Go to Verify Email"
      />

      <Button
        onPress={() => router.navigate("/accountMenu")}
        title="Go to Account Menu"
      />

      <Button
        onPress={() => router.navigate("/(tabs)/maps")}
        title="Go to Maps"
      />

      <Button onPress={() => router.navigate("/home")} title="Home" />

      <Button
        onPress={() => router.navigate("/(driver-order)/orders")}
        title="Orders"
      />

      <Button onPress={() => router.navigate("/cart")} title="Cart" />

      <Text>{isLoggedIn ? "Logged in" : "Logged out"}</Text>
    </View>
  );
}
