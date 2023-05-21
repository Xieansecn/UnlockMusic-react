import { Transformer, Parakeet, TransformResult, fetchParakeet } from '@jixun/libparakeet';
import { toArrayBuffer } from './buffer';
import { UnsupportedSourceFile } from './DecryptError';

export async function transformBlob(
  blob: Blob | ArrayBuffer,
  transformerFactory: (p: Parakeet) => Transformer | Promise<Transformer>,
  parakeet?: Parakeet
) {
  const cleanup: (() => void)[] = [];

  try {
    const mod = parakeet ?? (await fetchParakeet());
    const transformer = await transformerFactory(mod);
    cleanup.push(() => transformer.delete());

    const reader = mod.make.Reader(await toArrayBuffer(blob));
    cleanup.push(() => reader.delete());

    const sink = mod.make.WriterSink();
    const writer = sink.getWriter();
    cleanup.push(() => writer.delete());

    const result = transformer.Transform(writer, reader);
    if (result === TransformResult.ERROR_INVALID_FORMAT) {
      throw new UnsupportedSourceFile(`transformer<${transformer.Name}> does not recognize this file`);
    } else if (result !== TransformResult.OK) {
      throw new Error(`transformer<${transformer.Name}> failed with error: ${TransformResult[result]} (${result})`);
    }

    return sink.collectBlob();
  } finally {
    cleanup.forEach((clean) => clean());
  }
}
