import { useThemeColors } from "@/hooks/useThemeColors";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";
import "../styles/globals.css";
export default function RootLayout() {
  const theme = useThemeColors();

  return (
    <SafeAreaProvider>
      <StatusBar style="auto" />
      <Stack
        screenOptions={{
          headerStyle: { backgroundColor: theme.primary },
          headerTintColor: theme.title,
        }}
      >
        <Stack.Screen
          name="index"
          options={{
            title: "Welcome",
            headerTitleStyle: { color: theme.title },
            headerTitleAlign: "center",
            headerShown: true,
          }}
        />

        <Stack.Screen
          name="(auth)"
          options={{
            headerShown: false,
          }}
        />

        <Stack.Screen
          name="(account)"
          options={{
            headerShown: false,
          }}
        />
      </Stack>
    </SafeAreaProvider>
  );
}
