import { WorkerServerBus } from '~/util/WorkerEventBus';
import { DECRYPTION_WORKER_ACTION_NAME } from './constants';

import { getSDKVersion } from '@jixun/libparakeet';

import { workerDecryptHandler } from './worker/handler/decrypt';
import { workerParseMusicExMediaName } from './worker/handler/qmcv2_parser';

const bus = new WorkerServerBus();
onmessage = bus.onmessage;

bus.addEventHandler(DECRYPTION_WORKER_ACTION_NAME.DECRYPT, workerDecryptHandler);
bus.addEventHandler(DECRYPTION_WORKER_ACTION_NAME.FIND_QMC_MUSICEX_NAME, workerParseMusicExMediaName);
bus.addEventHandler(DECRYPTION_WORKER_ACTION_NAME.VERSION, getSDKVersion);
