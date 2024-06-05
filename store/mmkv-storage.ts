import { StateStorage } from "zustand/middleware";
import { MMKV } from "react-native-mmkv";

// Creates a new MMKV which saves value pairs
const storage = new MMKV({
  id: "balance-storage",
});

export const zustandStorage: StateStorage = {
  setItem: (name, value) => {
    return storage.set(name, value);
  },
  getItem: (name) => {
    const value = storage.getString(name);
    return value ?? null;
  },
  removeItem: (name) => {
    return storage.delete(name);
  },
};
