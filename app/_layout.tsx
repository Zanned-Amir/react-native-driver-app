import { useThemeColors } from "@/common/hooks/useThemeColors";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaProvider } from "react-native-safe-area-context";
import "../styles/globals.css";
const queryClient = new QueryClient();

export default function RootLayout() {
  const theme = useThemeColors();

  return (
    <SafeAreaProvider>
      <QueryClientProvider client={queryClient}>
        <GestureHandlerRootView>
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
              name="(tabs)"
              options={{
                title: "Welcome",
                headerTitleStyle: { color: theme.title },
                headerTitleAlign: "center",
                headerShown: false,
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

            <Stack.Screen
              name="(driver-order)"
              options={{
                headerShown: false,
              }}
            />

            <Stack.Screen
              name="(product)"
              options={{
                headerShown: false,
              }}
            />

            <Stack.Screen
              name="(run)"
              options={{
                headerShown: false,
              }}
            />
          </Stack>
        </GestureHandlerRootView>
      </QueryClientProvider>
    </SafeAreaProvider>
  );
}
