import { DecentralandInterface } from 'decentraland-ecs';

declare const dcl: DecentralandInterface;

let address: Promise<string>;

const getAddress = async () => {
  const { rpcHandle } = await dcl.loadModule('Identity');
  return await dcl.callRpc(rpcHandle, 'getUserPublicKey', []) as string;
};

export default async () => {
  address ??= getAddress();
  return address;
};
