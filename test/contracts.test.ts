import 'dotenv/config';
import { expect } from 'chai';
import { Contract, ContractFactory } from 'ethers';
import { ethers } from 'hardhat';

describe('bicho', () => {
  let Bicho: ContractFactory;
  let bicho: Contract;

  before(async () => { Bicho = await ethers.getContractFactory('Bicho'); });

  beforeEach(async () => {
    bicho = await Bicho.deploy();
    await bicho.deployed();
  });

  it('breed new bicho', async () => {
    expect(bicho.breed()).to.emit(bicho, 'Birth');
  });
});
