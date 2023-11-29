import { MMKVParser } from '../MMKVParser';

const makeViewFromBuffer = (buff: Buffer) =>
  new DataView(buff.buffer.slice(buff.byteOffset, buff.byteOffset + buff.byteLength));

test('throw error on broken file', () => {
  const view = makeViewFromBuffer(
    Buffer.from([0x27, 0x00, 0x00, 0x00, 0x7f, 0x03, 0x6b, 0x65, 0x79, 0x06, 0x07, 0x62, 0x61, 0x64, 0xff, 0xff]),
  );

  expect(() => {
    const parser = new MMKVParser(view);
    parser.readKey();
    parser.readStringValue();
  }).toThrow(/offset mismatch/i);
});

test('able to handle empty value', () => {
  const view = makeViewFromBuffer(
    Buffer.from([0x0b, 0x00, 0x00, 0x00, 0x7f, 0x03, 0x6b, 0x65, 0x79, 0x00, 0x01, 0x31, 0x02, 0x01, 0x32, 0xff]),
  );

  const parser = new MMKVParser(view);
  expect(parser.readKey()).toEqual('key');
  expect(parser.readStringValue()).toEqual(null);
  expect(parser.readKey()).toEqual('1');
  expect(parser.readStringValue()).toEqual('2');
});
