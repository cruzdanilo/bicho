import SceneManager from './SceneManager'

const sceneManager = new SceneManager((bicho: number, ticket: number) => {
  console.log(`Ticket escolhido ${ticket} para o bicho ${bicho}`);
});

sceneManager.spawnBanca(5, 1, 8);
sceneManager.spawnBicho(1, 1, 1, 1);
sceneManager.spawnBicho(2, 5, 1, 1);
sceneManager.spawnBicho(3, 9, 1, 1);


sceneManager.start();
