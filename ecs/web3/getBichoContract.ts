import { Contract } from '@ethersproject/contracts';
import { Bicho as BichoContract } from '../../abi/types/Bicho';
import BichoABI from '../../abi/Bicho.json';
import getProvider from './getProvider';

declare const BICHO_ADDRESS: string;

let contract: Promise<BichoContract>;

const getContract = async () => {
  const provider = await getProvider();
  return new Contract(BICHO_ADDRESS, BichoABI, provider) as BichoContract;
};

export default async () => {
  contract ??= getContract();
  return contract;
};
