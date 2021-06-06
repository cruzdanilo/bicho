import { JsonRpcSigner } from '@ethersproject/providers';
import { getUserPublicKey } from '../@decentraland/Identity';
import getProvider from './getProvider';

let signer: Promise<JsonRpcSigner>;

const createSigner = async () => {
  const [address, provider] = await Promise.all([getUserPublicKey(), getProvider()]);
  return address && provider.getUncheckedSigner(address);
};

export default async () => {
  signer ??= createSigner();
  return signer;
};
