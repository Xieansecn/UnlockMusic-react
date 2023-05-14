import { InfoOutlineIcon } from '@chakra-ui/icons';
import { Tooltip } from '@chakra-ui/react';
import { workerClientBus } from './decrypt-worker/client';
import { DECRYPTION_WORKER_ACTION_NAME } from './decrypt-worker/constants';

import usePromise from 'react-promise-suspense';

const getSDKVersion = async () => {
  const version = workerClientBus.request(DECRYPTION_WORKER_ACTION_NAME.VERSION, null);
  return `SDK: ${version}`;
};

export function SDKVersion() {
  const sdkVersion = usePromise(getSDKVersion, []);
  return (
    <Tooltip hasArrow placement="top" label={sdkVersion} bg="gray.300" color="black">
      <InfoOutlineIcon />
    </Tooltip>
  );
}
