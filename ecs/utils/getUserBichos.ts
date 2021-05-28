import { BigNumber, ContractFactory } from 'eth-connect';
import BichoABI from '../../abi/Bicho.json';
import getUserAddress from './getUserAddress';
import getRequestManager from './getRequestManager';

declare const BICHO_ADDRESS: string;

let contract: any = null;

export default async () => {
  const [address, requestManager] = await Promise.all([getUserAddress(), getRequestManager()]);
  if (!address) return { address: null, bichos: [] };
  contract ??= await new ContractFactory(requestManager, BichoABI).at(BICHO_ADDRESS);
  const balances: BigNumber[] = await contract.balanceOfBatch(
    Array(25).fill(address),
    Array(25).fill(null).map((_, i) => i),
  );
  return {
    address,
    bichos: balances
      .map((balance, id) => ({ id, balance }))
      .filter(({ balance }) => !balance.isZero())
      .map(({ id }) => id),
  };
};
