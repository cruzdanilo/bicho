import { Contract } from '@ethersproject/contracts';
import { Web3Provider } from '@ethersproject/providers';
import IERC20 from '@openzeppelin/contracts/build/contracts/IERC20.json';
import SceneManager from './SceneManager';

const sceneManager = new SceneManager(async (
  bicho: number, ticket: number, ethers: Web3Provider,
) => {
  console.log(`ticket ${ticket} for bicho ${bicho}`);
  const mana = new Contract('0x2a8Fd99c19271F4F04B1B7b9c4f7cF264b626eDB', IERC20.abi, ethers);
  console.log(await mana.totalSupply());
});

sceneManager.spawnBanca(8, 1, 8);

sceneManager.spawnBicho(1, 2, 1, 3);
sceneManager.spawnBicho(2, 4, 1, 3);
sceneManager.spawnBicho(3, 7, 1, 3);
sceneManager.spawnBicho(4, 10, 1, 3);
sceneManager.spawnBicho(5, 13, 1, 3);

sceneManager.spawnBicho(6, 2, 4, 3);
sceneManager.spawnBicho(7, 4, 4, 3);
sceneManager.spawnBicho(8, 7, 4, 3);
sceneManager.spawnBicho(9, 10, 4, 3);
sceneManager.spawnBicho(10, 13, 4, 3);

sceneManager.spawnBicho(11, 2, 1, 14);
sceneManager.spawnBicho(12, 4, 1, 14);
sceneManager.spawnBicho(13, 7, 1, 14);
sceneManager.spawnBicho(14, 10, 1, 14);
sceneManager.spawnBicho(15, 13, 1, 14);

sceneManager.spawnBicho(16, 2, 4, 14);
sceneManager.spawnBicho(17, 4, 4, 14);
sceneManager.spawnBicho(18, 7, 4, 14);
sceneManager.spawnBicho(19, 10, 4, 14);
sceneManager.spawnBicho(20, 13, 4, 14);

sceneManager.spawnBicho(21, 3, 1, 6);
sceneManager.spawnBicho(22, 3, 1, 9);
sceneManager.spawnBicho(23, 3, 4, 8);
sceneManager.spawnBicho(24, 14, 1, 6);
sceneManager.spawnBicho(25, 14, 1, 9);

sceneManager.start();
