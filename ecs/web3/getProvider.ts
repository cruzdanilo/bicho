import { DecentralandInterface } from 'decentraland-ecs';
import { StaticJsonRpcProvider, Web3Provider } from '@ethersproject/providers';

declare const dcl: DecentralandInterface;

let provider: Promise<Web3Provider>;

const getProvider = async () => {
  const { rpcHandle } = await dcl.loadModule('web3-provider');
  const web3Provider = new Web3Provider(await dcl.callRpc(rpcHandle, 'getProvider', []));
  web3Provider.detectNetwork = StaticJsonRpcProvider.prototype.detectNetwork;
  return web3Provider;
};

export default async () => {
  provider ??= getProvider();
  return provider;
};
