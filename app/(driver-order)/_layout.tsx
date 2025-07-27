import { useThemeColors } from "@/common/hooks/useThemeColors";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";

export default function DriverOrderLayout() {
  const theme = useThemeColors();

  return (
    <>
      <StatusBar style="auto" />
      <Stack
        screenOptions={{
          headerShown: false,
        }}
      />
    </>
  );
}
