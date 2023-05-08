import { nanoid } from 'nanoid';

export class WorkerClientBus {
  private idPromiseMap = new Map<string, [(data: any) => void, (error: Error) => void]>();

  constructor(private worker: Worker) {
    worker.addEventListener('message', (e) => {
      const { id, result, error } = e.data;
      const actionPromise = this.idPromiseMap.get(id);
      if (!actionPromise) {
        console.error('cound not fetch worker promise for action: %s', id);
        return;
      }
      this.idPromiseMap.delete(id);

      const [resolve, reject] = actionPromise;
      if (error) {
        reject(error);
      } else {
        resolve(result);
      }
    });
  }

  async request<R = any, P = any>(actionName: string, payload: P): Promise<R> {
    return new Promise((resolve, reject) => {
      const id = nanoid();
      this.idPromiseMap.set(id, [resolve, reject]);
      this.worker.postMessage({
        id,
        action: actionName,
        payload,
      });
    });
  }
}

export class WorkerServerBus {
  private handlers = new Map<string, (payload: any) => Promise<any>>();

  addEventHandler<R = any, P = any>(actionName: string, handler: (payload: P) => Promise<R>) {
    this.handlers.set(actionName, handler);
  }

  onmessage = async (e: MessageEvent<any>) => {
    const { id, action, payload } = e.data;
    const handler = this.handlers.get(action);
    if (!handler) {
      postMessage({ id, result: null, error: new Error('Handler missing for action ' + action) });
      return;
    }

    let result = undefined;
    let error = undefined;
    try {
      result = await handler(payload);
    } catch (e: unknown) {
      error = e;
    }
    postMessage({ id, result, error });
  };
}
