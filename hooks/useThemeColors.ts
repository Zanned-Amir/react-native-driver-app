import { Colors } from "@/constants/colors";
import { useColorScheme } from "react-native";

export function useThemeColors() {
  const scheme = useColorScheme() ?? "light";
  const theme = Colors[scheme] ?? Colors.light;
  return theme;
}
