import { MMKV } from "react-native-mmkv";

export const storage = new MMKV({
  id: "app-storage",
  encryptionKey: "your-encryption-key",
});
