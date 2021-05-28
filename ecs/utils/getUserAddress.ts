import { DecentralandInterface } from 'decentraland-ecs';

declare const dcl: DecentralandInterface;

let address: string = null;

export default async () => {
  address ??= await dcl
    .callRpc((await dcl.loadModule('Identity')).rpcHandle, 'getUserPublicKey', []);
  return address;
};
