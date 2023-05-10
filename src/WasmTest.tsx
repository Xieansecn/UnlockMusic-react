import { loadLibParakeet, BlobSink, createArrayBufferReader } from '@jixun/libparakeet';

function testWasm() {
  loadLibParakeet().then(async (mod) => {
    const data = new Uint8Array(0x2000);
    for (let i = 0; i < data.byteLength; i++) {
      data[i] = i & 0xff;
    }
    const src = createArrayBufferReader(data, mod);
    const sink = new BlobSink(mod);
    mod.rw_test(sink.getWriter(), src);
    const collected = sink.collectBlob();
    const copied = await collected.arrayBuffer();
    const copiedView = new Uint8Array(copied);
    for (let i = 0; i < copied.byteLength; i++) {
      if (copiedView[i] !== (i & 0xff)) {
        alert(`validate at pos ${i} failed`);
        return;
      }
    }
    alert('wasm validate ok!');
  });
}

export function WasmTest() {
  return (
    <button onClick={testWasm} type="button">
      Test WASM
    </button>
  );
}
