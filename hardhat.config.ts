import '@nomiclabs/hardhat-solhint';
import '@nomiclabs/hardhat-waffle';
import 'dotenv/config';
import { HardhatUserConfig } from 'hardhat/config';

const config: HardhatUserConfig = {
  solidity: '0.8.2',
  networks: {
    ropstein: {
      url: 'https://ropsten.infura.io/v3/7cbce410f3dd46648ca0548f785c5c10',
      accounts: { mnemonic: process.env.PRIVATE_KEY },
    },
  },
};

export default config;
