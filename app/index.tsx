import { useRouter } from "expo-router";
import { Button, View } from "react-native";

export default function Index() {
  const router = useRouter();
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
    </View>
  );
}
