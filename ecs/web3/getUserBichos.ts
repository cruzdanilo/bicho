import { BichoType } from '../Bicho';
import getBichoContract from './getBichoContract';
import getUserAddress from './getUserAddress';

export default async () => {
  const [address, contract] = await Promise.all([getUserAddress(), getBichoContract()]);
  if (!address) return null;
  const balances = await contract.balanceOfBatch(
    Array(25).fill(address),
    Array(25).fill(null).map((_, i) => i),
  );
  return balances
    .map((balance, id) => ({ id, balance }))
    .filter(({ balance }) => !balance.isZero())
    .map(({ id }) => id % BichoType.COUNT as BichoType);
};
