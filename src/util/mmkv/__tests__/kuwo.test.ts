import { readFileSync } from 'node:fs';
import { parseAndroidKuwoEKey, parseIosKuwoEKey } from '../kuwo';

const makeViewFromBuffer = (buff: Buffer) =>
  new DataView(buff.buffer.slice(buff.byteOffset, buff.byteOffset + buff.byteLength));

test('parse kuwo android ekey mmkv file "cn.kuwo.player.mmkv.defaultconfig"', () => {
  const view = makeViewFromBuffer(readFileSync(__dirname + '/__fixture__/kuwo_android.mmkv'));
  expect(parseAndroidKuwoEKey(view)).toMatchInlineSnapshot(`
    [
      {
        "ekey": "xyz123",
        "quality": "20201kmflac",
        "rid": "1234567",
      },
    ]
  `);
});

test('parse kuwo ios ekey mmkv file "kw_ekey"', () => {
  const view = makeViewFromBuffer(readFileSync(__dirname + '/__fixture__/kuwo_ios.mmkv'));
  expect(parseIosKuwoEKey(view)).toMatchInlineSnapshot(`
    [
      {
        "ekey": "xyz123",
        "quality": "20201",
        "rid": "1234567",
      },
    ]
  `);
});
