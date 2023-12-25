import { fetchParakeet, FooterParserState } from '@jixun/libparakeet';
import type { FetchMusicExNamePayload } from '~/decrypt-worker/types';
import { makeQMCv2FooterParser } from '~/decrypt-worker/util/qmc2KeyCrypto';
import { timedLogger, withGroupedLogs as withTimeGroupedLogs } from '~/util/logUtils';

export const workerParseMusicExMediaName = async ({ id, blobURI }: FetchMusicExNamePayload) => {
  const label = `decrypt(${id})`;
  return withTimeGroupedLogs(label, async () => {
    const parakeet = await timedLogger(`${label}/init`, fetchParakeet);
    const blob = await timedLogger(`${label}/fetch-src`, async () =>
      fetch(blobURI, { headers: { Range: 'bytes=-1024' } }).then((r) => r.blob()),
    );

    const buffer = await timedLogger(`${label}/read-src`, async () => {
      // Firefox: the range header does not work...?
      const blobBuffer = await blob.arrayBuffer();
      if (blobBuffer.byteLength > 1024) {
        return blobBuffer.slice(-1024);
      }
      return blobBuffer;
    });

    const parsed = makeQMCv2FooterParser(parakeet).parse(buffer);
    if (parsed.state === FooterParserState.OK) {
      return parsed.mediaName;
    }

    return null;
  });
};
