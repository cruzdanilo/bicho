import { ExternalProvider } from '@ethersproject/providers';
import { DecentralandInterface } from 'decentraland-ecs';

declare const dcl: DecentralandInterface;

const handle = dcl.loadModule('web3-provider').then(({ rpcHandle }) => rpcHandle);

export const getProvider = async () => await dcl.callRpc(await handle,
  'getProvider', []) as ExternalProvider;
