import { Transformer, Parakeet, TransformResult, fetchParakeet } from '@jixun/libparakeet';

export async function transformBlob(
  blob: Blob,
  transformerFactory: (p: Parakeet) => Transformer | Promise<Transformer>,
  parakeet?: Parakeet
) {
  const cleanup: (() => void)[] = [];

  try {
    const mod = parakeet ?? (await fetchParakeet());
    const transformer = await transformerFactory(mod);
    cleanup.push(() => transformer.delete());

    const reader = mod.make.Reader(await blob.arrayBuffer());
    cleanup.push(() => reader.delete());

    const sink = mod.make.WriterSink();
    const writer = sink.getWriter();
    cleanup.push(() => writer.delete());

    const result = transformer.Transform(writer, reader);
    if (result !== TransformResult.OK) {
      throw new Error(`transform failed with error: ${TransformResult[result]} (${result})`);
    }

    return sink.collectBlob();
  } finally {
    cleanup.forEach((clean) => clean());
  }
}
