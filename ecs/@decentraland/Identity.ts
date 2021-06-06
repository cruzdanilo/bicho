import { DecentralandInterface } from 'decentraland-ecs';

declare const dcl: DecentralandInterface;

const handle = dcl.loadModule('Identity').then(({ rpcHandle }) => rpcHandle);

export const getUserPublicKey = async () => await dcl.callRpc(await handle,
  'getUserPublicKey', []) as string;
