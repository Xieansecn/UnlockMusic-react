import { readFileSync } from 'node:fs';
import { parseAndroidQmEKey } from '../qm';

const makeViewFromBuffer = (buff: Buffer) =>
  new DataView(buff.buffer.slice(buff.byteOffset, buff.byteOffset + buff.byteLength));

test('parse qm mmkv file', () => {
  const view = makeViewFromBuffer(readFileSync(__dirname + '/__fixture__/qm.mmkv'));
  expect(Object.fromEntries(parseAndroidQmEKey(view).entries())).toMatchInlineSnapshot(`
    {
      "Lorem Ipsum": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum congue volutpat metus non molestie. Quisque id est sapien. Fusce eget tristique sem. Donec tellus lacus, viverra sed lectus eget, elementum ultrices dolor. Integer non urna justo.",
      "key": "value",
    }
  `);
});
