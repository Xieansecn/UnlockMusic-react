import { MMKVParser } from '../MMKVParser';
import { readFileSync } from 'node:fs';

const makeViewFromBuffer = (buff: Buffer) =>
  new DataView(buff.buffer.slice(buff.byteOffset, buff.byteOffset + buff.byteLength));

test('parse qm mmkv file', () => {
  const view = makeViewFromBuffer(readFileSync(__dirname + '/__fixture__/qm.mmkv'));
  expect(Object.fromEntries(MMKVParser.toStringMap(view).entries())).toMatchInlineSnapshot(`
    {
      "Lorem Ipsum": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum congue volutpat metus non molestie. Quisque id est sapien. Fusce eget tristique sem. Donec tellus lacus, viverra sed lectus eget, elementum ultrices dolor. Integer non urna justo.",
      "key": "value",
    }
  `);
});

test('parse qm mmkv file with optional str', () => {
  const view = makeViewFromBuffer(readFileSync(__dirname + '/__fixture__/qm_optional.mmkv'));
  expect(Object.fromEntries(MMKVParser.toStringMap(view).entries())).toMatchInlineSnapshot(`
    {
      "key": "value",
      "key2": "value2",
    }
  `);
});

test('parse kuwo mmkv file', () => {
  const view = makeViewFromBuffer(readFileSync(__dirname + '/__fixture__/kuwo.mmkv'));
  expect(MMKVParser.parseKuwoEKey(view)).toMatchInlineSnapshot(`
    [
      {
        "ekey": "xyz123",
        "quality": "20201kmflac",
        "rid": "1234567",
      },
    ]
  `);
});

test('throw error on broken file', () => {
  const view = makeViewFromBuffer(
    Buffer.from([0x27, 0x00, 0x00, 0x00, 0x7f, 0x03, 0x6b, 0x65, 0x79, 0x06, 0x07, 0x62, 0x61, 0x64, 0xff, 0xff]),
  );

  expect(() => Object.fromEntries(MMKVParser.toStringMap(view).entries())).toThrow(/offset mismatch/i);
});
