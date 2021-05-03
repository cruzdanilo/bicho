import { DecentralandInterface } from 'decentraland-ecs';
import { RequestManager, ContractFactory } from 'eth-connect';
import SceneManager from './SceneManager';
import BichoABI from '../abi/Bicho.json';

declare const BICHO_ADDRESS: string;
declare const dcl: DecentralandInterface;

let requestManager: RequestManager = null;
dcl.loadModule('web3-provider').then(async ({ rpcHandle }) => {
  const web3 = await dcl.callRpc(rpcHandle, 'getProvider', []);
  requestManager = new RequestManager(web3);
});

let account: string = null;
dcl.loadModule('EthereumController').then(async ({ rpcHandle }) => {
  account = await dcl.callRpc(rpcHandle, 'getUserAccount', []);
});

const sceneManager = new SceneManager(async (bicho: number, ticket: number) => {
  console.log(`ticket ${ticket} for bicho ${bicho}`);
  const factory = new ContractFactory(requestManager, BichoABI);
  const contract = (await factory.at(BICHO_ADDRESS)) as any;
  await contract.bet(bicho, { from: account, value: ticket * 10e4 });
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
