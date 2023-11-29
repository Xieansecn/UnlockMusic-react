import { MMKVParser } from '../MMKVParser';

export function parseAndroidQmEKey(view: DataView): Map<string, string> {
  const mmkv = new MMKVParser(view);
  const result = new Map<string, string>();
  while (!mmkv.eof) {
    const key = mmkv.readString();
    const value = mmkv.readStringValue();
    if (value) {
      result.set(key, value);
    }
  }
  return result;
}
