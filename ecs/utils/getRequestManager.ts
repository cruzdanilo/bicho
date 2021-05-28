import { DecentralandInterface } from 'decentraland-ecs';
import { RequestManager } from 'eth-connect';

declare const dcl: DecentralandInterface;

let requestManager: RequestManager = null;

export default async () => {
  requestManager ??= new RequestManager(await dcl
    .callRpc((await dcl.loadModule('web3-provider')).rpcHandle, 'getProvider', []));
  return requestManager;
};
