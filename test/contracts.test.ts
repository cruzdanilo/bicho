import 'dotenv/config';
import { expect } from 'chai';
import { Contract, ContractFactory, Wallet } from 'ethers';
import { ethers, waffle } from 'hardhat';

describe('bicho', () => {
  let Bicho: ContractFactory;
  let bicho: Contract;
  let wallet: Wallet;

  before(async () => {
    Bicho = await ethers.getContractFactory('Bicho');
    [wallet] = await waffle.provider.getWallets();
  });

  beforeEach(async () => {
    bicho = await Bicho.deploy();
    await bicho.deployed();
  });

  it('breed new bicho', async () => {
    expect(bicho.breed()).to.emit(bicho, 'Birth');
  });
});
