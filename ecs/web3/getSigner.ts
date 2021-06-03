import { JsonRpcSigner } from '@ethersproject/providers';
import getProvider from './getProvider';
import getUserAddress from './getUserAddress';

let signer: Promise<JsonRpcSigner>;

const getSigner = async () => {
  const [address, provider] = await Promise.all([getUserAddress(), getProvider()]);
  return address && provider.getUncheckedSigner(address);
};

export default async () => {
  signer ??= getSigner();
  return signer;
};
