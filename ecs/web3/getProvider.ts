import { DecentralandInterface } from 'decentraland-ecs';
import { Web3Provider } from '@ethersproject/providers';

declare const dcl: DecentralandInterface;

let provider: Promise<Web3Provider>;

const getProvider = async () => {
  const { rpcHandle } = await dcl.loadModule('web3-provider');
  return new Web3Provider(await dcl.callRpc(rpcHandle, 'getProvider', []));
};

export default async () => {
  provider ??= getProvider();
  return provider;
};
