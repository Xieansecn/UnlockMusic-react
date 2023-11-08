import type { StagingKWMv2Key } from '~/features/settings/keyFormats';
import { MMKVParser } from '../MMKVParser';

export function parseAndroidKuwoEKey(view: DataView): Omit<StagingKWMv2Key, 'id'>[] {
  const mmkv = new MMKVParser(view);
  const result: Omit<StagingKWMv2Key, 'id'>[] = [];
  while (!mmkv.eof) {
    const key = mmkv.readString();
    const idMatch = key.match(/^sec_ekey#(\d+)-(\w+)$/);
    if (!idMatch) {
      mmkv.skipContainer();
      continue;
    }

    const [_, rid, quality] = idMatch;
    const ekey = mmkv.readStringValue();
    if (ekey) {
      result.push({ rid, quality, ekey });
    }
  }
  return result;
}

export function parseIosKuwoEKey(view: DataView): Omit<StagingKWMv2Key, 'id'>[] {
  const mmkv = new MMKVParser(view);
  const result: Omit<StagingKWMv2Key, 'id'>[] = [];
  while (!mmkv.eof) {
    const key = mmkv.readKey();
    const idMatch = key.match(/^(\d+)_(\d+)$/);
    if (!idMatch) {
      mmkv.skipContainer();
      continue;
    }
    const [_, rid, quality] = idMatch;
    const ekey = mmkv.readStringValue();
    if (ekey) {
      result.push({ rid, quality, ekey });
    }
  }
  return result;
}
