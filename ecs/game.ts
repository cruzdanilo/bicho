import SceneManager from './SceneManager'

const sceneManager = new SceneManager((bicho: number, ticket: number) => {
  console.log(`Ticket escolhido ${ticket} para o bicho ${bicho}`);
});

sceneManager.spawnBanca(5, 1, 5);

sceneManager.spawnBicho(1, 1, 1, 1);
sceneManager.spawnBicho(2, 4, 1, 1);
sceneManager.spawnBicho(3, 7, 1, 1);
sceneManager.spawnBicho(4, 10, 1, 1);
sceneManager.spawnBicho(5, 13, 1, 1);

sceneManager.spawnBicho(6, 1, 4, 1);
sceneManager.spawnBicho(7, 4, 4, 1);
sceneManager.spawnBicho(8, 7, 4, 1);
sceneManager.spawnBicho(9, 10, 4, 1);
sceneManager.spawnBicho(10, 13, 4, 1);

sceneManager.spawnBicho(11, 1, 1, 16);
sceneManager.spawnBicho(12, 4, 1, 16);
sceneManager.spawnBicho(13, 7, 1, 16);
sceneManager.spawnBicho(14, 10, 1, 16);
sceneManager.spawnBicho(15, 13, 1, 16);

sceneManager.spawnBicho(16, 1, 4, 16);
sceneManager.spawnBicho(17, 4, 4, 16);
sceneManager.spawnBicho(18, 7, 4, 16);
sceneManager.spawnBicho(19, 10, 4, 16);
sceneManager.spawnBicho(20, 13, 4, 16);

sceneManager.spawnBicho(21, 1, 1, 6);
sceneManager.spawnBicho(22, 1, 1, 9);
sceneManager.spawnBicho(23, 1, 4, 8);
sceneManager.spawnBicho(24, 13, 1, 6);
sceneManager.spawnBicho(25, 13, 1, 9);

sceneManager.start();
