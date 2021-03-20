import { Contract } from '@ethersproject/contracts';
import { Web3Provider } from '@ethersproject/providers';
// @ts-ignore
import Bicho from '../artifacts/contracts/Bicho.sol/Bicho.json';
import SceneManager from './SceneManager';

declare const BICHO_ADDRESS: string;

const sceneManager = new SceneManager(async (
  bicho: number, ticket: number, ethers: Web3Provider,
) => {
  console.log(`ticket ${ticket} for bicho ${bicho}`);
  const contract = new Contract(BICHO_ADDRESS, Bicho.abi, ethers);
  console.log(await contract.bet(bicho, 1));
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
