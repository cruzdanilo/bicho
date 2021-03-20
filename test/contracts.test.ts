import 'dotenv/config';
import { expect } from 'chai';
import { Contract, ContractFactory, Wallet } from 'ethers';
import { ethers, waffle } from 'hardhat';
describe('bicho', () => {
  let Bicho: ContractFactory;
  let bicho: Contract;
  let w1: Wallet;
  let w2: Wallet;

  before(async () => {
    Bicho = await ethers.getContractFactory('Bicho');
    const wallets = await waffle.provider.getWallets();
    [w1, w2] = wallets;
  });

  beforeEach(async () => {
    bicho = await Bicho.deploy();
    await bicho.deployed();
  });

  it('playing with myself and should breed new bicho', async () => {
    const beforeBalance = await w1.getBalance();
    const value = { value: 1e4, gasPrice: 0 };
    await Promise.all(Array(25).fill(null).map((_, i) => bicho.bet(i, value)));
    await bicho.endGame({ gasPrice: 0 });
    const beforeRedeem = await w1.getBalance();
    expect(beforeBalance.sub(beforeRedeem)).to.equal(1e4 * 25);
    expect(bicho.redeem({ gasPrice: 0 })).to.emit(bicho, 'Birth');
    const afterRedeem = await w1.getBalance();
    expect(afterRedeem.sub(beforeBalance)).to.equal(-1e4 * 24 * 0.1); // 10% fee
  });

  it('playing with ourselves', async () => {
    const beforeBalance1 = await w1.getBalance();
    const value = { value: 1e4, gasPrice: 0 };
    await Promise.all(Array(25).fill(null).map((_, i) => bicho.bet(i, value)));
    const beforeBalance2 = await w2.getBalance();
    const bet = 11;
    await bicho.connect(w2).bet(bet, value);
    await bicho.endGame({ gasPrice: 0 });
    await bicho.redeem({ gasPrice: 0 });
    const luckyNumber = (await bicho.luckyNumbers(0)).mod(25).toNumber() + 1;
    const afterBalance1 = await w1.getBalance();
    const afterBalance2 = await w2.getBalance();
    if (luckyNumber === bet) {
      const w1Loss = 24 * 1e4;
      const prize = w1Loss * 0.9;
      expect(afterBalance2.sub(beforeBalance2)).to.equal(prize / 2);
      expect(afterBalance1.sub(beforeBalance1)).to.equal((prize / 2) - w1Loss);
    } else {
      const w2Loss = 1e4;
      const w1Loss = 1e4 * 24;
      const prize = (w1Loss + w2Loss) * 0.9;
      expect(afterBalance2.sub(beforeBalance2)).to.equal(-w2Loss);
      expect(afterBalance1.sub(beforeBalance1)).to.equal(prize - w1Loss);
    }
  });
});
