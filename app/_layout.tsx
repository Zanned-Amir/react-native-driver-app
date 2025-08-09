import { useThemeColors } from "@/common/hooks/useThemeColors";
import { useAuthStore } from "@/features/auth/store";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaProvider } from "react-native-safe-area-context";
import Toast, {
  BaseToast,
  BaseToastProps,
  ErrorToast,
} from "react-native-toast-message";
import "../styles/globals.css";
const queryClient = new QueryClient();

const toastConfig = {
  success: (props: BaseToastProps) => (
    <BaseToast
      {...props}
      style={{
        borderLeftColor: "green",
        minHeight: 80,
      }}
      contentContainerStyle={{
        paddingHorizontal: 15,
      }}
      text1Style={{
        fontSize: 16,
        fontWeight: "bold",
      }}
      text2Style={{
        fontSize: 14,
        color: "green",
        flexWrap: "wrap",
      }}
      text2NumberOfLines={10}
    />
  ),
  error: (props: BaseToastProps) => (
    <ErrorToast
      {...props}
      style={{
        borderLeftColor: "red",
        minHeight: 100,
      }}
      contentContainerStyle={{
        paddingHorizontal: 15,
      }}
      text1Style={{
        fontSize: 16,
        fontWeight: "bold",
      }}
      text2Style={{
        fontSize: 14,
        color: "red",
        flexWrap: "wrap",
      }}
      text2NumberOfLines={10}
    />
  ),
};

export default function RootLayout() {
  const theme = useThemeColors();

  const isLoggedIn = useAuthStore((state) => state.isAuthenticated);
  const isVerified = useAuthStore((state) => state.isVerified);

  return (
    <SafeAreaProvider>
      <QueryClientProvider client={queryClient}>
        <GestureHandlerRootView style={{ flex: 1 }}>
          <StatusBar style="auto" />
          <Stack
            screenOptions={{
              headerStyle: { backgroundColor: theme.primary },
              headerTintColor: theme.title,
            }}
          >
            <Stack.Protected guard={!isLoggedIn || !isVerified}>
              <Stack.Screen
                name="(auth)"
                options={{
                  headerShown: false,
                }}
              />
            </Stack.Protected>

            <Stack.Protected guard={isLoggedIn}>
              <Stack.Protected guard={isVerified}>
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
                  name="(account)"
                  options={{ headerShown: false }}
                />

                <Stack.Screen
                  name="(driver-order)"
                  options={{ headerShown: false }}
                />

                <Stack.Screen
                  name="(product)"
                  options={{ headerShown: false }}
                />
                <Stack.Screen name="(run)" options={{ headerShown: false }} />
              </Stack.Protected>
            </Stack.Protected>
          </Stack>
        </GestureHandlerRootView>
        {/* ⬇️ Move Toast here to render above everything else including Modal */}
        <Toast config={toastConfig} position="top" topOffset={60} />
      </QueryClientProvider>
    </SafeAreaProvider>
  );
}
