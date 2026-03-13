import { MMKV } from "react-native-mmkv";

export const storage = new MMKV({
  id: "app",
  encryptionKey: "hunter2",
});
