import { ContractFactory, RequestManager } from 'eth-connect/dist/eth-connect';
// import { Contract } from '@ethersproject/contracts';
// import { Web3Provider } from '@ethersproject/providers';
import IERC20 from '@openzeppelin/contracts/build/contracts/IERC20.json';
import SceneManager from './SceneManager';
// @ts-ignore
import Bicho from '../artifacts/contracts/Bicho.sol/Bicho.json';

const BICHO_ADDRESS = '0xFDf0dC8A74ea2F1261A3bE20ACc0Ee58b4F363e8';

const sceneManager = new SceneManager(async (
  bicho: number, ticket: number, requestManager: RequestManager,
) => {
  console.log(`ticket ${ticket} for bicho ${bicho}`);
  const factory = new ContractFactory(requestManager, Bicho.abi);
  const contract = (await factory.at(BICHO_ADDRESS)) as any;

  console.log(await contract.bet('0x1', { from: '0xC8b8Ed1276e58dF741aD1a556505ab0ED1F6f91a', value: 100000 }), 'bet!');
});

sceneManager.spawnBanca(8, 1, 8);

sceneManager.spawnBicho(1, 1, 1, 14);
sceneManager.spawnBicho(2, 4, 1, 14);
sceneManager.spawnBicho(3, 7, 1, 14);
sceneManager.spawnBicho(4, 10, 1, 14);
sceneManager.spawnBicho(5, 13, 1, 14);

sceneManager.spawnBicho(6, 2.5, 1, 11);
sceneManager.spawnBicho(7, 5.5, 1, 11);
sceneManager.spawnBicho(8, 9.5, 1, 11);
sceneManager.spawnBicho(9, 12.5, 1, 11);
sceneManager.spawnBicho(10, 14, 1, 11);

sceneManager.spawnBicho(11, 1, 1, 9);
sceneManager.spawnBicho(12, 4, 1, 9);
sceneManager.spawnBicho(13, 7, 1, 9);
sceneManager.spawnBicho(14, 10, 1, 9);
sceneManager.spawnBicho(15, 13, 1, 9);

sceneManager.spawnBicho(16, 2.5, 1, 7);
sceneManager.spawnBicho(17, 5.5, 1, 7);
sceneManager.spawnBicho(18, 9.5, 1, 7);
sceneManager.spawnBicho(19, 12.5, 1, 7);
sceneManager.spawnBicho(20, 14, 1, 7);

sceneManager.spawnBicho(21, 1, 1, 4);
sceneManager.spawnBicho(22, 4, 1, 4);
sceneManager.spawnBicho(23, 7, 1, 4);
sceneManager.spawnBicho(24, 10, 1, 4);
sceneManager.spawnBicho(25, 13, 1, 4);

sceneManager.start();
