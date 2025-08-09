import { MMKV } from "react-native-mmkv";
import { StateStorage } from "zustand/middleware";
export const storage = new MMKV({
  id: "app-storage",
});

// Zustand storage using MMKV
export const mmkvStorage: StateStorage = {
  setItem: (name, value) => {
    storage.set(name, value);
  },
  getItem: (name) => {
    const value = storage.getString(name);
    return value ?? null;
  },
  removeItem: (name) => {
    storage.delete(name);
  },
};
