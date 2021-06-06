import { StaticJsonRpcProvider, Web3Provider } from '@ethersproject/providers';
import { getProvider } from '../@decentraland/web3-provider';

let provider: Promise<Web3Provider>;

const createProvider = async () => {
  const web3Provider = new Web3Provider(await getProvider());
  web3Provider.detectNetwork = StaticJsonRpcProvider.prototype.detectNetwork;
  return web3Provider;
};

export default async () => {
  provider ??= createProvider();
  return provider;
};
